var recurring = {};
var allchannels = [];

function addTVGuide(tvobject, tvObjorg) {
    if (typeof(allchannels[1]) === 'undefined') {
        var cache = new Date().getTime();
        curUrl=_CORS_PATH+'http://json.tvgids.nl/v4/channels';
        $.getJSON(curUrl, function (channels, textstatus, jqXHR) {
            for (num in channels.data) {
                allchannels[channels.data[num]['ch_id']] = channels.data[num]['ch_name'];
            }
            addTVGuide2(tvobject, tvObjorg);
        })
        .fail(function() {
            console.log( "error getting channel info from tvgids. Retrying in 5 seconds." );
            setTimeout(function () {
                addTVGuide(tvobject, tvObjorg);
            }, 5000);
          });

    
    }
    else {
      addTVGuide2(tvobject, tvObjorg);
    }
}

function addTVGuide2(tvobject, tvObjorg) {
        tvObj = tvObjorg;
        var tvitems = []
        var maxitems = 10;
        if (typeof(tvObj.maxitems) !== 'undefined') maxitems = tvObj.maxitems;

        var cache = new Date().getTime();

        curUrl= _CORS_PATH +'http://json.tvgids.nl/v4/programs/?day=0&channels=' + tvObj.channels.join(',') + '&time=' + cache;
        moment.locale(settings['calendarlanguage']);
        $.getJSON(curUrl, function (data, textstatus, jqXHR) {
            for (channel in data.data) {
                for (e in data.data[channel].prog) {
                    event = data.data[channel].prog[e];
                    var enddateStamp = event.e;
                    if (parseFloat(enddateStamp) > moment().format('X')) {
                        var newevent={};
                        newevent.starttime = moment(event.s,'X').format('HH:mm');
                        newevent.endtime = moment(event.e,'X').format('HH:mm');
                        newevent.channel = allchannels[channel];
                        newevent.title = event.title;
                        if (typeof(tvitems[enddateStamp]) === 'undefined') tvitems[enddateStamp] = [];
                        tvitems[enddateStamp].push(newevent);
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
                       //Sometimes there might be no endtime (?). In that case the next line will give an error
                        var widget = '<div>' + item['starttime'] + ' - ' + item['endtime'] + ' - <em>' + item['channel'] + '</em> - <b>' + item['title'] + '</b></div>';
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
