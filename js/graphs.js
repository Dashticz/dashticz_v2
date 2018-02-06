function getGraphs(device, popup) {
    var sensor = 'counter';
    var txtUnit = '?';
    var currentValue = device['Data'];
    var decimals = 2;

    switch (device['Type']) {
        case 'Rain':
            sensor = 'rain';
            txtUnit = 'mm';
            decimals = 1;
            break;
        case 'Lux':
            sensor = 'counter';
            txtUnit = 'Lux';
            decimals = 0;
            break;
        case 'Wind':
            sensor = 'wind';
            if (config['use_beaufort']) {
                currentValue = Beaufort(device['Speed']);
                decimals = 0;
                txtUnit = 'Bft';
            } else {
                currentValue = device['Speed'];
                decimals = 1;
                txtUnit = 'm/s';
            }
            break;
        case 'Temp':
        case 'Temp + Humidity':
        case 'Temp + Humidity + Baro':
            sensor = 'temp';
            txtUnit = '°C';
            currentValue = device['Temp'];
            decimals = 1;
            break;
        case 'Humidity':
            sensor = 'temp';
            txtUnit = '%';
            decimals = 1;
            break;
    }

    switch (device['SubType']) {
        case 'Percentage':
            sensor = 'Percentage';
            txtUnit = '%';
            decimals = 1;
            break;
        case 'Custom Sensor':
            sensor = 'Percentage';
            txtUnit = device['SensorUnit'];
            decimals = 1;
            break;
        case 'Gas':
            txtUnit = 'm3';
            break;
        case 'Energy':
        case 'kWh':
        case 'YouLess counter':
            txtUnit = 'kWh';
            currentValue = device['CounterToday'];
            break;
        case 'Visibility':
            txtUnit = 'km';
            break;
        case 'Radiation':
        case 'Solar Radiation':
            txtUnit = 'Watt/m2';
            decimals = 0;
            break;
        case 'Pressure':
            txtUnit = 'Bar';
            break;
        case 'Soil Moisture':
            txtUnit = 'cb';
            break;
        case 'Leaf Wetness':
            txtUnit = 'Range';
            break;
        case 'Voltage':
        case 'A/D':
            txtUnit = 'mV';
            break;
        case 'VoltageGeneral':
            txtUnit = 'V';
            break;
        case 'DistanceGeneral':
        case 'Distance':
            txtUnit = 'cm';
            break;
        case 'Sound Level':
            txtUnit = 'dB';
            break;
        case 'CurrentGeneral':
        case 'Current':
            txtUnit = 'A';
            break;
        case 'Weight':
            txtUnit = 'kg';
            break;
        case 'Waterflow':
            sensor = 'Percentage';
            txtUnit = 'l/min';
            break;
        case 'Counter Incremental':
            txtUnit = device['CounterToday'].split(' ')[1];
            currentValue = device['CounterToday'].split(' ')[0];
            break;
    }

    currentValue = number_format(currentValue, decimals);
    showGraph(device['idx'], device['Name'], txtUnit, 'initial', currentValue, false, sensor, popup);
}

function getGraphByIDX(idx) {
    getGraphs(alldevices[idx], true);
}

function getButtonGraphs(device) {
    if ($('#opengraph' + device['idx']).length === 0) {
        var html = '<div class="modal fade opengraph' + device['idx'] + '" data-idx="' + device['idx'] + '" id="opengraph' + device['idx'] + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body block_graphpopup_' + device['idx'] + '">' + language.misc.loading;
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);

        $('#opengraph' + device['idx']).on('shown.bs.modal', function () {
            getGraphByIDX($(this).data('idx'));
        });
    }
}

