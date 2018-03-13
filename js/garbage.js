function loadGarbage() {
    var random = getRandomInt(1, 100000);

    var width = 12;
    if (typeof(settings['garbage_width']) !== 'undefined' && parseFloat(settings['garbage_width']) > 0) width = settings['garbage_width'];

    var html = '<div class="trash trash' + random + ' block_garbage col-xs-' + width + ' transbg" data-id="garbage">';
    if (typeof(settings['garbage_hideicon']) !== 'undefined' && parseFloat(settings['garbage_hideicon']) === 1) {
        html += '<div class="col-xs-12 col-data">';
    } else {
        html += '<div class="col-xs-4 col-icon">';
        html += '<img class="trashcan" src="img/garbage/kliko.png" style="opacity:0.1" />';
        html += '</div>';
        html += '<div class="col-xs-8 col-data">';
    }
    html += '<span class="state">' + language.misc.loading + '</span>';
    html += '</div>';
    html += '</div>';

    loadDataForService(settings['garbage_company'], random);

    setTimeout(function () {
        loadGarbage();
    }, (60000 * 15));

    return html;
}

function getPrefixUrl() {
    if (settings['garbage_use_cors_prefix']) {
        return 'https://cors-anywhere.herokuapp.com/';
    }
    return '';
}

function getGoogleCalendarData(address, date, random, calendarId) {
    this.url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
    $.ajax({
        url: this.url,
        data: {
            key: config['google_api_key'],
            singleEvents: true,
            timeMin: date.start.format('YYYY-MM-DDT00:00:00+00:00'),
            timeMax: date.end.format('YYYY-MM-DDT00:00:00+00:00'),
            orderBy: 'startTime',
            maxResults: getMaxItems()
        },error: function(errorData){
		var msg = errorData.responseJSON.error.message
		infoMessage('<font color="red">Garbage Error!</font>','Google Calendar ' + msg, 10000);
	},
        success: function (data) {
            this.returnDates = data.items.map(function(element) {
                if (element.start.hasOwnProperty('date')) {
                    this.startDate = moment(element.start.date);
                } else if (element.start.hasOwnProperty('dateTime')) {
                    this.startDate = moment(element.start.dateTime);
                }
                return {
                    date: this.startDate,
                    summary: element.summary,
                    garbageType: mapGarbageType(element.summary)
                };
            });
        addToContainer(random, this.returnDates);
        }
    });
}

function getIcalData(address, date, random, url) {
    $.get(getPrefixUrl() + url, function (data, textstatus, jqXHR) {
        var jcalData = ICAL.parse(data);
        var vcalendar = new ICAL.Component(jcalData);
        var vevents = vcalendar.getAllSubcomponents('vevent');
        data = vevents
            .filter(function (vevent) {
                return moment(vevent.getFirstPropertyValue('dtstart').toString(), 'YYYY-MM-DD').isBetween(date.start, date.end, null, '[]');
            })
            .map(function (vevent) {
                return {
                    date: moment(vevent.getFirstPropertyValue('dtstart').toString(), 'YYYY-MM-DD'),
                    summary: vevent.getFirstPropertyValue('summary'),
                    garbageType: mapGarbageType(vevent.getFirstPropertyValue('summary')),
                };
            });

        addToContainer(random, data);
    });
}

function getWasteApiData(address, date, random, companyCode) {
    $.post('https://wasteapi.2go-mobile.com/api/FetchAdress', {
        'companyCode': companyCode,
        'postCode': address.zipcode,
        'houseNumber': address.housenumber,
        'houseLetter': '',
        'houseNumberAddition': address.housenumberSuffix
    }, function (data) {
        $.post('https://wasteapi.2go-mobile.com/api/GetCalendar', {
            'companyCode': companyCode,
            'uniqueAddressID': data['dataList'][0]['UniqueId'],
            'startDate': date.start.format('YYYY-MM-DD'),
            'endDate': date.end.format('YYYY-MM-DD')
        }, function (data) {
            var dataFiltered = [];
            data.dataList.forEach(function (element) {
                element.pickupDates.forEach(function (dateElement) {
                    var pickupTypes = {
                        0: 'Restafval',
                        1: 'GFT',
                        2: 'Papier',
                        3: 'Plastic',
                        6: 'Kerstbomen',
                        7: 'Restgoed',
                        10: 'Verpakkingen',
                    };
                    dataFiltered.push({
                        date: moment(dateElement),
                        summary: pickupTypes[element.pickupType],
                        garbageType: mapGarbageType(pickupTypes[element.pickupType]),
                    });
                });
            });

            addToContainer(random, dataFiltered);
        });
    });
}

