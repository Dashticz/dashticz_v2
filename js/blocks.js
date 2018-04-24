blocktypes = {};
blocktypes.SubType = {};
blocktypes.SubType['Visibility'] = {icon: 'fa fa-eye', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Electric'] = {icon: 'fa fa-plug', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Lux'] = {icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Pressure'] = {icon: 'wi wi-barometer', title: '<Name>', value: '<Data>', format: true, decimals: 1};
blocktypes.SubType['Barometer'] = {icon: 'wi wi-barometer', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Sound Level'] = {icon: 'fa fa-volume-up', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Distance'] = {icon: 'fa fa-eye', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Alert'] = {icon: 'fa fa-warning', title: '<Data>', value: '<Name>'};
blocktypes.SubType['Percentage'] = {icon: 'fa fa-percent', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Text'] = {icon: 'fa fa-file', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Counter Incremental'] = {
    icon: 'fa fa-bolt',
    title: '<Name>',
    value: '<Data>',
    format: true,
    decimals: 2
};
blocktypes.SubType['Voltage'] = {icon: 'fa fa-bolt', title: '<Name>', value: '<Data>'};
blocktypes.SubType['Solar Radiation'] = {
    icon: 'fa fa-sun-o',
    title: '<Name>',
    value: '<Data>',
    format: true,
    decimals: 0
};
blocktypes.SubType['Thermostat Mode'] = {icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Data>'};

blocktypes.SensorUnit = {};
blocktypes.SensorUnit['Fertility'] = {icon: 'fa fa-flask', title: '<Name>', value: '<Data>'};

blocktypes.Type = {};
blocktypes.Type['Rain'] = {icon: 'fa fa-tint', title: '<Name>', value: '<Rain>mm', format: true, decimals: 1};
blocktypes.Type['Wind'] = {icon: 'wi wi-wind-direction', title: language.wind.wind, value: ''};
blocktypes.Type['Temp'] = {
    icon: 'fa fa-thermometer-half',
    title: '<Name>',
    value: '<Temp>' + _TEMP_SYMBOL,
    format: true,
    decimals: 1
};
blocktypes.Type['Air Quality'] = {image: 'air.png', title: '<Name>', value: '<Data>'};
blocktypes.Type['UV'] = {icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>'};

blocktypes.HardwareType = {};
blocktypes.HardwareType['Motherboard sensors'] = {icon: 'fa fa-desktop', title: '<Name>', value: '<Data>'};
blocktypes.HardwareType['PVOutput (Input)'] = {};
blocktypes.HardwareType['PVOutput (Input)']['today'] = {icon: 'fa fa-sun-o', title: '<Name>', value: '<CounterToday>', format: true, decimals: 1};
blocktypes.HardwareType['PVOutput (Input)']['usage'] = {icon: 'fa fa-sun-o', title: '<Name>', value: '<Usage>', format: true, decimals: 1};
blocktypes.HardwareType['PVOutput (Input)']['total'] = {icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>', format: true, decimals: 0};

blocktypes.HardwareName = {};
blocktypes.HardwareName['Rain expected'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};

blocktypes.Name = {};
blocktypes.Name['Rain Expected'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};
blocktypes.Name['Rain expected'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};
blocktypes.Name['Regen mm/uur'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};
blocktypes.Name['Regen verwacht'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};
blocktypes.Name['Regen Verwacht'] = {icon: 'fa fa-tint', title: '<Data>', value: '<Name>'};

blocktypes.Name['Ping'] = {icon: 'fa fa-arrows-v', title: '<Name>', value: '<Data>'};
blocktypes.Name['Upload'] = {icon: 'fa fa-upload', title: '<Name>', value: '<Data>', format: true, decimals: 3};
blocktypes.Name['Download'] = {icon: 'fa fa-download', title: '<Name>', value: '<Data>', format: true, decimals: 3};

blocktypes.Name['Maanfase'] = {icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>'};
blocktypes.Name['Moon phase'] = {icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>'};
blocktypes.Name['Mondphase'] = {icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>'};

blocktypes = getExtendedBlockTypes(blocktypes);


function getBlock(cols, c, columndiv, standby) {
    if (typeof(cols) !== 'undefined') {
        var colclass = '';
        if (c === 'bar') colclass = 'transbg dark';
        if (!standby) $('div.screen' + s + ' .row').append('<div data-colindex="' + c + '" class="col-sm-' + cols['width'] + ' col-xs-12 sortable col' + c + ' ' + colclass + '"></div>');
        for (b in cols['blocks']) {
            var width = 12;
            switch (cols['blocks'][b]) {
                case 'logo':
                case 'settings':
                    width = 2;
                    break;
                case 'flipclock':
                case 'miniclock':
                    width = 8;
                    break;
            }
            if (typeof(blocks[cols['blocks'][b]]) !== 'undefined' && typeof(blocks[cols['blocks'][b]]['width']) !== 'undefined') width = blocks[cols['blocks'][b]]['width'];

            var blocktype = '';
            if (typeof(blocks[cols['blocks'][b]]) !== 'undefined' && typeof(blocks[cols['blocks'][b]]['type']) !== 'undefined') {
                blocktype = blocks[cols['blocks'][b]]['type'];
                if (blocktype === 'blocktitle') {
                    $(columndiv).append('<div data-id="' + cols['blocks'][b] + '" class="col-xs-' + width + ' mh titlegroups transbg">' +
                        '<h3>' + blocks[cols['blocks'][b]]['title'] + '</h3>' +
                        '</div>');
                    continue;
                }
            }

            switch (typeof(cols['blocks'][b])) {
                case 'object':
                    handleObjectBlock(cols['blocks'][b], b, columndiv, width, c);
                    continue;

                case 'string':
                    handleStringBlock(cols['blocks'][b], columndiv, width, c);
                    continue;

                default:
                    $(columndiv).append('<div data-id="' + cols['blocks'][b] + '" class="mh transbg block_' + cols['blocks'][b] + '"></div>');
                    break;
            }
        }
    }
}

function handleStringBlock(block, columndiv, width, c) {
    switch (block) {
        case 'logo':
            $(columndiv).append('<div data-id="logo" class="logo col-xs-' + width + '">' + settings['app_title'] + '</div>');
            return;
        case 'settings':
            var icons = ["settings", "fullscreen"];
            if (typeof (settings['settings_icons']) !== 'undefined') {
                icons = settings['settings_icons'];
            }
            var content = '<div class="col-xs-' + width + ' text-right" data-toggle="modal">';
            for (i = 0; i < icons.length; i++) {
                switch (icons[i]) {
                    case 'settings':
                        content += '<span class="settings settingsicon" data-id="settings" data-target="#settingspopup" data-toggle="modal"><em class="fa fa-cog"/></span>';
                        break;

                    case 'fullscreen':
                        $.ajax({url: 'js/fullscreen.js', async: false, dataType: "script"});
                        content += getFullScreenIcon();
                        break;
                }
            }
            content += '</div>';
            $(columndiv).append(content);
            return;
        case 'flipclock':
            $('<link href="vendor/flipclock/flipclock.css?v=' + cache + '" rel="stylesheet">').appendTo("head");
            $(columndiv).append('<div data-id="flipclock" class="transbg block_' + block + ' col-xs-' + width + ' text-center"><div class="flipclock"></div></div>');
            if (typeof(FlipClock) !== 'function') $.ajax({
                url: 'vendor/flipclock/flipclock.min.js',
                async: false,
                datatype: "script"
            });
            FlipClock($('.flipclock'), {
                clockFace: settings['shorttime'].match(/A/i) ? 'TwelveHourClock' : 'TwentyFourHourClock',
                showSeconds: !settings['hide_seconds']
            });
            return;
        case 'miniclock':
            $(columndiv).append('<div data-id="miniclock" class="miniclock col-xs-' + width + ' text-center">' +
                '<span class="weekday"></span> <span class="date"></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="clock"></span>' +
                '</div>');
            return;
        case 'clock':
            $(columndiv).append('<div data-id="clock" class="transbg block_' + block + ' col-xs-' + width + ' text-center">' +
                '<h1 class="clock"></h1><h4 class="weekday"></h4><h4 class="date"></h4>' +
                '</div>');
            return;
        case 'weather':
            if (typeof(loadWeatherFull) !== 'function') {
                $.ajax({url: 'js/weather.js', async: false, dataType: "script"});
            }
            $(columndiv).append('<div data-id="weather" class="block_' + block + ' containsweatherfull"></div>');
            if (settings['wu_api'] !== "" && settings['wu_city'] !== "") loadWeatherFull(settings['wu_city'], settings['wu_country'], $('.weatherfull'));
            return;
        case 'currentweather':
            if (settings['wu_api'] !== "" && settings['wu_city'] !== "") {
                if (typeof(loadWeather) !== 'function') {
                    $.ajax({url: 'js/weather.js', async: false, dataType: "script"});
                }
                $(columndiv).append('<div data-id="currentweather" class="mh transbg block_' + block + ' col-xs-' + width + ' containsweather">' +
                    '<div class="col-xs-4"><div class="weather" id="weather"></div></div>' +
                    '<div class="col-xs-8"><strong class="title weatherdegrees" id="weatherdegrees"></strong><br /><span class="weatherloc" id="weatherloc"></span></div>' +
                    '</div>');
                loadWeather(settings['wu_city'], settings['wu_country']);
            }
            return;
        case 'currentweather_big':
            if (settings['wu_api'] !== "" && settings['wu_city'] !== "") {
                if (typeof(loadWeather) !== 'function') {
                    $.ajax({url: 'js/weather.js', async: false, dataType: "script"});
                }
                $(columndiv).append('<div data-id="currentweather_big" class="mh transbg big block_' + block + ' col-xs-' + width + ' containsweather">' +
                    '<div class="col-xs-1"><div class="weather" id="weather"></div></div>' +
                    '<div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div>' +
                    '</div>');

                loadWeather(settings['wu_city'], settings['wu_country']);
            }
            return;
        case 'spotify':
            if (typeof(getSpotify) !== 'function') $.ajax({url: 'js/spotify.js', async: false, dataType: "script"});
            getSpotify(columndiv);
            return;
        case 'nzbget':
            if (typeof(loadNZBGET) !== 'function') $.ajax({url: 'js/nzbget.js', async: false, dataType: "script"});
            loadNZBGET(columndiv);
            return;
        case 'train':
            if (typeof(getTrainInfo) !== 'function') $.ajax({url: 'js/ns.js', async: false, dataType: "script"});
            $(columndiv).append('<div data-id="train" class="train"></div>');
            getTrainInfo();
            return;
        case 'traffic':
            if (typeof(getTraffic) !== 'function') $.ajax({url: 'js/traffic.js', async: false, dataType: "script"});
            $(columndiv).append('<div data-id="traffic" class="traffic"></div>');
            getTraffic();
            return;
        case 'trafficmap':
            $(columndiv).append('<div data-id="trafficmap" class="mh transbg block_trafficmap col-xs-12"><div id="trafficm" class="trafficmap"></div></div>');
            return;
        case 'news':
            if (typeof(getNews) !== 'function') $.ajax({url: 'js/news.js', async: false, dataType: "script"});
            $(columndiv).append('<div data-id="news" class="news"></div>');
            getNews('news', settings['default_news_url']);
            return;
        case 'log':
            if (typeof(getLog) !== 'function') $.ajax({url: 'js/log.js', async: false, dataType: "script"});
            getLog(columndiv);
            return;
        case 'stationclock':
            appendStationClock(columndiv, block, width);
            return;
        case 'sunrise':
            var classes = 'block_' + block + ' col-xs-' + width + ' transbg text-center sunriseholder';
            if (c === 'bar') {
                classes = 'block_' + block + ' col-xs-2 text-center sunriseholder';
            }
            $(columndiv).append('<div data-id="sunrise" class="' + classes + '">' +
                '<em class="wi wi-sunrise"></em><span class="sunrise"></span><em class="wi wi-sunset"></em><span class="sunset"></span>' +
                '</div>');
            return;
        case 'horizon':
            appendHorizon(columndiv);
            return;
        case 'icalendar':
            var random = getRandomInt(1, 100000);
            var html = '<div class="col-xs-' + width + ' transbg containsicalendar containsicalendar' + random + '">';
            html += '<div class="col-xs-2 col-icon">';
            html += '<em class="fa fa-calendar"></em>';
            html += '</div>';
            html += '<div class="col-xs-10 items">' + language.misc.loading + '</div>';
            html += '</div>';
            $(columndiv).append(html);
            addCalendar($('.containsicalendar' + random), settings['calendarurl']);
            return;
        case 'streamplayer':
            appendStreamPlayer(columndiv);
            return;
        case 'chromecast':
            $.ajax({url: 'js/chromecast.js', async: false, dataType: 'script'});
            loadChromecast(columndiv);
            return;
        case 'garbage':
            if (typeof(loadGarbage) !== 'function') {
                $.ajax({url: 'js/garbage.js', async: false, dataType: 'script'});
                $.ajax({url: 'vendor/ical/ical.min.js', async: false, dataType: 'script'});
            }
            $(columndiv).append(loadGarbage());
            getBlockClick('garbage');
            return;
        case 'sonarr':
            if (typeof(loadSonarr) !== 'function') $.ajax({url: 'js/sonarr.js', async: false, dataType: 'script'});
            $(columndiv).append(loadSonarr());
            getBlockClick('sonarr');
            return;
        case 'fullscreen':
            $(columndiv).append('<div data-id="fullscreen" class="col-xs-' + width + ' text-right">' + getFullScreenIcon() + '</div>');
            return;
        default:
            if (block.substring(0, 5) === 'news_') {
                if (typeof(getNews) !== 'function') $.ajax({url: 'js/news.js', async: false, dataType: 'script'});
                $(columndiv).append('<div class="' + block + '"></div>');
                getNews(block, blocks[block]['feed']);
                return;
            }
            $(columndiv).append('<div data-id="' + block + '" class="mh transbg block_' + block + '"></div>');
            return;
    }
}

function handleObjectBlock(block, index, columndiv, width, c) {
    var random = getRandomInt(1, 100000);
    if (block.hasOwnProperty('latitude')) {
        $(columndiv).append(loadMaps(random, block));
        return;
    } else if (block.hasOwnProperty('isimage')) {
        $(columndiv).append(loadImage(random, block));
        return;
    }
    var key = 'UNKNOWN';
    if (block.hasOwnProperty('key')) key = block['key'];
    if (block.hasOwnProperty('width')) width = block['width'];

    if (block.hasOwnProperty('frameurl')) {
        $(columndiv).append(loadFrame(random, block));
        return;
    } else if (block.hasOwnProperty('empty')) {
        $(columndiv).append('<div data-id="' + key + '" class="mh transbg col-xs-' + width + '">');
    } else if (block.hasOwnProperty('station')) {
        if (typeof(loadPublicTransport) !== 'function') $.ajax({
            url: 'js/publictransport.js',
            async: false,
            dataType: 'script'
        });
        $(columndiv).append(loadPublicTransport(random, block, key));
    } else if (block.hasOwnProperty('currency')) {
        if (typeof(getCoin) !== 'function') $.ajax({url: 'js/coins.js', async: false, dataType: 'script'});
        var html = '<div class="col-xs-' + width + ' transbg coins-' + block['key'] + '" data-id="coins.' + block['key'] + '"></div>';
        $(columndiv).append(html);
        getCoin(block);

    } else if (block.hasOwnProperty('channels')) {
        if (typeof(addTVGuide) !== 'function') $.ajax({url: 'js/tvguide.js', async: false, dataType: 'script'});

        dataId = 'tvguide.' + key;
        classes = 'block_tvguide transbg containstvguide containstvguide' + random;
        appendTvOrCalendarBlock(dataId, classes, width, block, columndiv);
        addTVGuide($('.containstvguide' + random), block);
        getBlockClick('tvguide');
    } else if (block.hasOwnProperty('icalurl')
        || block.hasOwnProperty('calendars')
    ) {
        dataId = 'calendars.' + key;
        classes = 'transbg containsicalendar containsicalendar' + random;
        appendTvOrCalendarBlock(dataId, classes, width, block, columndiv);
        if (typeof(addCalendar) !== 'function') $.ajax({url: 'js/calendar.js', async: false, dataType: 'script'});
        addCalendar($('.containsicalendar' + random), block);
    } else {
        $(columndiv).append(loadButton(index, block));
    }
}

function appendTvOrCalendarBlock(dataId, classes, width, block, columndiv) {
    var html = '';
    if (block.hasOwnProperty('title')) {
        html += '<div class="col-xs-' + width + ' mh titlegroups transbg"><h3>' + block['title'] + '</h3></div>';
    }

    html += '<div data-id="' + dataId + '" class="col-xs-' + width + ' ' + classes + '">';
    if (block.hasOwnProperty('icon') && block['icon'] !== '') {
        html += '<div class="col-xs-2 col-icon">';
        html += '<em class="fa ' + block['icon'] + '"></em>';
        html += '</div>';
        html += '<div class="col-xs-10 items">' + language.misc.loading + '</div>';
    }
    else if (block.hasOwnProperty('image') && block['image'] !== '') {
        html += '<div class="col-xs-2 col-icon">';
        html += '<img src="img/' + block['image'] + '" class="icon calendar_icon" />';
        html += '</div>';
        html += '<div class="col-xs-10 items">' + language.misc.loading + '</div>';
    } else {
        html += '<div class="col-xs-12 items">' + language.misc.loading + '</div>';
    }

    html += '</div>';
    $(columndiv).append(html);
}

function getStateBlock(id, icon, title, value, device) {
    if (typeof(blocks[id]) !== 'undefined' && typeof(blocks[id]['unit']) !== 'undefined') {
        var unitArray = blocks[id]['unit'].split(";");
        value = value.replace(unitArray[0], unitArray[1]);
    }

    getBlockClick(id, device);

    var stateBlock = '<div class="col-xs-4 col-icon">';
    stateBlock += '<em class="fa ' + icon + '"></em>';
    stateBlock += '</div>';
    stateBlock += '<div class="col-xs-8 col-data">';

    if (titleAndValueSwitch(id)) {
        stateBlock += '<strong class="title">' + title + '</strong><br />';
        stateBlock += '<span class="value">' + value + '</span>';
    } else {
        stateBlock += '<strong class="title">' + value + '</strong><br />';
        stateBlock += '<span class="value">' + title + '</span>';
    }
    if (showUpdateInformation(id)) {
        stateBlock += '<br /><span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
    }

    stateBlock += '</div>';
    return stateBlock;
}

function getStatusBlock(idx, device, block, c) {
    var value = block.value;
    var title = block.title;
    var elements = [];
    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['title']) !== 'undefined') title = blocks[idx]['title'];

    var tagRegEx = /<[\w\s="/.':;#-\/\?]+>/gi;
    if (matches = (title + value).match(tagRegEx)) {
        matches.map(function (val) {
            elements.push(val.replace(/([<,>])+/g, ''));
        });
    }

    for (d in elements) {
        deviceValue = device[elements[d]];
        if (block.hasOwnProperty('format') && block.format) {
            unit = '';
            if (isNaN(device[elements[d]])) {
                unit = ' ' + device[elements[d]].split(' ')[1];
            }
            deviceValue = number_format(deviceValue, block.decimals) + unit;
        }
        value = value.replace('<' + elements[d] + '>', deviceValue);
        title = title.replace('<' + elements[d] + '>', device[elements[d]]);
    }

    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['unit']) !== 'undefined') {
        var unitArray = blocks[idx]['unit'].split(";");
        value = value.replace(unitArray[0], unitArray[1]);
    }

    getBlockClick(idx, device);

    var attr = '';
    if (typeof(device['Direction']) !== 'undefined' && typeof(device['DirectionStr']) !== 'undefined') {
        attr += ' style="-webkit-transform: rotate(' + (device['Direction'] + 180) + 'deg);-moz-transform: rotate(' + (device['Direction'] + 180) + 'deg);-ms-transform: rotate(' + (device['Direction'] + 180) + 'deg);-o-transform: rotate(' + (device['Direction'] + 180) + 'deg); transform: rotate(' + (device['Direction'] + 180) + 'deg);"';
        if (settings['use_beaufort'] == 1) {
            value = Beaufort(device['Speed']) + ', ';
        } else {
            value = device['Speed'] + ' m/s, ';
        }
        value += device['Direction'] + '&deg ';
        if (settings['translate_windspeed'] == true) {
            value += TranslateDirection(device['DirectionStr'])
        } else {
            value += device['DirectionStr'];
        }
    }

    if (typeof(block.image) !== 'undefined') stateBlock = iconORimage(idx, '', block.image, 'icon', attr, 4, '');
    else stateBlock = iconORimage(idx, block.icon, '', 'icon', attr, 4, '');

    stateBlock += '<div class="col-xs-8 col-data">';
    if (titleAndValueSwitch(idx)) {
        stateBlock += '<strong class="title">' + title + '</strong><br />';
        stateBlock += '<span class="value">' + value + '</span>';
    } else {
        stateBlock += '<strong class="title">' + value + '</strong><br />';
        stateBlock += '<span class="value">' + title + '</span>';
    }

    if (showUpdateInformation(idx)) {
        stateBlock += '<br /><span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
    }
    stateBlock += '</div>';
    return stateBlock;
}

function getBlockClick(idx, device) {
    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['link']) !== 'undefined' && blocks[idx]['link'] !== "") {
        if ($('.block_' + idx).length > 0) {
            $('.block_' + idx).addClass('hover');

            if (typeof(blocks[idx]['target']) == 'undefined' || blocks[idx]['target'] == '_blank') {
                $('.block_' + idx).attr('onclick', 'window.open(\'' + blocks[idx]['link'] + '\');');
            }
            else if (typeof(blocks[idx]['target']) !== 'undefined' && blocks[idx]['target'] == 'iframe') {
                $('.block_' + idx).attr('onclick', 'addBlockClickFrame(\'' + idx + '\');');
            }
        }
    }
    else if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['graph']) !== 'undefined' && blocks[idx]['graph'] === false) {
        return;
    }
    else if (typeof(device) !== 'undefined') {
        if (device['SubType'] == 'Percentage' || device['SubType'] == 'Custom Sensor' || device['TypeImg'] == 'counter'
            || device['Type'] == 'Temp' || device['Type'] == 'Humidity' || device['Type'] == 'Wind' || device['Type'] == 'Rain'
            || device['Type'] == 'Temp + Humidity' || device['Type'] == 'Temp + Humidity + Baro'
            || device['SubType'] == 'kWh' || device['SubType'] === 'Lux' || device['SubType'] === 'Solar Radiation'
        ) {
            getButtonGraphs(device);
            if ($('.block_' + idx).length > 0) {
                $('.block_' + idx).addClass('hover');
                $('.block_' + idx).attr('data-toggle', 'modal');
                $('.block_' + idx).attr('data-target', '#opengraph' + device['idx']);
            } else if ($('.block_' + device['idx']).length > 0) {
                $('.block_' + device['idx']).addClass('hover');
                $('.block_' + device['idx']).attr('data-toggle', 'modal');
                $('.block_' + device['idx']).attr('data-target', '#opengraph' + device['idx']);
            }
        }
    }
}

function addBlockClickFrame(idx) {
    $('#button_' + idx).remove();
    var html = '<div class="modal fade" id="button_' + idx + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<iframe src="' + blocks[idx]['link'] + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
    $('#button_' + idx).modal('show');
}

/**
 * If defaultimage is given, default icon is ignored
 * @param idx
 * @param defaulticon
 * @param defaultimage
 * @param classnames
 * @param attr
 * @param colwidth
 * @param attrcol
 * @returns {string}
 */
function iconORimage(idx, defaulticon, defaultimage, classnames, attr, colwidth, attrcol) {
    if (typeof(colwidth) === 'undefined') colwidth = 4;
    if (typeof(attrcol) === 'undefined') attrcol = '';
    var icon = '<div class="col-xs-' + colwidth + ' col-icon" ' + attrcol + '>';
    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['icon']) !== 'undefined') {
        icon += '<em class="fa ' + blocks[idx]['icon'] + ' ' + classnames + '" ' + attr + '></em>';
    }
    else if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['image']) !== 'undefined') {
        icon += '<img src="img/' + blocks[idx]['image'] + '" class="' + classnames + '" ' + attr + ' />';
    }
    else if (defaultimage !== '') icon += '<img src="img/' + defaultimage + '" class="' + classnames + '" ' + attr + ' />';
    else if (defaulticon !== '') icon += '<em class="fa ' + defaulticon + ' ' + classnames + '" ' + attr + '></em>';

    icon += '</div>';
    return icon;
}

