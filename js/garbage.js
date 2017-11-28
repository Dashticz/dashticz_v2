function loadGarbage() {
    var random = getRandomInt(1, 100000);

    var width = 12;
    if (typeof(settings['garbage_width']) !== 'undefined' && parseFloat(settings['garbage_width']) > 0) width = settings['garbage_width'];

    var html = '<div class="trash trash' + random + ' block_garbage col-xs-' + width + ' transbg" data-id="garbage">';
    if (typeof(settings['garbage_hideicon']) !== 'undefined' && parseFloat(settings['garbage_hideicon']) === 1) {
        html += '<div class="col-xs-12 col-data">';
    } else {
        html += '<div class="col-xs-4 col-icon">';
        html += '<img class="trashcan" src="img/kliko.png" style="opacity:0.1" />';
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
    var baseIcalUrl = 'https://cors-anywhere.herokuapp.com/';

    $.get(baseIcalUrl + url, function (data, textstatus, jqXHR) {
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

function getDeAfvalAppData(address, date, random) {
    $.get('https://cors-anywhere.herokuapp.com/http://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=NL&postcode=' + address.postcode + '&straatId=0&huisnr=' + address.housenumber + '&huisnrtoev=' + address.housenumberSuffix, function (data) {
        var dataFiltered = [];

        data.toString().split('\n').forEach(function (element) {
            element = element.split(';');
            var garbageType = element[0];
            element
                .filter(function (element) { return element.length})
                .slice(1)
                .forEach(function (dateElement) {
                    dataFiltered.push({
                        date: moment(dateElement, 'DD-MM-YYYY'),
                        summary: garbageType.slice(0, 1).toUpperCase() + garbageType.slice(1).toLowerCase(),
                        garbageType: mapGarbageType(garbageType),
                    });
            });
        });
        dataFiltered = dataFiltered
            .filter(function (element) {
                return element.date.isBetween(date.start, date.end, null, '[]');
            });

        addToContainer(random, dataFiltered);
    });
}

function getTwenteMilieuData(address, date, random) {
    $.post('https://wasteapi.2go-mobile.com/api/FetchAdress', {
        'companyCode': '8d97bb56-5afd-4cbc-a651-b4f7314264b4',
        'postCode': address.postcode,
        'houseNumber': address.housenumber,
        'houseLetter': '',
        'houseNumberAddition': address.housenumberSuffix
    }, function (data) {
        $.post('https://wasteapi.2go-mobile.com/api/GetCalendar', {
            'companyCode': '8d97bb56-5afd-4cbc-a651-b4f7314264b4',
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

function getAfvalstromenData(address, date, random, baseUrl) {
    $('.trash' + random + ' .state').html('');
    $.getJSON('https://cors-anywhere.herokuapp.com/' + baseUrl + '/rest/adressen/' + address.postcode + '-' + address.housenumber, function (data) {
        $.getJSON('https://cors-anywhere.herokuapp.com/' + baseUrl + '/rest/adressen/' + data[0].bagId + '/afvalstromen', function (data) {
            data = data
                .filter(function (element) { return element.ophaaldatum !== null; })
                .map(function (element) {
                    return {
                        date: moment(element.ophaaldatum, 'YYYY-MM-DD'),
                        summary: element.title,
                        garbageType: mapGarbageType(element.title),
                    };
                });
            addToContainer(random, data);
        });
    });
}

function getOphaalkalenderData(address, date, random) {
    $('.trash' + random + ' .state').html('');
    var baseURL = 'http://www.ophaalkalender.be';

    $.getJSON('https://cors-anywhere.herokuapp.com/' + baseURL + '/calendar/findstreets/?query=' + address.street + '&zipcode=' + address.postcode, function (data) {
        $.getJSON('https://cors-anywhere.herokuapp.com/' + baseURL + '/api/rides?id=' + data[0].Id + '&housenumber=0&zipcode=' + address.postcode, function (data) {
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

function getAfvalwijzerArnhemData(address, date, random) {
    $('.trash' + random + ' .state').html('');
    var baseURL = 'http://www.afvalwijzer-arnhem.nl';
    $.get('https://cors-anywhere.herokuapp.com/' + baseURL + '/applicatie?ZipCode=' + address.postcode + '&HouseNumber=' + address.housenumber + '&HouseNumberAddition=' + address.housenumberSuffix, function (data) {
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

function getMijnAfvalwijzerData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + address.postcode + '&street=&huisnummer=' + address.housenumber + '&toevoeging=' + address.housenumberSuffix, function (data) {
        data = data.data.ophaaldagen.data
            .filter(function (element) {
                return moment(element.date).isBetween(date.start, date.end, null, '[]');
            })
            .map(function (element) {
                return {
                    date: moment(element.date),
                    summary: element.nameType,
                    garbageType: mapGarbageType(element.type),
                };
            });
        addToContainer(random, data);
    });
}

function getHvcData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/http://inzamelkalender.hvcgroep.nl/push/calendar?postcode=' + address.postcode + '&huisnummer=' + address.housenumber, function (data) {
        var dataFiltered = [];
        data.forEach(function (element) {
            var seen = {};
            element.dateTime.forEach(function (dateElement) {
                this.date = moment(dateElement.date, 'YYYY-MM-DD HH:mm:ss');

                if (!seen.hasOwnProperty(this.date.format('YYYY-MM_DD'))) {
                    dataFiltered.push({
                        date: this.date,
                        summary: element.naam,
                        garbageType: mapGarbageType(element.code),
                    });
                    seen[this.date.format('YYYY-MM_DD')] = true;
                }
            });
        });
        addToContainer(random, dataFiltered);
    });
}

function getRovaData(address, date, random) {
    $.getJSON('https://wedevise.nl/dashticz/rova.php?zipcode=' + address.postcode + '&number=' + address.housenumber, function (data) {
        data = data.map(function (element) {
            return {
                date: moment(element.Date, 'YYYY-MM-DDTHH:mm:ss'),
                summary: element.GarbageType,
                garbageType: mapGarbageType(element.GarbageType),
            };
        });
        addToContainer(random, data);
    });
}

/**
 * Will be discontinued from 2018
 */
function getRecycleManagerData(address, date, random) {
    $.getJSON('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + address.postcode + '&number=' + address.housenumber, function (data) {
        var dataFiltered = [];
        data.data.forEach(function (element) {
            element.occurrences.forEach(function (occurrence) {
                dataFiltered.push({
                    date: moment(occurrence.from.date, 'YYYY-MM-DDTHH:mm:ss.SSS'),
                    summary: occurrence.title,
                    garbageType: mapGarbageType(occurrence.title),
                });
            });
        });
        addToContainer(random, dataFiltered);
    });
}

function getEdgData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.edg.de/JsonHandler.ashx?dates=1&street=' + address.street + '&nr=' + address.housenumber + '&cmd=findtrash&tbio=0&tpapier=1&trest=1&twert=1&feiertag=0', function (data) {
        data = data.data
            .map(function (element) {
                return {
                    date: moment(element.date, 'DD.MM.YYYY'),
                    summary: element.fraktion[0],
                    garbageType: mapGarbageType(element.fraktion[0]),
                }
            });
        addToContainer(random, data);
    });
}

function getTrashRow(garbage) {
    this.displayDate = garbage.date.locale(settings['calendarlanguage']).format('l');
    if (garbage.date.isSame(moment(), 'day')) {
        this.displayDate = language.weekdays.today;
    } else if (garbage.date.isSame(moment().add(1, 'days'), 'day')) {
        this.displayDate = language.weekdays.tomorrow;
    } else if (garbage.date.isBefore(moment().add(1, 'week'))) {
        this.displayDate = garbage.date.format('dddd');
    }
    var name = settings['garbage'][garbage.garbageType].name;
    var color = ' style="color:' + settings['garbage'][garbage.garbageType].code + '"';
    return '<div class="trashrow"' + (settings['garbage_use_colors'] ? color : '') + '>'
        + (settings['garbage_use_names'] ? name : (garbage.summary.charAt(0).toUpperCase() + garbage.summary.slice(1)))
        + ': ' + this.displayDate
        + '</div>';
}

function filterReturnDates(returnDates) {
    return returnDates
        .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} )
        .slice(0, getMaxItems())
}


function addToContainer(random, returnDates) {
    returnDates = filterReturnDates(returnDates);
    $('.trash' + random + ' .state').html('');

    if (typeof(_DO_NOT_USE_COLORED_TRASHCAN) === 'undefined' || _DO_NOT_USE_COLORED_TRASHCAN === false) {
        $('.trash' + random).find('img.trashcan').attr('src', getKlikoImage(returnDates[0].garbageType));
        $('.trash' + random).find('img.trashcan').css('opacity', '0.7');
    } else {
        $('.trash' + random).find('img.trashcan').css('opacity', '1');
    }
    returnDates.forEach(function (element) {
        $('.trash' + random + ' .state').append(getTrashRow(element));
    });
}

function mapGarbageType(garbageType) {
    if (garbageType.match(/(gft)|(tuin)|(refuse bin)|(green)/i)) {
        return 'gft';
    }
    else if (garbageType.match(/(black)|(zwart)/i)) {
        return 'black';
    }
    else if (garbageType.match(/(plastic)|(pmd)|(verpakking)|(kunststof)/i)) {
        return 'pmd';
    }
    else if (garbageType.match(/(brown)/i)) {
        return 'brown';
    }
    else if (garbageType.match(/(grof)|(grey)|(rest)/i)) {
        return 'rest';
    }
    else if (garbageType.match(/(papier)|(blauw)|(blue)|(recycling bin collection)/i)) {
        return 'papier';
    }
    else if (garbageType.match(/(chemisch)|(kca)|(kga)/i)) {
        return 'kca';
    }
    return 'black';
}

function getKlikoImage(garbageType) {
    var color = settings['garbage'][garbageType];
    return 'img/kliko_' + color.kliko + '.png';
}

function getMaxItems() {
    if (typeof(settings['garbage_maxitems']) !== 'undefined'
        && parseFloat(settings['garbage_maxitems']) > 0
    ) {
        return settings['garbage_maxitems'];
    }
    return 5;
}

function getOmriData(address, date, random) {
    // $.post('http://www.omrin.nl/bij-mij-thuis/services/afvalkalender/',{
    //     'zipcode': address.postcode.substr(0,4),
    //     'zipcodeend':address.postcode.substr(4,6),
    //     'housenumber':address.housenumber,
    //     'addition':'',
    //     'send':'Mijn overzicht'
    // }, function(data) {
    //     console.log(data);
    // });
}

function loadDataForService(service, random) {
    var address = {
        street: settings['garbage_street'] || '',
        housenumber: settings['garbage_housenumber'] || '',
        housenumberSuffix: settings['garbage_housenumberadd'] || '',
        postcode: settings['garbage_zipcode'] || '',
    };
    var date = {
        start: moment(),
        end: moment().add(32, 'days'),
    };

    var serviceProperties = {
        googlecalendar: {dataHandler: 'getGoogleCalendarData', identifier: settings['garbage_calendar_id']},
        ical: {dataHandler: 'getIcalData', identifier: settings['garbage_icalurl']},
        gemertbakelmaandag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/o44qrtdhls8saftmesm5rqb85o%40group.calendar.google.com/public/basic.ics'},
        gemertbakeldinsdag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/6p8549rssv114ddevingime95o%40group.calendar.google.com/public/basic.ics'},
        gemertbakelwoensdag: {dataHandler: 'getIcalData', identifier: 'https://calendar.google.com/calendar/ical/cv40f4vaie10v54f72go6ipb78%40group.calendar.google.com/public/basic.ics'},
        veldhoven: {dataHandler: 'getIcalData', identifier: 'https://www.veldhoven.nl/afvalkalender/' + moment().format('YYYY') + '/' + address.postcode + '-' + address.housenumber + '.ics'},
        best: {dataHandler: 'getIcalData', identifier: 'https://www.gemeentebest.nl/afvalkalender/' + moment().format('YYYY') + '/' + address.postcode + '-' + address.housenumber + '.ics'},
        uden: {dataHandler: 'getIcalData', identifier: 'https://www.uden.nl/inwoners/afval/ophaaldagen-afval/' + moment().format('YYYY') + address.postcode + '-' + address.housenumber + '.ics'},
        vianen: {dataHandler: 'getIcalData', identifier: 'https://www.vianen.nl/afval/afvalkalender/' + moment().format('YYYY') + address.postcode + '-' + address.housenumber + '.ics'},
        goes: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.goes.nl/' + moment().format('YYYY') + address.postcode + '-' + address.housenumber + '.ics'},
        deurne: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.deurne.nl/Afvalkalender/download_ical.php?p=' + address.postcode + '&h=' + address.housenumber + '&t=&jaar=' + moment().format('YYYY')},
        heezeleende: {dataHandler: 'getIcalData', identifier: 'http://afvalkalender.heeze-leende.nl/Afvalkalender/download_ical.php?p=' + address.postcode + '&h=' + address.housenumber + '&t=&jaar=' + moment().format('YYYY')},
        deafvalapp: {dataHandler: 'getDeAfvalAppData', identifier: ''},
        twentemilieu: {dataHandler: 'getTwenteMilieuData', identifier: ''},
        cure: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.cure-afvalbeheer.nl'},
        cyclusnv: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.cyclusnv.nl'},
        gemeenteberkelland: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.gemeenteberkelland.nl'},
        meerlanden: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.meerlanden.nl'},
        venray: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.venray.nl'},
        circulusberkel: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.circulus-berkel.nl'},
        rmn: {dataHandler: 'getAfvalstromenData', identifier: 'https://inzamelschema.rmn.nl'},
        alphenaandenrijn: {dataHandler: 'getAfvalstromenData', identifier: 'http://afvalkalender.alphenaandenrijn.nl'},
        sudwestfryslan: {dataHandler: 'getAfvalstromenData', identifier: 'http://afvalkalender.sudwestfryslan.nl'},
        dar: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.dar.nl'},
        waalre: {dataHandler: 'getAfvalstromenData', identifier: 'https://afvalkalender.waalre.nl'},
        avalex: {dataHandler: 'getAfvalstromenData', identifier: 'https://www.avalex.nl'},
        ophaalkalender: {dataHandler: 'getOphaalkalenderData', identifier: ''},
        afvalwijzerarnhem: {dataHandler: 'getAfvalwijzerArnhemData', identifier: ''},
        mijnafvalwijzer: {dataHandler: 'getMijnAfvalwijzerData', identifier: ''},
        hvc: {dataHandler: 'getHvcData', identifier: ''},
        rova: {dataHandler: 'getRovaData', identifier: ''},
        recyclemanager: {dataHandler: 'getRecycleManagerData', identifier: ''},
        edg: {dataHandler: 'getEdgData', identifier: ''},
        omri: {dataHandler: 'getOmriData', identifier: ''},
    };
    window[serviceProperties[service].dataHandler](address, date, random, serviceProperties[service].identifier);
}