function getWasteApi2Data(address, date, random, companyCode) {
    $.post('http://wasteapi2.2go-mobile.com/api/FetchAdress', {
        'companyCode': companyCode,
        'postCode': address.zipcode,
        'houseNumber': address.housenumber,
    }, function (data) {
        $.post('http://wasteapi2.2go-mobile.com/api/GetCalendar', {
            'companyCode': companyCode,
            'uniqueAddressID': data['dataList'][0]['UniqueId'],
            'startDate': date.start.format('YYYY-MM-DD'),
            'endDate': date.end.format('YYYY-MM-DD')
        }, function (data) {
            var dataFiltered = [];
            data.dataList.forEach(function (element) {
                element.pickupDates.forEach(function (dateElement) {
                    var pickupTypes = {
                        PACKAGES: 'Verpakkingen',
                        PAPER: 'Papier',
                        GREENGREY: 'GFT & Rest',
                    };
                    dataFiltered.push({
                        date: moment(dateElement),
                        summary: pickupTypes[element.description],
                        garbageType: mapGarbageType(pickupTypes[element.description]),
                    });
                });
            });

            addToContainer(random, dataFiltered);
        });
    });
}

function getOphaalkalenderData(address, date, random) {
    $('.trash' + random + ' .state').html('');
    var baseURL = 'http://www.ophaalkalender.be';

    $.getJSON(getPrefixUrl() + baseURL + '/calendar/findstreets/?query=' + address.street + '&zipcode=' + address.zipcode, function (data) {
        $.getJSON(getPrefixUrl() + baseURL + '/api/rides?id=' + data[0].Id + '&housenumber=0&zipcode=' + address.zipcode, function (data) {
            data = data.filter(function (element) {
                    return moment(element.start, 'YYYY-MM-DDTHH:mm:ss+-HH:mm').isBetween(date.start, date.end, null, '[]');
                })
                .map(function (element) {
                    return {
                        date: moment(element.start, 'YYYY-MM-DDTHH:mm:ss+-HH:mm'),
                        summary: element.title,
                        garbageType: mapGarbageType(element.color),
                    }
                });
            addToContainer(random, data);
        });
    });
}

function getAfvalAlertData(address, date, random) {
    var baseURL = 'https://www.afvalalert.nl/kalender';
    $.get(getPrefixUrl() + baseURL + '/' + address.zipcode + '/' + address.housenumber + address.housenumberSuffix, function (data) {
        console.log(data);
        data = data.items.filter(function (element) {
            return moment(element.date, 'YYYY-MM-DD').isBetween(date.start, date.end, null, '[]');
        })
            .map(function (element) {
                return {
                    date: moment(element.date, 'YYYY-MM-DD'),
                    summary: element.type,
                    garbageType: mapGarbageType(element.type),
                }
            });
        addToContainer(random, data);
    });
}

function getAfvalwijzerArnhemData(address, date, random) {
    $('.trash' + random + ' .state').html('');
    var baseURL = 'http://www.afvalwijzer-arnhem.nl';
    $.get(getPrefixUrl() + baseURL + '/applicatie?ZipCode=' + address.zipcode + '&HouseNumber=' + address.housenumber + '&HouseNumberAddition=' + address.housenumberSuffix, function (data) {
        var returnDates = [];
        $(data).find('ul.ulPickupDates li').each(function (index, element) {
            returnDates.push({
                summary: $(element).find('div').remove().html().trim(),
                date: moment($(element).html().trim(), 'D-M-YYYY'),
                garbageType: mapGarbageType($(element).attr('class')),
            });
        });
        addToContainer(random, returnDates);
    });
}

