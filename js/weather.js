function loadWeather(location, country) {
    var html = '';
    if (typeof(settings['wu_api']) !== 'undefined' && settings['wu_api'] !== '' && settings['wu_api'] !== 0) {
        $.getJSON('https://cors-anywhere.herokuapp.com/https://api.wunderground.com/api/' + settings['wu_api'] + '/conditions/q/' + country + '/' + location + '.json', function (weather) {

            $('.containsweather').each(function () {
                var curfull = $(this);
                if (typeof(weather.current_observation) == 'undefined') {
                    curfull.remove();
                    currentweather = false;
                    curfull.find('.weather').html('<p style="font-size:10px; width:100px;">Location ERROR</p>');
                } else {
                    currentweather = weather.current_observation;
                    var wiclass = getIcon(currentweather.icon);
                    var temp = currentweather.temp_c;
                    if (settings['use_fahrenheit'] == 1) temp = currentweather.temp_f;

                    weatherIcon = '<i class="wi ' + wiclass + '"></i>';
                    if (settings['static_weathericons'] == 0) {
                        weatherIcon = getSkycon(currentweather.icon, 'skyconsmall');
                    }
                    html += '<h2><span>' + Math.round(temp) + _TEMP_SYMBOL + '</span> ' + weatherIcon + '</h2>';
                    curfull.find('.weather').html(weatherIcon);
                    curfull.find('.weatherdegrees').html('<strong>' + Math.round(temp) + _TEMP_SYMBOL + '</strong><span class="rainrate"></span>');

                    if (settings['wu_name'] !== '' && settings['wu_name'] !== 0 && settings.hasOwnProperty('wu_name')) curfull.find('.weatherloc').html(settings['wu_name']);
                    else curfull.find('.weatherloc').html(location);
                }
            });
        });
    }
}

function loadWeatherFull(location, country) {
    if (typeof(settings['wu_api']) !== 'undefined' && settings['wu_api'] !== '' && settings['wu_api'] !== 0) {
        $('div.containsweatherfull').html('<div class="weatherfull"><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div></div>');

        var html = '';
        $.getJSON('https://cors-anywhere.herokuapp.com/https://api.wunderground.com/api/' + settings['wu_api'] + '/forecast10day/q/' + country + '/' + location + '.json', function (currentforecast) {
            $('.containsweatherfull').each(function () {
                var curfull = $(this);
                if (typeof(currentforecast.forecast) == 'undefined') {
                    curfull.remove();
                }
                else {
                    curfull.find(".weatherfull .col-xs-3").html('');

                    var start = 0;
                    if (parseFloat(moment().locale('nl').format('H')) > 15) {
                        start = 1;
                    }
                    for (var i = start; i < (start + 4); i++) {
                        curfor = currentforecast.forecast.simpleforecast.forecastday[i];
                        var date = moment.unix(curfor.date.epoch).locale(settings['calendarlanguage']);

                        var wiclass = getIcon(curfor.icon);
                        var lowtemp = curfor.low.celsius
                        var hightemp = curfor.high.celsius;
                        if (settings['use_fahrenheit'] == 1) {
                            var lowtemp = curfor.low.fahrenheit
                            var hightemp = curfor.high.fahrenheit;
                        }

                        html = '<div class="day">' + date.format(settings['weekday']) + '<br />' + date.format(settings['shortdate']) + '</div>';
                        if (settings['static_weathericons'] == 1) html += '<div class="icon"><i class="wi ' + wiclass + '"></i></div>';
                        else html += getSkycon(curfor.icon, 'skycon');
                        html += '<div class="temp"><span class="dayT">' + hightemp + _TEMP_SYMBOL + '</span><span class="nightT">' + lowtemp + _TEMP_SYMBOL + '</span></div>';

                        curfull.find('.weatherfull').each(function () {
                            if (parseFloat(moment().locale('nl').format('H')) > 15) $(this).find('.col-xs-3:eq(' + (i - 1) + ')').html(html);
                            else $(this).find('.col-xs-3:eq(' + i + ')').html(html);
                        });

                    }
                }
            });
        });
    }
}

function getSkycon(code, classname) {
    var random = getRandomInt(1, 100000);

    var icon = 'PARTLY_CLOUDY_DAY';
    var icons = {
        chanceflurries: 'WIND',
        chancerain: 'RAIN',
        chancesleet: 'SLEET',
        chancesnow: 'SNOW',
        chancetstorms: 'WIND',
        clear: 'CLEAR_DAY',
        cloudy: 'CLOUDY',
        flurries: 'WIND',
        fog: 'FOG',
        hazy: 'PARTLY_CLOUDY_DAY',
        mostlycloudy: 'CLOUDY',
        mostlysunny: 'CLEAR_DAY',
        partlycloudy: 'PARTLY_CLOUDY_DAY',
        partlysunny: 'PARTLY_CLOUDY_DAY',
        sleet: 'SLEET',
        rain: 'RAIN',
        snow: 'SNOW',
        sunny: 'CLEAR_DAY',
        tstorms: 'WIND',
    };
    if (icons.hasOwnProperty(code)) {
        icon = icons[code];
    }

    var skycon = '<script>';
    skycon += 'var skycons = new Skycons({"color": "white"});';
    skycon += 'skycons.add("icon' + random + '", Skycons.' + icon + ');';
    skycon += 'skycons.play();';
    skycon += '</script>';
    skycon += '<canvas class="' + classname + '" data-icon="' + icon + '" id="icon' + random + '"></canvas>';
    return skycon;
}

function getIcon(code) {
    var wiclass = 'wi-cloudy';

    var icons = {
        clear: 'wi-day-sunny',
        rain: 'wi-rain',
        chancerain: 'wi-rain',
        cloudy: 'wi-cloudy',
        partlycloudy: 'wi-cloudy',
        tstorms: 'wi-thunderstorm',
        snow: 'wi-snow',

    };
    if (icons.hasOwnProperty(code)) {
        wiclass = icons[code];
    }

    // if(code=='') 		wiclass="wi-day-cloudy";
    // if(code=='') 		wiclass="wi-day-thunderstorm";
    // if(code=='') 		wiclass="wi-rain-mix";
    // if(code=='') 		wiclass="wi-showers";
    // if(code=='') 		wiclass="wi-night-cloudy";
    // if(code=='') 		wiclass="wi-night-clear";
    // if(code=='') 		wiclass="wi-cloudy-gusts";
    // if(code=='') 		wiclass="wi-tornado";
    // if(code=='') 		wiclass="wi-storm-showers";
    // if(code=='') 		wiclass="wi-hail";
    // if(code=='') 		wiclass="wi-fog";
    return wiclass;
}
