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
                    garbageType: element.summary
                };
            });
        addToContainerNew(random, this.returnDates);
        }
    });
}

function getIcalData(address, date, random, url) {
    var baseIcalUrl = 'https://wedevise.nl/dashticz/ical/demo/?url=';
    $.getJSON(baseIcalUrl + url, function (data, textstatus, jqXHR) {
        respArray = data;
        this.counter = 0;
        this.returnDates = {};
        for (var i in respArray) {
            var curr = respArray[i]['title'];
            curr = capitalizeFirstLetter(curr.toLowerCase());

            var testDate = moment(respArray[i].startt);
            if (testDate.isBetween(date.start, date.end, 'days', true)) {
                if (typeof(this.returnDates[curr]) === 'undefined') {
                    this.returnDates[curr] = {};
                }
                this.returnDates[curr][testDate.format('YYYY-MM-DD') + this.counter] = getTrashRow(curr, testDate, respArray[i]['title']);
                this.counter++;
            }
        }
        addToContainer(random, this.returnDates);
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
                        garbageType: garbageType,
                    });
            });
        });
        dataFiltered = dataFiltered
            .filter(function (element) {
                return element.date.isBetween(date.start, date.end, null, '[]');
            })
            .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);})
            .slice(0, getMaxItems());

        addToContainerNew(random, dataFiltered);
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
                        garbageType: pickupTypes[element.pickupType],
                    });
                });
            });
            dataFiltered = dataFiltered.sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} );

            addToContainerNew(random, dataFiltered.slice(0, getMaxItems()));
        });
    });
}

function getAfvalstromenData(address, date, random, baseUrl) {
    $('.trash' + random + ' .state').html('');
    $.getJSON('https://cors-anywhere.herokuapp.com/' + baseUrl + '/rest/adressen/' + address.postcode + '-' + address.housenumber, function (data) {
        $.getJSON('https://cors-anywhere.herokuapp.com/' + baseUrl + '/rest/adressen/' + data[0].bagId + '/afvalstromen', function (data) {
            data = data
                .filter(function (element) { return element.ophaaldatum !== null; })
                .sort(function(a,b) {return (a.ophaaldatum > b.ophaaldatum) ? 1 : ((b.ophaaldatum > a.ophaaldatum) ? -1 : 0);})
                .slice(0, getMaxItems())
                .map(function (element) {
                    return {
                        date: moment(element.ophaaldatum, 'YYYY-MM-DD'),
                        summary: element.title,
                        garbageType: element.title,
                    };
                });
            addToContainerNew(random, data);
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
                .sort(function(a,b) {return (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0);})
                .map(function (element) {
                    return {
                        date: moment(element.start, 'YYYY-MM-DDTHH:mm:ss+-HH:mm'),
                        summary: element.title,
                        garbageType: element.color,
                    }
                })
                .slice(0, getMaxItems());
            addToContainerNew(random, data);
        });
    });
}

function getAfvalwijzerArnhemData(address, date, random) {
    $('.trash' + random + ' .state').html('');
    this.returnDates = {};
    var baseURL = 'http://www.afvalwijzer-arnhem.nl';
    $.get('https://cors-anywhere.herokuapp.com/' + baseURL + '/applicatie?ZipCode=' + address.postcode + '&HouseNumber=' + address.housenumber + '&HouseNumberAddition=' + address.housenumberSuffix, function (data) {
        $(data).find('ul.ulPickupDates li').each(function () {
            var row = $(this).html().split('</div>');
            var curr = row[0].replace('<div>', '').trim();
            var testDate = moment(row[1].trim(), 'DD-MM-YYYY');
            if (testDate.isBetween(date.start, date.end, 'days', true)) {
                if (typeof(this.returnDates[curr]) === 'undefined') {
                    returnDates[curr] = {}
                }
                returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + curr] = getTrashRow(curr, testDate);
            }
        });
        addToContainer(random, this.returnDates);
    });
}