function getGeneralData(service,address, date, random, subservice){
	$.getJSON(getPrefixUrl() + 'http://dashticz.nl/afval/?service='+service+'&sub='+subservice+'&zipcode=' + address.zipcode + '&nr=' + address.housenumber + '&t=' + address.housenumberSuffix, function (data) {
		 data = data
            .filter(function (element) {
                return moment(element.date).isBetween(date.start, date.end, null, '[]');
            })
            .map(function (element) {
                return {
                    date: moment(element.date),
                    summary: element.title,
                    garbageType: mapGarbageType(element.title),
                };
            });
        addToContainer(random, data);
	});
}

function getZuidhornData(address, date, random, fetchType) {
    var prefix = 'https://afvalkalender.zuidhorn.nl/';

    $.post(getPrefixUrl() + prefix + 'afvalkalender-zoeken/zoek-postcode/Zipcode/search.html', {
        'tx_windwastecalendar_pi1[zipcode]': address.zipcode,
        'tx_windwastecalendar_pi1[housenumber]': address.housenumber,
    }, function (data) {
        switch (fetchType) {
            case 'scrape':
                var dataFiltered = [];
                $(data).find('.waste-calendar').each(function (index, element) {
                    var summary = $(element).find('.type a')[0].innerText;
                    $(element).find('.dates .date').each(function (dateIndex, dateElement) {
                        dataFiltered.push({
                            date: moment(dateElement.innerText.trim(), 'dddd DD MMMM', 'nl'),
                            summary: summary,
                            garbageType: mapGarbageType(summary),
                        });
                    });
                });
                addToContainer(random, dataFiltered);
            break;
            case 'ical':
                var elementHref = $(data).find('.ical .link a').attr('href');
                return getIcalData(address, date, random, prefix + elementHref)
            break;
        }
    });
}

function getRd4Data(address, date, random) {
    $.get(getPrefixUrl() + 'https://www.rd4info.nl/NSI/Burger/Aspx/afvalkalender_general_text.aspx?pc=' + address.zipcode + '&nr=' + address.housenumber + '&t=' + address.housenumberSuffix, function (data) {
        var returnDates = [];
        data = data
            .replace(/<img .*?>/g, "")
            .replace(/<head>(?:.|\n|\r)+?<\/head>/g, "")
            .replace(/<script (?:.|\n|\r)+?<\/script>/g, "")
            .replace(/<table class="contentTable" (?:.|\n|\r)+?<\/table>/g, "")
            .replace(/<input (?:.|\n|\r)+?\/>/g, "")
            .replace(/<div id="Afvalkalender1_pnlSearch"(?:.|\n|\r)+?<\/div>/g, "")
            .replace(/<a (?:.|\n|\r)+?<\/a>/g, "")
        ;
        $(data).find('#Afvalkalender1_pnlAfvalKalender table.plaintextMonth tr').each(function (index, element) {
            if (element.innerText.length) {
                returnDates.push({
                    date: moment($(element).find('td')[0].innerText.trim(), 'dddd DD MMMM YYYY', 'nl'),
                    summary: $(element).find('td')[1].innerText,
                    garbageType: mapGarbageType($(element).find('td')[1].innerText),
                });
            }
        });
        returnDates = returnDates.filter(function (element) {
            return element.date.isBetween(date.start, date.end, null, '[]');
        });
        addToContainer(random, returnDates);
    });
}