function getBlockData(device, idx, ontxt, offtxt) {
    this.title = device['Name'];

    this.opendiv = '<div class="col-xs-8 col-data">';
    this.closediv = '</div>';

    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['hide_data']) !== 'undefined' && blocks[idx]['hide_data'] == true) {
        return this.opendiv + '<strong class="title">' + this.title + '</strong>' + this.closediv;
    }

    this.value = ontxt;
    if (device['Status'] == 'Off' || device['Status'] == 'Closed' || device['Status'] == 'Normal' || device['Status'] == 'Locked' || (device['Status'] == '' && device['InternalState'] == 'Off')) {
        this.value = offtxt;
    }

    if (titleAndValueSwitch(idx)) {
        this.title = this.value;
        this.value = device['Name'];
    }

    this.data = '<strong class="title">' + this.title + '</strong><br />';
    this.data += '<span class="state">' + this.value + '</span>';

    if (showUpdateInformation(idx)) {
        this.data += '<br /><span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
    }

    return this.opendiv + this.data + this.closediv;
}

function titleAndValueSwitch(idx) {
    return typeof(blocks[idx]) !== 'undefined'
        && typeof(blocks[idx]['switch']) !== 'undefined'
        && blocks[idx]['switch'];
}

function showUpdateInformation(idx) {
    return (settings['last_update']
            && (typeof(blocks[idx]) === 'undefined'
                || typeof(blocks[idx]['last_update']) === 'undefined'
                || blocks[idx]['last_update']))
        || (!settings['last_update']
            && (typeof(blocks[idx]) !== 'undefined'
                && typeof(blocks[idx]['last_update']) !== 'undefined'
                && blocks[idx]['last_update'])
        );
}

