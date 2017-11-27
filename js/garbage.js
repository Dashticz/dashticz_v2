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
                } else if (element.start.hasOwnProperty('datetime')) {
                    this.startDate = moment(element.start.datetime);
                }
                return {
                    trashRow: getSimpleTrashRow(this.startDate, element.summary),
                    date: this.startDate,
                    summary: element.summary
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
        var respArray = data.toString().split('\n').join('').split(';');
        respArray.pop();
        this.returnDates = {};
        this.counter = 0;
        var curr;
        var dates={};
        for (var i in respArray) {
            if (isNaN(parseInt(respArray[i]))) {
                dates[respArray[i]] = [];
                curr = respArray[i];
                curr = capitalizeFirstLetter(curr.toLowerCase());
            } else {
                var testDate = moment(respArray[i], 'DD-MM-YYYY');
                if (testDate.isBetween(date.start, date.end, 'days', true)) {
                    if (typeof(this.returnDates[curr]) === 'undefined') {
                        this.returnDates[curr] = {}
                    }
                    this.returnDates[curr][testDate.format('YYYY-MM-DD') + this.counter] = getTrashRow(curr, testDate);
                    this.counter++;
                }
            }
        }
        addToContainer(random, this.returnDates);
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
                        trashRow: getSimpleTrashRow(moment(dateElement, 'YYYY-MM-DDTHH:mm:ss'), pickupTypes[element.pickupType]),
                        date: dateElement,
                        summary: pickupTypes[element.pickupType]
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
            this.counter = 0;
            this.returnDates = {};
            for (d in data) {
                if (data[d]['ophaaldatum'] !== null) {
                    var curr = data[d]['menu_title'];
                    curr = capitalizeFirstLetter(curr.toLowerCase());
                    if (typeof(this.returnDates[curr]) === 'undefined') {
                        this.returnDates[curr] = {}
                    }
                    var testDate = moment(moment(data[d]['ophaaldatum']));
                    this.returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + this.counter] = getTrashRow(curr, testDate);
                    this.counter++;
                }
            }

            addToContainer(random, this.returnDates);
        });
    });
}

function getOphaalkalenderData(address, date, random) {
    $('.trash' + random + ' .state').html('');

    this.baseURL = 'http://www.ophaalkalender.be';
    this.counter = 0;
    this.returnDates = {};

    $.getJSON('https://cors-anywhere.herokuapp.com/' + this.baseURL + '/calendar/findstreets/?query=' + address.street + '&zipcode=' + address.postcode, function (data) {
        $.getJSON('https://cors-anywhere.herokuapp.com/' + this.baseURL + '/api/rides?id=' + data[0].Id + '&housenumber=0&zipcode=' + address.postcode, function (data) {

            for (d in data) {
                var curr = data[d]['title'];
                curr = capitalizeFirstLetter(curr.toLowerCase());
                if (typeof(this.returnDates[curr]) === 'undefined') {
                    this.returnDates[curr] = {}
                }
                var testDate = moment(moment(data[d]['start']));
                if (testDate.isBetween(date.start, date.end, 'days', true)) {
                    this.returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + this.counter] = getTrashRow(curr, testDate, data[d]['color']);
                    this.counter++;
                }
            }

            addToContainer(random, returnDates);
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
                return element.date >= date.start.format('YYYY-MM-DD')
                    && element.date <= date.end.format('YYYY-MM-DD');
            })
            .slice(0, getMaxItems())
            .map(function (element) {
                return {
                    trashRow: getSimpleTrashRow(moment(element.date, 'YYYY-MM-DD'), element.nameType),
                    date: element.date,
                    summary: element.nameType
                };
            });
        addToContainerNew(random, data);
    });
}

function getHvcData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/http://inzamelkalender.hvcgroep.nl/push/calendar?postcode=' + address.postcode + '&huisnummer=' + address.housenumber, function (data) {
        this.returnDates = {};
        for (d in data) {
            var curr = data[d].naam;
            curr = capitalizeFirstLetter(curr.toLowerCase());
            if (typeof(this.returnDates[curr]) === 'undefined') {
                this.returnDates[curr] = {}
            }

            for (dt in data[d].dateTime) {
                var testDate = moment(data[d].dateTime[dt].date);
                if (testDate.isBetween(date.start, date.end, 'days', true)) {
                    this.returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + curr] = getTrashRow(curr, testDate);
                }
            }
        }
        addToContainer(random, this.returnDates);
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

function getRecycleManagerData(address, date, random) {
    $.getJSON('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + address.postcode + '&number=' + address.housenumber, function (data) {
        this.returnDates = {};
        this.counter = 0;
        for (d in data.data) {
            for (o in data.data[d].occurrences) {
                var curr = data.data[d].occurrences[o].title;
                curr = capitalizeFirstLetter(curr.toLowerCase());
                if (typeof(this.returnDates[curr]) === 'undefined') {
                    this.returnDates[curr] = {}
                }

                var testDate = moment(data.data[d].occurrences[o].from.date);
                if (testDate.isBetween(date.start, date.end, 'days', true)) {
                    this.returnDates[curr][testDate.format('YYYY-MM-DD') + '_' + this.counter] = getTrashRow(curr, testDate);
                    this.counter++;
                }
            }
        }
        addToContainer(random, this.returnDates);
    });
}

function getEdgData(address, date, random) {
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.edg.de/JsonHandler.ashx?dates=1&street=' + address.street + '&nr=' + address.housenumber + '&cmd=findtrash&tbio=0&tpapier=1&trest=1&twert=1&feiertag=0', function (data) {
        data = data.data;
        this.returnDates = {};
        this.counter = 0;
        var curr = '';

        for (d in data) {
            if (typeof(returnDates[curr]) === 'undefined') {
                this.returnDates[curr] = {}
            }

            var testDate = moment(data[d]['date']);
            if (testDate.isBetween(date.start, date.end, 'days', true)) {
                for (e in data[d].fraktion) {
                    this.returnDates[curr][moment(data[d]['date']).format('YYYY-MM-DD')] = getTrashRow(data[d].fraktion[e], testDate);
                    this.counter++;
                }
            }
        }
        addToContainer(random, this.returnDates);
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
        $('.trash' + random).find('img.trashcan').css('opacity', '0.7');
    } else {
        $('.trash' + random).find('img.trashcan').css('opacity', '1');
    }
    returnDates.forEach(function (element, index) {
        if (index === 0 && (typeof(_DO_NOT_USE_COLORED_TRASHCAN) === 'undefined' || _DO_NOT_USE_COLORED_TRASHCAN === false)) {
            $('.trash' + random).find('img.trashcan').attr('src', getKlikoImage(element.summary.toLowerCase()));
        }

        $('.trash' + random + ' .state').append(element.trashRow);
    });
}

function getKlikoImage(element) {
    if (element.indexOf('gft') >= 0 ||
        element.indexOf('tuin') >= 0 ||
        element.indexOf('refuse bin') >= 0
    ) {
        return 'img/kliko_green.png';
    }
    else if (element.indexOf('plastic') >= 0 ||
        element.indexOf('pmd') >= 0
    ) {
        return 'img/kliko_orange.png';
    }
    else if (element.indexOf('rest') >= 0 ||
        element.indexOf('grof') >= 0
    ) {
        return 'img/kliko_grey.png';
    }
    else if (element.indexOf('papier') >= 0 ||
        element.indexOf('blauw') >= 0 ||
        element.indexOf('recycling bin collection') >= 0
    ) {
        return 'img/kliko_blue.png';
    }
    else if (element.indexOf('chemisch') >= 0) {
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