function getVenloData(address, date, random) {
    $.get(getPrefixUrl() + 'https://www.venlo.nl/trash-removal-calendar/' + address.zipcode + '/' + address.housenumber, function (data) {
        var returnDates = [];
        data = data
            .replace(/<img .*?>/g, "")
            .replace(/<head>(?:.|\n|\r)+?<\/head>/g, "")
            .replace(/<script (?:.|\n|\r)+?<\/script>/g, "")
        ;
        $(data).find('div#block-system-main div.trash-removal-calendar tbody tr').each(function (index, element) {
            var year = $(element).parents('table').find('thead')[0].innerText.substr(-5);
                returnDates.push({
                    date: moment($(element).find('td')[0].innerText.trim() + ' ' + year, 'dddd DD MMMM YYYY', 'nl'),
                    summary: $(element).find('span')[0].innerText,
                    garbageType: mapGarbageType($(element).find('span')[0].innerText),
                });
        });
        returnDates = returnDates.filter(function (element) {
            return element.date.isBetween(date.start, date.end, null, '[]');
        });
        addToContainer(random, returnDates);
    });
}

// https://gemeente.groningen.nl/afvalwijzer/groningen/9746AG/18/2018/
function getGroningenData(address, date, random) {
    $.get(getPrefixUrl() + 'https://gemeente.groningen.nl/afvalwijzer/groningen/' + address.zipcode + '/' + address.housenumber + '/' + moment().format('YYYY'), function (data) {
        var returnDates = [];
        data = data
            .replace(/<img .*?>/g, "")
            .replace(/<head>(?:.|\n|\r)+?<\/head>/g, "")
            .replace(/<script (?:.|\n|\r)+?<\/script>/g, "")
            .replace(/<header (?:.|\n|\r)+?<\/header>/g, "")
        ;
        $(data).find('table.afvalwijzerData tbody tr.blockWrapper').each(function (index, element) {
            if ($(element).find('h2').length) {
                var summary = $(element).find('h2')[0].innerText;
                var garbageType = mapGarbageType($(element).find('h2')[0].innerText);
                $(element).find('td').each(function (dateindex, dateelement) {
                    var month = dateelement.className.substr(-2);
                    $(dateelement).find('li').each(function (dayindex, dayelement) {
                        var day = dayelement.innerText.replace('*', '');
                        if (!isNaN(day)) {
                            returnDates.push({
                                date: moment(moment().format('YYYY') + '-' + month + '-' + day, 'YYYY-M-D', 'nl'),
                                summary: summary,
                                garbageType: garbageType
                            });
                        }
                    });
                });
            }
        });
        returnDates = returnDates.filter(function (element) {
            return element.date.isBetween(date.start, date.end, null, '[]');
        });
        addToContainer(random, returnDates);
    });
}

///http://dashticz.nl/afval/?service=afvalstromen&sub=alphenaandenrijn&zipcode=2401AR&nr=261&t=
function getAfvalstromenData(address, date, random, service) {
    getGeneralData('afvalstromen',address, date, random, service);
}

//http://dashticz.nl/afval/?service=deafvalapp&zipcode=5692VG&nr=33&t=
function getDeAfvalAppData(address, date, random) {
    getGeneralData('deafvalapp',address, date, random);
}

//http://dashticz.nl/afval/?service=mijnafvalwijzer&zipcode=3825AL&nr=41&t=
function getMijnAfvalwijzerData(address, date, random) {
    getGeneralData('mijnafvalwijzer',address, date, random);
}

//http://dashticz.nl/afval/?service=hvc&zipcode=1671jv&nr=22&t=
function getHvcData(address, date, random) {
    getGeneralData('hvc',address, date, random);
}

//http://dashticz.nl/afval/?service=rova&zipcode=7731ZT&nr=84&t=
function getRovaData(address, date, random) {
    getGeneralData('rova',address, date, random);
}

//http://dashticz.nl/afval/?service=recyclemanager&zipcode=3161lh&nr=27&t=
function getRecycleManagerData(address, date, random) {
    getGeneralData('recyclemanager',address, date, random);
}

function getEdgData(address, date, random) {
    getGeneralData('edg',address, date, random);
}