function getMijnAfvalwijzerData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + address.postcode + '&street=&huisnummer=' + address.housenumber + '&toevoeging=' + address.housenumberSuffix, function (data) {
        data = data.data.ophaaldagen.data
            .filter(function (element) {
                return moment(element.date).isBetween(date.start, date.end, null, '[]');
            })
            .slice(0, getMaxItems())
            .map(function (element) {
                return {
                    date: moment(element.date),
                    summary: element.nameType,
                    garbageType: element.type,
                };
            });
        addToContainerNew(random, data);
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
                        garbageType: element.code,
                    });
                    seen[this.date.format('YYYY-MM_DD')] = true;
                }
            });
        });
        dataFiltered = dataFiltered
            .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} )
            .slice(0, getMaxItems());

        addToContainerNew(random, dataFiltered);
    });
}

function getRovaData(address, date, random) {
    $.getJSON('https://wedevise.nl/dashticz/rova.php?zipcode=' + address.postcode + '&number=' + address.housenumber, function (data) {
        this.returnDates = {};
        this.counter = 0;
        for (d in data) {
            var curr = data[d].GarbageType;
            curr = capitalizeFirstLetter(curr.toLowerCase());
            if (typeof(this.returnDates[curr]) === 'undefined') {
                this.returnDates[curr] = {}
            }

            var testDate = moment(data[d].Date);
            if (testDate.isBetween(date.start, date.end, 'days', true)) {
                this.returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + this.counter] = getTrashRow(curr, testDate);
                this.counter++;
            }
        }
        addToContainer(random, this.returnDates);
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
                    garbageType: occurrence.title,
                });
            });
        });

        dataFiltered = dataFiltered
            .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} )
            .slice(0, getMaxItems());
        addToContainerNew(random, dataFiltered);
    });
}

function getEdgData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.edg.de/JsonHandler.ashx?dates=1&street=' + address.street + '&nr=' + address.housenumber + '&cmd=findtrash&tbio=0&tpapier=1&trest=1&twert=1&feiertag=0', function (data) {
        data = data.data
            .map(function (element) {
                return {
                    date: moment(element.date, 'DD.MM.YYYY'),
                    summary: element.fraktion[0],
                    garbageType: element.fraktion[0],
                }
            })
            .slice(0, getMaxItems());
        addToContainerNew(random, data);
    });
}

function getTrashRow(c, d, orgcolor) {
    color = '';
    if (typeof(trashcolors) !== 'undefined' && typeof(trashcolors[c]) !== 'undefined') color = ' style="color:' + trashcolors[c] + '"';
    if (typeof(trashnames) !== 'undefined' && typeof(trashnames[c]) !== 'undefined') c = trashnames[c];

    if (c.length === 0) return '';
    if (c.match(/[A-Z][a-z] [a-z]{2}[0-9]{2}/)) {
        if (c.toLowerCase().indexOf("gft") > 0) c = 'GFT';
        else if (c.toLowerCase().indexOf("rest") > 0) c = 'Restafval';
        else if (c.toLowerCase().indexOf("vec") > 0) c = 'Verpakkingen';
    }
    orgcolor_attr = ' data-color="' + color + '";';
    if (typeof(orgcolor) !== 'undefined') orgcolor_attr = ' data-color="' + orgcolor + '"';

    return '<div class="trashrow"' + color + orgcolor_attr + '>' + c + ': ' + d.locale(settings['calendarlanguage']).format('l') + '</div>';
}

function getSimpleTrashRow(date, summary) {
    date.locale(settings['calendarlanguage']);
    this.displayDate = date.locale(settings['calendarlanguage']).format('l');
    if (date.isSame(moment(), 'day')) {
        this.displayDate = language.weekdays.today;
    } else if (date.isSame(moment().add(1, 'days'), 'day')) {
        this.displayDate = language.weekdays.tomorrow;
    } else if (date.isBefore(moment().add(1, 'week'))) {
        this.displayDate = date.format('dddd');
    }
    return '<div class="trashrow">' + (summary.charAt(0).toUpperCase() + summary.slice(1)) + ': ' + this.displayDate + '</div>';
}