function TranslateDirection(directionstr) {
    directionstr = 'direction_' + directionstr;
    return language['wind'][directionstr];
}

/**
 * Calculate windspeed in meters per second to Beaufort
 * @param windSpeed in m/s
 * @returns string Wind speed in Bft
 */
function Beaufort(windSpeed) {
    windSpeed = Math.abs(windSpeed);
    if (windSpeed <= 0.2) {
        return '0 Bft';
    }
    if (windSpeed <= 1.5) {
        return '1 Bft';
    }
    if (windSpeed <= 3.3) {
        return '2 Bft';
    }
    if (windSpeed <= 5.4) {
        return '3 Bft';
    }
    if (windSpeed <= 7.9) {
        return '4 Bft';
    }
    if (windSpeed <= 10.7) {
        return '5 Bft';
    }
    if (windSpeed <= 13.8) {
        return '6 Bft';
    }
    if (windSpeed <= 17.1) {
        return '7 Bft';
    }
    if (windSpeed <= 20.7) {
        return '8 Bft';
    }
    if (windSpeed <= 24.4) {
        return '9 Bft';
    }
    if (windSpeed <= 28.4) {
        return '10 Bft';
    }
    if (windSpeed <= 32.6) {
        return '11 Bft';
    }
    return '12 Bft';
}
