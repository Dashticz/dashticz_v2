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
		var cntSetting = settings['owm_cnt'];
		if (cntSetting > 40) cntSetting = 40;
		if (cntSetting > 5 && settings['owm_days'] == 1) cntSetting = 5;
        var ColXs = 'col-xs-2';
        var containsweatherfull = '' ;
        for (count = 0; count < cntSetting; count++) {
              containsweatherfull += '<div class="col-xs-2 transbg" style="width: ' + Math.round(1/cntSetting*100) + '%"></div>';
        }
        $('div.containsweatherfull').html('<div class="weatherfull">' + containsweatherfull + '</div>');
		var site = 'http://api.openweathermap.org/data/2.5/forecast?q=' + settings['owm_city'] + ',' + settings['owm_country'] + '&appid=' + settings['owm_api'] + '&lang=' + settings['owm_lang'];

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
                    curfull.find(".weatherfull ." + ColXs).html('');
                    var start = 0;

                    if(typeof(settings['owm_days']) == 'undefined' || settings['owm_days'] == '' || settings['owm_days'] == 0) { //torov5
						for (var i = start; i < (start + cntSetting); i++) {
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
							html += '<div class="temp"><span class="av_temp">' + Math.round(temp) + _TEMP_SYMBOL + '</span><br /><span class="rain">' + (Math.round(rain*100)/100) + " mm" + '</span></div>';

							curfull.find('.weatherfull').each(function () {
							   $(this).find('.'+ ColXs + ':eq(' + i + ')').html(html);
							});
						}
					}
					else {
						var fcNumber = currentforecast.cnt;
						var minTemp = [199,199,199,199,199];
						var tempTemp = 199;
						var x = -1;
						for (var i = 0; i < fcNumber; i++) {
							curfor = currentforecast.list[i];
							var date = moment.unix(curfor.dt).locale(settings['calendarlanguage']);
							var temp = curfor.main.temp;
							if (date.format('HH') == '00' || date.format('HH') == '01' || date.format('HH') == '02'){
								if (x> -1) minTemp[x] = tempTemp;
								tempTemp = 199;
							}
							if (temp < tempTemp) tempTemp = temp;
							if (date.format('HH') == '12' || date.format('HH') == '13' || date.format('HH') == '14') x++;
						}
						if (minTemp[4] == 199) minTemp[4] = tempTemp;
						
						var i = 0;
						while (start < fcNumber){
							curfor = currentforecast.list[start];
							var date = moment.unix(curfor.dt).locale(settings['calendarlanguage']);
							if (date.format('HH') == '12' || date.format('HH') == '13' || date.format('HH') == '14'){
								var wiclass = getIcon(curfor.weather[0].icon);
								var temp = curfor.main.temp;
								var Wdescription = curfor.weather[0].description;
								var rain = 0;
								if(typeof(curfor.rain) !== 'undefined'){
									if(typeof(curfor.rain['3h']) !== 'undefined' ){
										rain = curfor.rain['3h'];
									}
								}
								html = '<div class="day">' + date.format(settings['weekday']) + '</div>';
								if (settings['static_weathericons'] === 1) html += '<div class="icon"><i class="wi ' + wiclass + '"></i></div>';
								else html += getSkycon(curfor.weather[0].icon, 'skycon');
								html += '<div class="day owmdescription">' + Wdescription + '</div><div class="temp"><span class="av_temp">' + Math.round(temp) + _TEMP_SYMBOL + '</div>';
								if (settings['owm_min'] === 1) html += '<div class="temp"><span class="nightT">' + Math.round(minTemp[i]) + _TEMP_SYMBOL + '</div>';
								
								curfull.find('.weatherfull').each(function () {
									$(this).find('.'+ ColXs + ':eq(' + i + ')').html(html);
								});
								i++;
							}
							start++;
						}
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
