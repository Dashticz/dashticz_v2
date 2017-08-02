function loadWeather(location,country) {
	var html = '';
	if(typeof(settings['wu_api'])!=='undefined' && settings['wu_api']!=='' && settings['wu_api']!==0){
		$.getJSON('https://api.wunderground.com/api/'+settings['wu_api']+'/conditions/q/'+country+'/'+location+'.json',function(weather){

			$('.containsweather').each(function(){
				var curfull = $(this);
				if(typeof(weather.current_observation)=='undefined'){
					curfull.remove();
					currentweather=false;
					curfull.find(".weather").html('<p style="font-size:10px; width:100px;">Location ERROR</p>');
				}
				else {
					currentweather = weather.current_observation;
					var wiclass= getIcon(currentweather.icon);
					var temp = currentweather.temp_c;
					if(settings['use_fahrenheit']==1) temp = currentweather.temp_f;

					if(settings['static_weathericons']==1){
						html += '<h2><span>'+Math.round(temp)+_TEMP_SYMBOL+'</span> <i class="wi '+wiclass+'"></i></h2>';
						curfull.find(".weather").html('<i class="wi '+wiclass+'"></i>');
					}
					else{
						html += '<h2><span>'+Math.round(temp)+_TEMP_SYMBOL+'</span> '+getSkycon(currentweather.icon,'skyconsmall')+'</h2>';
						curfull.find(".weather").html(getSkycon(currentweather.icon,'skyconsmall'));
					}
					curfull.find(".weatherdegrees").html('<strong>'+Math.round(temp)+_TEMP_SYMBOL+'</strong><span class="rainrate"></span>');

					if(settings['wu_name']!=='' && settings['wu_name']!==0) curfull.find(".weatherloc").html(settings['wu_name']);
					else curfull.find(".weatherloc").html(location);

					/*
					var attr='';
					var wind='';
					if(typeof(currentweather.wind_dir)!=='undefined'){
						attr+=' style="-webkit-transform: rotate('+currentweather.wind_degrees+'deg);-moz-transform: rotate('+currentweather.wind_degrees+'deg);-ms-transform: rotate('+currentweather.wind_degrees+'deg);-o-transform: rotate('+currentweather.wind_degrees+'deg); transform: rotate('+currentweather.wind_degrees+'deg);"';
						//start alteration
						if (settings['use_beaufort'] ==1){
							wind = Beaufort(currentweather.wind_kph)+', '; 
						} else {
							wind = currentweather.wind_kph+' km/u, '; 
						}
						wind+=currentweather.wind_degrees+'&deg ';
						if (settings['translate_windspeed']==true){
							wind+=TranslateDirection(currentweather.wind_dir)
						} else {
							wind+=currentweather.wind_dir;
						}
						//end alteration
					}

					$('.block_currentweather_big_misc').remove();
					$('.block_currentweather_big').after('<div class="mh transbg block_currentweather_big_misc col-xs-3 hover"><div class="col-xs-4 col-icon"><em class="wi wi-humidity"></em></div><div class="col-xs-8 col-data"><strong class="title">'+currentweather.relative_humidity+'</strong><br><span>Luchtvochtigheid</span></div></div>');
					$('.block_currentweather_big').after('<div class="mh transbg block_currentweather_big_misc col-xs-3 hover"><div class="col-xs-4 col-icon"><em class="fa fa-eye"></em></div><div class="col-xs-8 col-data"><strong class="title">'+currentweather.visibility_km+'</strong><br><span>Zicht</span></div></div>');
					$('.block_currentweather_big').after('<div class="mh transbg block_currentweather_big_misc col-xs-3 hover"><div class="col-xs-4 col-icon"><em class="wi wi-wind-direction" style="'+attr+'"></em></div><div class="col-xs-8 col-data"><strong class="title">'+wind+'</strong><br><span>'+lang.wind+'</span></div></div>');
					$('.block_currentweather_big').after('<div class="mh transbg block_currentweather_big_misc col-xs-3 hover"><div class="col-xs-4 col-icon"><em class="wi wi-humidity"></em></div><div class="col-xs-8 col-data"><strong class="title">'+currentweather.relative_humidity+'</strong><br><span>Luchtvochtigheid</span></div></div>');
					*/
				}
			});

			setTimeout(function(){ 
				loadWeather(settings['wu_city'],settings['wu_country']);
			}, (60000*30));
		});
	}
}