function addToContainer(random, returnDates) {
    var returnDatesSimple = {};
    var done = {};
    for (c in returnDates) {
        for (cr in returnDates[c]) {
            if (returnDates[c][cr] == '') continue;
            returnDatesSimple[cr] = returnDates[c][cr];
            done[c] = true;
        }
    }

    $('.trash' + random + ' .state').html('');

    if (typeof(_DO_NOT_USE_COLORED_TRASHCAN) === 'undefined' || _DO_NOT_USE_COLORED_TRASHCAN === false) {
        $('.trash' + random).find('img.trashcan').css('opacity', '0.7');
    }
    else {
        $('.trash' + random).find('img.trashcan').css('opacity', '1');
    }
    Object.keys(returnDatesSimple).sort().slice(0, getMaxItems()).forEach(function (key, index) {
        var skey = key.split('_');
        skey = skey[0];
        var date = moment(skey).format('DD-MM-YYYY');
        var currentdate = moment();
        var tomorrow = moment().add(1, 'days');
        var nextweek = moment().add(6, 'days');

        if (index === 0 && (typeof(_DO_NOT_USE_COLORED_TRASHCAN) === 'undefined' || _DO_NOT_USE_COLORED_TRASHCAN === false)) {
            $('.trash' + random).find('img.trashcan').attr('src', getKlikoImage(returnDatesSimple[key].toLowerCase()));
        }

        if (date === currentdate.format('DD-MM-YYYY')) {
            returnDatesSimple[key] = returnDatesSimple[key].replace(date, language.weekdays.today);
            returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtoday');
        }
        else if (date === tomorrow.format('DD-MM-YYYY')) {
            returnDatesSimple[key] = returnDatesSimple[key].replace(date, language.weekdays.tomorrow);
            returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtomorrow');
        }
        else if (moment(skey).isBetween(currentdate, nextweek, 'days', true)) {
            var datename = moment(date, 'DD-MM-YYYY').locale(settings['calendarlanguage']).format('dddd');
            datename = datename.charAt(0).toUpperCase() + datename.slice(1);
            returnDatesSimple[key] = returnDatesSimple[key].replace(date, datename);
        }

        $('.trash' + random + ' .state').append(returnDatesSimple[key]);
    });
}

function addToContainerNew(random, returnDates) {
    $('.trash' + random + ' .state').html('');

    if (typeof(_DO_NOT_USE_COLORED_TRASHCAN) === 'undefined' || _DO_NOT_USE_COLORED_TRASHCAN === false) {
        $('.trash' + random).find('img.trashcan').attr('src', getKlikoImage(returnDates[0].garbageType.toLowerCase()));
        $('.trash' + random).find('img.trashcan').css('opacity', '0.7');
    } else {
        $('.trash' + random).find('img.trashcan').css('opacity', '1');
    }
    returnDates.forEach(function (element) {
        $('.trash' + random + ' .state').append(getSimpleTrashRow(element.date, element.summary));
    });
}

function getKlikoImage(element) {
    if (element.match(/(gft)|(tuin)|(refuse bin)|(green)/i)) {
        return 'img/kliko_green.png';
    }
    else if (element.match(/(black)|(zwart)/i)) {
        return 'img/kliko_black.png';
    }
    else if (element.match(/(plastic)|(pmd)|(verpakking)/i)) {
        return 'img/kliko_orange.png';
    }
    else if (element.match(/(brown)/i)) {
        return 'img/kliko_brown.png';
    }
    else if (element.match(/(grof)|(grey)/i)) {
        return 'img/kliko_grey.png';
    }
    else if (element.match(/(papier)|(blauw)|(blue)|(recycling bin collection)/i)) {
        return 'img/kliko_blue.png';
    }
    else if (element.match(/(chemisch)|(kca)|(kga)/i)) {
        return 'img/kliko_red.png';
    }
    return 'img/kliko.png';
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