function getTrashRow(garbage) {
    this.rowClass = 'trashrow';
    this.displayDate = garbage.date.locale(settings['calendarlanguage']).format('l');
    if (garbage.date.isSame(moment(), 'day')) {
        this.displayDate = language.weekdays.today;
        this.rowClass = 'trashtoday';
    } else if (garbage.date.isSame(moment().add(1, 'days'), 'day')) {
        this.displayDate = language.weekdays.tomorrow;
        this.rowClass = 'trashtomorrow';
    } else if (garbage.date.isBefore(moment().add(1, 'week'))) {
        this.displayDate = garbage.date.format('dddd');
    }
    var name = settings['garbage'][garbage.garbageType].name;
    var color = ' style="color:' + settings['garbage'][garbage.garbageType].code + '"';
    return '<div class="' + this.rowClass + '"' + (settings['garbage_use_colors'] ? color : '') + '>'
        + (settings['garbage_use_names'] ? name : (garbage.summary.charAt(0).toUpperCase() + garbage.summary.slice(1)))
        + ': ' + this.displayDate
        + '</div>';
}

function filterReturnDates(returnDates) {
    return returnDates
        .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} )
        .filter(function (element) {
            return settings['garbage'].hasOwnProperty(element.garbageType);
        })
        .slice(0, getMaxItems())
}

function addToContainer(random, returnDates) {
    returnDates = filterReturnDates(returnDates);
    if (!returnDates.length) {
        $('.trash' + random + ' .state').html('Geen gegevens gevonden');
        return;
    }
    $('.trash' + random + ' .state').html('');

    if (settings['garbage_icon_use_colors']) {
        $('.trash' + random).find('img.trashcan').attr('src', settings['garbage'][returnDates[0].garbageType]['icon']);
        $('.trash' + random).find('img.trashcan').css('opacity', '0.7');
    } else {
        $('.trash' + random).find('img.trashcan').css('opacity', '1');
    }
    returnDates.forEach(function (element) {
        $('.trash' + random + ' .state').append(getTrashRow(element));
    });
}

function mapGarbageType(garbageType) {
    var mappedType = 'black';
    if (garbageType) {
        $.each(settings['garbage_mapping'], function (index, element) {
            $.each(element, function (index2, element2) {
                var regex = new RegExp(element2, 'i');
                if (garbageType.match(regex)) {
                    mappedType = index;
                }
            });
        });
    }
    return mappedType;
}

function getMaxItems() {
    if (typeof(settings['garbage_maxitems']) !== 'undefined'
        && parseFloat(settings['garbage_maxitems']) > 0
    ) {
        return settings['garbage_maxitems'];
    }
    return 5;
}