function loadWeatherFull(location,country) {
	if(typeof(settings['wu_api'])!=='undefined' && settings['wu_api']!=='' && settings['wu_api']!==0){
		$('div.containsweatherfull').html('<div class="weatherfull"><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div><div class="col-xs-3 transbg"></div></div>');

		var html = '';
		$.getJSON('https://api.wunderground.com/api/'+settings['wu_api']+'/forecast10day/q/'+country+'/'+location+'.json',function(currentforecast){
			$('.containsweatherfull').each(function(){
				var curfull = $(this);
				if(typeof(currentforecast.forecast)=='undefined'){
					curfull.remove();
				}
				else {
					curfull.find(".weatherfull .col-xs-3").html('');

					var day;
					var start=0;
					if(parseFloat(moment().locale('nl').format('H'))>15){
						start=1;
					}
					for(var i=start;i<(start+4);i++) {
						curfor = currentforecast.forecast.simpleforecast.forecastday[i];
						day = curfor.date.weekday_short;

						switch(day) {
							case 'Mon': dayNL = language.weekdays.monday; break;
							case 'Tue': dayNL = language.weekdays.tuesday; break;
							case 'Wed': dayNL = language.weekdays.wednesday; break;
							case 'Thu': dayNL = language.weekdays.thursday; break;
							case 'Fri': dayNL = language.weekdays.friday; break;
							case 'Sat': dayNL = language.weekdays.saturday; break;
							case 'Sun': dayNL = language.weekdays.sunday; break;
						}

						var wiclass = getIcon(curfor.icon);
						var lowtemp = curfor.low.celsius
						var hightemp = curfor.high.celsius;
						if(settings['use_fahrenheit']==1){
							var lowtemp = curfor.low.fahrenheit
							var hightemp = curfor.high.fahrenheit;
						} 

						html = '<div class="day">'+dayNL.toLowerCase()+'<br />'+curfor.date.day+'/'+curfor.date.month+'</div>';
						if(settings['static_weathericons']==1) html += '<div class="icon"><i class="wi '+wiclass+'"></i></div>';
						else html += getSkycon(curfor.icon,'skycon');
						html += '<div class="temp"><span class="dayT">'+hightemp+_TEMP_SYMBOL+'</span><span class="nightT">'+lowtemp+_TEMP_SYMBOL+'</span></div>';

						curfull.find('.weatherfull').each(function(){
							if(parseFloat(moment().locale('nl').format('H'))>15) $(this).find('.col-xs-3:eq('+(i-1)+')').html(html);
							else $(this).find('.col-xs-3:eq('+i+')').html(html);
						});

					}
				}
			});

			setTimeout(function(){ 
				loadWeatherFull(settings['wu_city'],settings['wu_country'],$('.weatherfull'));
			}, (60000*30));
		});
	}
}

function getSkycon(code,classname){
	var random = getRandomInt(1,100000);
	
	var icon="PARTLY_CLOUDY_DAY";
	if(code=='chanceflurries') 	icon="WIND";
	if(code=='chancerain') 		icon="RAIN";
	if(code=='chancesleet') 	icon="SLEET";
	if(code=='chancesnow') 		icon="SNOW";
	if(code=='chancetstorms') 	icon="WIND";
	if(code=='clear') 			icon="CLEAR_DAY";
	if(code=='cloudy') 			icon="CLOUDY";
	if(code=='flurries') 		icon="WIND";
	if(code=='fog') 			icon="FOG";
	if(code=='hazy') 			icon="PARTLY_CLOUDY_DAY";
	if(code=='mostlycloudy') 	icon="CLOUDY";
	if(code=='mostlysunny') 	icon="CLEAR_DAY";
	if(code=='partlycloudy') 	icon="PARTLY_CLOUDY_DAY";
	if(code=='partlysunny') 	icon="PARTLY_CLOUDY_DAY";
	if(code=='sleet') 			icon="SLEET";
	if(code=='rain') 			icon="RAIN";
	if(code=='snow') 			icon="SNOW";
	if(code=='sunny') 			icon="CLEAR_DAY";
	if(code=='tstorms') 		icon="WIND";

	var skycon ='<script>';
	skycon+='var skycons = new Skycons({"color": "white"});';
  	skycon+='skycons.add("icon'+random+'", Skycons.'+icon+');';
	skycon+='skycons.play();';
	skycon+='</script>';
	skycon+='<canvas class="'+classname+'" data-icon="'+icon+'" id="icon'+random+'"></canvas>';
	return skycon;
}

function getIcon(code){
	var wiclass='wi-cloudy';
	
	if(code=='clear') 	wiclass="wi-day-sunny";
	if(code=='') 		wiclass="wi-day-cloudy";
	if(code=='') 		wiclass="wi-day-thunderstorm";
	if(code=='rain' || code=='chancerain') 	wiclass="wi-rain";
	if(code=='') 		wiclass="wi-rain-mix";
	if(code=='') 		wiclass="wi-showers";
	if(code=='cloudy' || code=='partlycloudy') 	wiclass="wi-cloudy";
	if(code=='') 		wiclass="wi-night-cloudy";
	if(code=='') 		wiclass="wi-night-clear";
	if(code=='') 		wiclass="wi-cloudy-gusts";
	if(code=='') 		wiclass="wi-tornado";
	if(code=='') 		wiclass="wi-storm-showers";
	if(code=='tstorms') wiclass="wi-thunderstorm";
	if(code=='snow') 	wiclass="wi-snow";
	if(code=='') 		wiclass="wi-hail";
	if(code=='') 		wiclass="wi-fog";
	return wiclass;
}