function showGraph(idx, title, label, range, current, forced, sensor, popup) {
    if (typeof(popup) === 'undefined') forced = false;
    if (typeof(forced) === 'undefined') forced = false;

    if (typeof(_GRAPHS_LOADED[idx]) === 'undefined' || _GRAPHS_LOADED[idx] < (time() - (parseFloat(_GRAPHREFRESH) * 60))) {
        forced = true;
    }

    if ($('.graphcurrent' + idx).length > 0) {
        $('.graphcurrent' + idx).html(current + ' ' + label);
    }

    if (forced || popup) {
        _GRAPHS_LOADED[idx] = time();
        //Check settings for standard graph
        if (range === 'initial') {
            switch (settings['standard_graph']) {
                case 'hours':
                    range = 'last';
                    break;
                case 'day':
                    range = 'day';
                    break;
                case 'month':
                    range = 'month';
                    break;
            }
        }
        realrange = range;
        if (range === 'last') realrange = 'day';

        $.ajax({
            url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=graph&sensor=' + sensor + '&idx=' + idx + '&range=' + realrange + '&time=' + new Date().getTime() + '&jsoncallback=?',
            type: 'GET', async: true, contentType: "application/json", dataType: 'jsonp',
            success: function (data) {
                if (data.status === 'ERR') {
                    alert('Could not load graph!');
                    return;
                }
                var buttons = createButtons(idx, title, label, range, current, sensor, popup);

                title = '<h4>' + title;
                if (typeof(current) !== 'undefined' && current !== 'undefined') title += ': <B class="graphcurrent' + idx + '">' + current + ' ' + label + '</B>';
                title += '</h4>';

                var html = '<div class="graph' + (popup ? 'popup' : '')  + '" id="graph' + idx + '">';
                html += '<div class="transbg col-xs-12">';
                html += title + '<br /><div style="margin-left:15px;">' + buttons + '</div><br /><div id="graphoutput' + idx + '"></div>';
                html += '</div>';
                html += '</div>';

                if ($('#graph' + idx + '.graph').length > 0) {
                    $('#graph' + idx + '.graph').replaceWith(html);
                }
                $('.block_graph' + (popup ? 'popup' : '') + '_' + idx).html(html);

                var graphProperties = getGraphProperties(data.result[0], label);
                graphProperties.dateFormat = settings['shorttime'];
                if (range === 'month' || range === 'year') {
                    graphProperties.dateFormat = settings['shortdate'];
                }

                if (range === 'last') {
                    var fourHoursAgo = moment().subtract(4, 'hours').format('YYYY-MM-DD HH:mm');
                    data.result = data.result.filter(function (element) {
                        return element.d > fourHoursAgo;
                    });
                }
                graphProperties.data = data.result.filter(function (element) {
                    return element.hasOwnProperty(graphProperties.keys[0]);
                });

                if ($('#graphoutput' + idx).length > 0) {
                    makeMorrisGraph(idx, graphProperties);
                }
            }
        });
    }
}

function makeMorrisGraph(idx, graphProperties) {
    Morris.Line({
        parseTime: false,
        element: 'graphoutput' + idx,
        data: graphProperties.data,
        fillOpacity: 0.2,
        gridTextColor: '#fff',
        lineWidth: 2,
        xkey: ['d'],
        ykeys: graphProperties.keys,
        labels: graphProperties.labels,
        xLabelFormat: function (x) { return moment(x.src.d, 'YYYY-MM-DD HH:mm').locale(settings['calendarlanguage']).format(graphProperties.dateFormat); },
        lineColors: settings['lineColors'],
        pointFillColors: ['none'],
        pointSize: 3,
        hideHover: 'auto',
        resize: true,
        hoverCallback: function (index, options, content, row) {
            var datePoint = moment(row.d, 'YYYY-MM-DD HH:mm').locale(settings['calendarlanguage']).format(graphProperties.dateFormat);
            var text = datePoint + ": ";
            graphProperties.keys.forEach(function (element, index) {
                text += (index > 0 ? ' / ' : '') + number_format(row[element], 2) + ' ' + graphProperties.labels[index];
            });
            return text;
        }
    });
}