function loadDataForService(service, random) {
    var address = {
        street: settings['garbage_street'] || '',
        housenumber: settings['garbage_housenumber'] || '',
        housenumberSuffix: settings['garbage_housenumberadd'] || '',
        zipcode: settings['garbage_zipcode'] || '',
    };
    var date = {
        start: moment().startOf('day'),
        end: moment().add(32, 'days').endOf('day'),
    };

    var serviceProperties = {
        googlecalendar: {dataHandler: 'getGoogleCalendarData', identifier: settings['garbage_calendar_id']},
        ical: {dataHandler: 'getIcalData', identifier: settings['garbage_icalurl']},
        gemertbakelmaandag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/o44qrtdhls8saftmesm5rqb85o%40group.calendar.google.com/public/basic.ics'},
        gemertbakeldinsdag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/6p8549rssv114ddevingime95o%40group.calendar.google.com/public/basic.ics'},
        gemertbakelwoensdag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/cv40f4vaie10v54f72go6ipb78%40group.calendar.google.com/public/basic.ics'},
        veldhoven: {dataHandler: 'getIcalData', identifier: 'https://www.veldhoven.nl/afvalkalender/' + moment().format('YYYY') + '/' + address.zipcode + '-' + address.housenumber + '.ics'},
        best: {dataHandler: 'getIcalData', identifier: 'https://www.gemeentebest.nl/afvalkalender/' + moment().format('YYYY') + '/' + address.zipcode + '-' + address.housenumber + '.ics'},
        uden: {dataHandler: 'getIcalData', identifier: 'https://www.uden.nl/inwoners/afval/ophaaldagen-afval/' + moment().format('YYYY') + address.zipcode + '-' + address.housenumber + '.ics'},
        vianen: {dataHandler: 'getIcalData', identifier: 'https://www.vianen.nl/afval/afvalkalender/' + moment().format('YYYY') + address.zipcode + '-' + address.housenumber + '.ics'},
        goes: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.goes.nl/' + moment().format('YYYY') + address.zipcode + '-' + address.housenumber + '.ics'},
        deurne: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.deurne.nl/Afvalkalender/download_ical.php?p=' + address.zipcode + '&h=' + address.housenumber + '&t=&jaar=' + moment().format('YYYY')},
        heezeleende: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.heeze-leende.nl/Afvalkalender/download_ical.php?p=' + address.zipcode + '&h=' + address.housenumber + '&t=&jaar=' + moment().format('YYYY')},
        twentemilieu: {dataHandler: 'getWasteApiData', identifier: '8d97bb56-5afd-4cbc-a651-b4f7314264b4'},
        ophaalkalender: {dataHandler: 'getOphaalkalenderData', identifier: ''},
        afvalwijzerarnhem: {dataHandler: 'getAfvalwijzerArnhemData', identifier: ''},
        zuidhornical: {dataHandler: 'getZuidhornData', identifier: 'ical'},
        zuidhorn: {dataHandler: 'getZuidhornData', identifier: 'scrape'},
        deafvalapp: {dataHandler: 'getDeAfvalAppData', identifier: ''},
        cure: {dataHandler: 'getAfvalstromenData', identifier: 'cure'},
        cyclusnv: {dataHandler: 'getAfvalstromenData', identifier: 'cyclusnv'},
        gemeenteberkelland: {dataHandler: 'getAfvalstromenData', identifier: 'gemeenteberkelland'},
        meerlanden: {dataHandler: 'getAfvalstromenData', identifier: 'meerlanden'},
        venray: {dataHandler: 'getAfvalstromenData', identifier: 'venray'},
        circulusberkel: {dataHandler: 'getAfvalstromenData', identifier: 'circulusberkel'},
        rmn: {dataHandler: 'getAfvalstromenData', identifier: 'rmn'},
        alphenaandenrijn: {dataHandler: 'getAfvalstromenData', identifier: 'alphenaandenrijn'},
        sudwestfryslan: {dataHandler: 'getAfvalstromenData', identifier: 'sudwestfryslan'},
        dar: {dataHandler: 'getAfvalstromenData', identifier: 'dar'},
        waalre: {dataHandler: 'getAfvalstromenData', identifier: 'waalre'},
        avalex: {dataHandler: 'getAfvalstromenData', identifier: 'avalex'},
        hvc: {dataHandler: 'getHvcData', identifier: ''},
        rova: {dataHandler: 'getRovaData', identifier: ''},
        mijnafvalwijzer: {dataHandler: 'getMijnAfvalwijzerData', identifier: ''},
        recyclemanager: {dataHandler: 'getRecycleManagerData', identifier: ''},
        edg: {dataHandler: 'getEdgData', identifier: ''},
        rd4: {dataHandler: 'getRd4Data', identifier: ''},
        venlo: {dataHandler: 'getVenloData', identifier: ''},
        groningen: {dataHandler: 'getGroningenData', identifier: ''},
        area: {dataHandler: 'getWasteApiData', identifier: 'adc418da-d19b-11e5-ab30-625662870761'},
        almere: {dataHandler: 'getWasteApi2Data', identifier: '53d8db94-7945-42fd-9742-9bbc71dbe4c1'},
        afvalalert: {dataHandler: 'getAfvalAlertData', identifier: ''},
    };
    window[serviceProperties[service].dataHandler](address, date, random, serviceProperties[service].identifier);
}
