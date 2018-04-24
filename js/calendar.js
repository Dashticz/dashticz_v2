var recurring = {};

function addCalendar(calobject, icsUrlorg) {
    if (typeof(icsUrlorg.calendars) == 'undefined') {
        var icsUrl = {};
        icsUrl.calendars = [];
        icsUrl.maxitems = icsUrlorg.maxitems;
        icsUrl.calendars[0] = {};
        icsUrl.calendars[0].calendar = icsUrlorg;
    }
    else icsUrl = icsUrlorg;

    var done = 0;
    var doneitems = {};
    var amountc = objectlength(icsUrl.calendars);
    var calitems = [];
    var colors = {};

    var maxitems = 10;
    if (typeof(icsUrl.maxitems) !== 'undefined') maxitems = icsUrl.maxitems;

    for (c in icsUrl.calendars) {
        curUrl = icsUrl.calendars[c].calendar;
        if (typeof(curUrl.url) !== 'undefined') {
            var random = getRandomInt(1, 100000);
            var html = '<div class="modal fade" id="calendar_' + random + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<iframe data-popup="' + curUrl.url + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
            calobject.find('.transbg').addClass('hover');
            calobject.attr('data-toggle', 'modal');
            calobject.attr('data-id', '');
            calobject.attr('data-target', '#calendar_' + random);
            calobject.attr('onclick', 'setSrc(this);');
        }

        if (typeof(curUrl.icalurl) !== 'undefined') {
            curUrl = curUrl.icalurl.replace(/webcal?\:\/\//i, 'https://');
        }

        var color = '';
        if (typeof(icsUrl.calendars[c].color) !== 'undefined') color = icsUrl.calendars[c].color;

        curUrl = curUrl.replace('https://cors-anywhere.herokuapp.com/', '');

        colors[$.md5(curUrl)] = color;
        var cache = new Date().getTime();
        curUrl = 'http://dashticz.nl/ical/?time=' + cache + '&url=' + curUrl;
        moment.locale(settings['calendarlanguage']);
        $.getJSON(curUrl, function (data, textstatus, jqXHR) {

            var url = this.url.replace('https://cors-anywhere.herokuapp.com/http://ical-to-json.herokuapp.com/convert.json?url=', '');
            var url = this.url.split('url=');
            var url = url[1];

            done++;
            for (e in data) {
                event1 = data[e];
                var startdateStamp = event1.start;
                var enddateStamp = event1.end;
                var startdate = moment.unix(event1.start).format(settings['calendarformat']);
                var enddate = moment.unix(event1.end).format(settings['calendarformat']);

                if (event1.allDay == '') {
                    var test = settings['calendarformat'];
                    test = test.replace('dd', '');
                    test = test.replace('dddd', '');
                    if (moment(enddate, test).format('YYYY-MM-DD') === moment(startdate, test).format('YYYY-MM-DD')) {
                        enddate = moment.unix(event1.end + 60).format('HH:mm');
                    }
                    if (enddate !== '') enddate = ' - ' + enddate;
                }
                else {
                    enddate = '';
                    startdate = startdate.replace('00:00', '');
                    startdate = startdate.replace('00:00:00', '');
                    startdate += ' ' + language.weekdays.entire_day
                }
                event1.enddate = enddate;
                event1.startdate = startdate;

                event1.color = colors[$.md5(url)];
                if (parseFloat(enddateStamp) > moment().format('X')) {
                    if (typeof(calitems[enddateStamp]) === 'undefined') calitems[enddateStamp] = []
                    calitems[enddateStamp].push(event1);
                }
            }

            if (done == amountc) {
                calobject.find('.items').html('');
                var counter = 1;
                calitems = ksort(calitems);
                for (check in calitems) {
                    items = calitems[check];
                    for (c in items) {
                        item1 = items[c];
                        if (check > moment().format('X') && counter <= maxitems) {
                            var widget = '<div style="color:' + item1['color'] + '">' + item1['startdate'] + "" + item1['enddate'] + ' - <b>' + item1['title'] + '</b></div>';
                            calobject.find('.items').append(widget);
                            counter++;
                        }
                    }
                }
            }

        });
    }

    setTimeout(function () {
        addCalendar(calobject, icsUrlorg);
    }, (60000 * 5));
}
