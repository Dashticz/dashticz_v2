var recurring = {};
var allchannels = [];

function addTVGuide(tvobject, tvObjorg) {
    if (typeof(allchannels[1]) === 'undefined') {
        var cache = new Date().getTime();
        curUrl = 'http://dashticz.nl/tv/channels.php';
        $.getJSON(curUrl, function (channels, textstatus, jqXHR) {
            for (num in channels) {
                allchannels[channels[num]['id']] = channels[num]['name'];
            }
        });

        setTimeout(function () {
            addTVGuide(tvobject, tvObjorg);
        }, 500);
    }
    else {
        tvObj = tvObjorg;
        var tvitems = []
        var maxitems = 10;
        if (typeof(tvObj.maxitems) !== 'undefined') maxitems = tvObj.maxitems;

        var cache = new Date().getTime();

        curUrl = 'http://dashticz.nl/tv/tv.php?channels=' + tvObj.channels.join(',') + '&time=' + cache;
        moment.locale(settings['calendarlanguage']);
        $.getJSON(curUrl, function (data, textstatus, jqXHR) {

            for (channel in data) {
                for (e in data[channel]) {
                    event = data[channel][e];

                    var enddateStamp = moment(event.datum_end).format('X');
                    var startdate = event.datum_start;
                    var enddate = event.datum_end;

                    enddate = moment(event.datum_end).format('HH:mm');
                    if (enddate !== '') enddate = ' - ' + enddate;

                    event.enddate = enddate;
                    event.startdate = startdate;
                    event.starttime = moment(event.datum_start).format('HH:mm');
                    event.channel = allchannels[channel];
                    if (parseFloat(enddateStamp) > moment().format('X')) {
                        if (typeof(tvitems[enddateStamp]) === 'undefined') tvitems[enddateStamp] = [];
                        tvitems[enddateStamp].push(event);
                    }
                }
            }

            tvobject.find('.items').html('');
            var counter = 1;
            tvitems = ksort(tvitems);
            for (check in tvitems) {
                items = tvitems[check];
                for (c in items) {
                    item = items[c];
                    if (check > moment().format('X') && counter <= maxitems) {
                        var widget = '<div>' + item['starttime'] + '' + item['enddate'] + ' - <em>' + item['channel'] + '</em> - <b>' + item['titel'] + '</b></div>';
                        tvobject.find('.items').append(widget);
                        counter++;
                    }
                }
            }

        });

        setTimeout(function () {
            addTVGuide(tvobject, tvObjorg);
        }, (60000 * 5));
    }
}