function createButtons(idx, title, label, range, current, sensor, popup) {
    var buttons = '<div class="btn-group" role="group" aria-label="Basic example">';
    buttons += '<button type="button" class="btn btn-default ';
    if (range === 'last') buttons += 'active';
    buttons += '" onclick="showGraph(' + idx + ',\'' + title + '\',\'' + label + '\',\'last\',\'' + current + '\',true,\'' + sensor + '\',' + popup + ');">' + language.graph.last_hours + '</button> ';

    buttons += '<button type="button" class="btn btn-default ';
    if (range === 'day') buttons += 'active';
    buttons += '" onclick="showGraph(' + idx + ',\'' + title + '\',\'' + label + '\',\'day\',\'' + current + '\',true,\'' + sensor + '\',' + popup + ');">' + language.graph.today + '</button> ';

    buttons += '<button type="button" class="btn btn-default ';
    if (range === 'month') buttons += 'active';
    buttons += '" onclick="showGraph(' + idx + ',\'' + title + '\',\'' + label + '\',\'month\',\'' + current + '\',true,\'' + sensor + '\',' + popup + ');">' + language.graph.last_month + '</button>';
    buttons += '</div>';

    return buttons;
}

function getGraphProperties(result, label) {
    var graphProperties = {};
    if (result.hasOwnProperty('uvi')) {
        graphProperties = {
            keys: ['uvi'],
            labels: [label],
        };
    } else if (result.hasOwnProperty('lux')) {
        graphProperties = {
            keys: ['lux'],
            labels: ['Lux'],
        };
    } else if (result.hasOwnProperty('lux_avg')) {
        graphProperties = {
            keys: ['lux_avg', 'lux_min', 'lux_max'],
            labels: ['Lux average', 'Minimum', 'Maximum'],
        };
    } else if (result.hasOwnProperty('gu') && result.hasOwnProperty('sp')) {
        graphProperties = {
            keys: ['gu', 'sp'],
            labels: ['m/s', 'm/s'],
        };
    } else if (result.hasOwnProperty('ba') && result.hasOwnProperty('hu') && result.hasOwnProperty('te')) {
        graphProperties = {
            keys: ['ba', 'hu', 'te'],
            labels: ['hPa', '%', _TEMP_SYMBOL],
        };
    } else if (result.hasOwnProperty('hu') && result.hasOwnProperty('te')) {
        graphProperties = {
            keys: ['hu', 'te'],
            labels: ['%', _TEMP_SYMBOL],
        };
    } else if (result.hasOwnProperty('te')) {
        graphProperties = {
            keys: ['te'],
            labels: [_TEMP_SYMBOL],
        };
    } else if (result.hasOwnProperty('hu')) {
        graphProperties = {
            keys: ['hu'],
            labels: ['%'],
        };
    } else if (result.hasOwnProperty('mm')) {
        graphProperties = {
            keys: ['mm'],
            labels: ['mm'],
        };
    } else if (result.hasOwnProperty('v_max')) {
        graphProperties = {
            keys: ['v_max'],
            labels: [label],
        };
    } else if (result.hasOwnProperty('v2')) {
        graphProperties = {
            keys: ['v2', 'v'],
            labels: [label, label],
        };
        if (label === 'kWh' && realrange === 'day') {
            graphProperties.labels = ['Watt', 'Watt'];
        }
    } else if (result.hasOwnProperty('v')) {
        if (label === 'kWh' && realrange === 'day') {
            label = 'Wh';
        }
        if (data.method === 1) {
            graphProperties = {
                keys: ['eu'],
                labels: [label],
            };
        } else {
            graphProperties = {
                keys: ['v'],
                labels: [label],
            };
        }
    } else if (result.hasOwnProperty('eu')) {
        graphProperties = {
            keys: ['eu'],
            labels: [label],
        };
    } else if (result.hasOwnProperty('u')) {
        graphProperties = {
            keys: ['u'],
            labels: [label],
        };
    } else if (result.hasOwnProperty('u_max')) {
        graphProperties = {
            keys: ['u_max', 'u_min'],
            labels: ['?', '?'],
        };
    }
    return graphProperties;
}
