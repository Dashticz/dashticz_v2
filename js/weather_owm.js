function loadWeather(location, country) {
    var html = '';
    if (typeof(settings['owm_api']) !== 'undefined' && settings['owm_api'] !== '' && settings['owm_api'] !== 0) {
		var site = 'http://api.openweathermap.org/data/2.5/weather?q=' + settings['owm_city'] + ',' + settings['owm_country'] + '&appid=' + settings['owm_api'];

        if (settings['use_fahrenheit'] === 1) {
            site += '&units=imperial';
        }
        else {
            site += '&units=metric';
        }

        $.getJSON(site, function (weather) {
            $('.containsweather').each(function () {
                var curfull = $(this);
                if (typeof(weather.main) === 'undefined') {
                    curfull.remove();
                    currentweather = false;
                    curfull.find('.weather').html('<p style="font-size:10px; width:100px;">Location ERROR</p>');
                } else {
                    currentweather = weather.weather[0];
                    var wiclass = getIcon(weather.weather[0].icon);
                    var temp = weather.main.temp;

                    weatherIcon = '<i class="wi ' + wiclass + '"></i>';
                    if (settings['static_weathericons'] === 0) {
                        weatherIcon = getSkycon(weather.weather[0].icon, 'skycon');
                    }
                    html += '<h2><span>' + Math.round(temp) + _TEMP_SYMBOL + '</span> ' + weatherIcon + '</h2>';
                    curfull.find('.weather').html(weatherIcon);
                    curfull.find('.weatherdegrees').html('<strong>' + Math.round(temp) + _TEMP_SYMBOL + '</strong><span class="rainrate"></span>');

                    if (settings['owm_name'] !== '' && settings['owm_name'] !== 0 && settings.hasOwnProperty('owm_name')) curfull.find('.weatherloc').html(settings['owm_name']);
                    else curfull.find('.weatherloc').html(location);
                }
            });
        });
    }
}

function loadWeatherFull(location, country) {
    if (typeof(settings['owm_api']) !== 'undefined' && settings['owm_api'] !== '' && settings['owm_api'] !== 0) {
        var containsweatherfull = '<div class="col-xs-3 transbg"></div>'.repeat(settings['owm_cnt']);
        $('div.containsweatherfull').html('<div class="weatherfull">' + containsweatherfull + '</div>');
		var site = 'http://api.openweathermap.org/data/2.5/forecast?q=' + settings['owm_city'] + ',' + settings['owm_country'] + '&appid=' + settings['owm_api'] + '&cnt=' + settings['owm_cnt'];

        if (settings['use_fahrenheit'] === 1) {
            site += '&units=imperial';
        }
        else {
            site += '&units=metric';
        }

		var html = '';
        $.getJSON(site, function (currentforecast) {
            $('.containsweatherfull').each(function () {
                var curfull = $(this);
                if (typeof(currentforecast.list) === 'undefined') {
                    curfull.remove();
                }
                else {
                    curfull.find(".weatherfull .col-xs-3").html('');
                    var start = 0;

                    for (var i = start; i < (start + settings['owm_cnt']); i++) {
                        curfor = currentforecast.list[i];
                        var date = moment.unix(curfor.dt).locale(settings['calendarlanguage']);
                        var wiclass = getIcon(curfor.weather[0].icon);
                        var temp = curfor.main.temp;

						var rain = 0;
						if(typeof(curfor.rain) !== 'undefined'){
							if(typeof(curfor.rain['3h']) !== 'undefined' ){
								rain = curfor.rain['3h'];
							}
						}
                        html = '<div class="day">' + date.format('HH')+':' +date.format('mm') + '<br />' + date.format(settings['weekday']) + '</div>';
                        if (settings['static_weathericons'] === 1) html += '<div class="icon"><i class="wi ' + wiclass + '"></i></div>';
                        else html += getSkycon(curfor.weather[0].icon, 'skycon');
                        html += '<div class="temp"><span class="av_temp">' + Math.round(temp) + _TEMP_SYMBOL + '</span><span class="rain">' + (Math.round(rain*100)/100) + " mm" + '</span></div>';

                        curfull.find('.weatherfull').each(function () {
                           $(this).find('.col-xs-3:eq(' + i + ')').html(html);
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
		'01d': 'CLEAR_DAY',
		'01n': 'CLEAR_NIGHT',
		'02d': 'PARTLY_CLOUDY_DAY',
		'02n': 'PARTLY_CLOUDY_NIGHT',
		'03d': 'CLOUDY',
		'03n': 'CLOUDY',
		'04d': 'CLOUDY',
		'04n': 'CLOUDY',
		'09d': 'RAIN',
		'09n': 'RAIN',
		'10d': 'RAIN',
		'10n': 'RAIN',
		'11d': 'WIND',
		'11n': 'WIND',
		'13d': 'SNOW',
		'13n': 'SNOW',
		'50d': 'FOG',
		'50n': 'FOG',
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
		'01d': 'wi-day-sunny',
		'01n': 'wi-night-clear',
		'02d': 'wi-day-cloudy',
		'02n': 'wi-night-cloudy',
		'03d': 'wi-cloud',
		'03n': 'wi-cloud',
		'04d': 'wi-cloudy',
		'04n': 'wi-cloudy',
		'09d': 'wi-showers',
		'09n': 'wi-showers',
		'10d': 'wi-day-rain',
		'10n': 'wi-night-rain',
		'11d': 'wi-day-thunderstorm',
		'11n': 'wi-night-thunderstorm',
		'13d': 'wi-snow',
		'13n': 'wi-snow',
		'50d': 'wi-day-fog',
		'50n': 'wi-night-fog',
    };
    if (icons.hasOwnProperty(code)) {
        wiclass = icons[code];
    }
    return wiclass;
}
