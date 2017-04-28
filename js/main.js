
if(typeof(_HOST_DOMOTICZ)=='undefined') var _HOST_DOMOTICZ='';
if(typeof(_LANGUAGE)=='undefined') var _LANGUAGE='nl_NL';
if(typeof(_USE_FAVORITES)=='undefined') var _USE_FAVORITES=false;
if(typeof(_USE_AUTO_POSITIONING)=='undefined') var _USE_AUTO_POSITIONING=false;
if(typeof(_HIDE_SECONDS_IN_CLOCK)=='undefined') var _HIDE_SECONDS_IN_CLOCK=false;
if(typeof(_HIDE_MEDIAPLAYER_WHEN_OFF)=='undefined') var _HIDE_MEDIAPLAYER_WHEN_OFF=false;
if(typeof(_USE_FAHRENHEIT)=='undefined') var _USE_FAHRENHEIT=false;
if(typeof(_BACKGROUND_IMAGE)=='undefined') var _BACKGROUND_IMAGE='bg2.jpg';
if(typeof(_NEWS_RSSFEED)=='undefined') var _NEWS_RSSFEED			= 'http://www.nu.nl/rss/algemeen';
if(typeof(_STANDBY_AFTER_MINUTES)=='undefined') var _STANDBY_AFTER_MINUTES = 10;
if(typeof(_WEATHER_CITYNAME)=='undefined') var _WEATHER_CITYNAME = '';
if(typeof(_SCROLL_NEWS_AFTER)=='undefined') var _SCROLL_NEWS_AFTER = 6500;
if(typeof(_STREAMPLAYER_TRACKS)=='undefined') var _STREAMPLAYER_TRACKS = {"track":1,"name":"Music FM","file":"http://stream.musicfm.hu:8000/musicfm.mp3"};
if(typeof(_USE_BEAUFORT)=='undefined') var _USE_BEAUFORT = false;
if(typeof(_TRANSLATE_SPEED)=='undefined') var _TRANSLATE_SPEED = false;
if(typeof(_SHOW_LASTUPDATE)=='undefined') var _SHOW_LASTUPDATE = false;
if(typeof(_LASTUPDATE_FORMAT)=='undefined') var _LASTUPDATE_FORMAT = 'DD-MM-YY HH:mm';
if(typeof(_DOMOTICZ_REFRESH)=='undefined') var _DOMOTICZ_REFRESH = 10;
if(typeof(_MAPS_LATITUDE)=='undefined') var _MAPS_LATITUDE = 51;
if(typeof(_MAPS_LONGITUDE)=='undefined') var _MAPS_LONGITUDE = 5;
if(typeof(_MAPS_ZOOMLEVEL)=='undefined') var _MAPS_ZOOMLEVEL = 13;
if(typeof(_SCREENSLIDER_EFFECT )=='undefined') var _SCREENSLIDER_EFFECT  = 'slide';
if(typeof(_ICALENDAR_URL )=='undefined') var _ICALENDAR_URL  = '';
if(typeof(_ICALENDAR_DATEFORMAT )=='undefined') var _ICALENDAR_DATEFORMAT  = 'DD.MM.YYYY HH:mm';
if(typeof(_ICALENDAR_LOCALE )=='undefined') var _ICALENDAR_LOCALE  = 'en';

var _TEMP_SYMBOL = '°C';
if(_USE_FAHRENHEIT) _TEMP_SYMBOL = '°F';

$.ajax({url: 'vendor/jquery/jquery-ui.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/jquery/touchpunch.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/bootstrap/js/bootstrap.min.js', async: false,dataType: "script"});
$.ajax({url: 'js/functions.js', async: false,dataType: "script"});
		
$.ajax({url: 'custom/CONFIG.js', async: false,dataType: "script"});
$.ajax({url: 'lang/'+_LANGUAGE+'.js', async: false,dataType: "script"});

$.ajax({url: 'vendor/raphael/raphael-min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/morrisjs/morris.min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/moment.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/moment-with-locales.js', async: false,dataType: "script"});
//$.ajax({url: 'vendor/nzbget/nzbget.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/ical-parser/ical_parser.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/jquery.newsTicker.min.js', async: false,dataType: "script"});
$.ajax({url: 'js/sortable.js', async: false,dataType: "script"});
$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
if(typeof(_DEBUG)!=='undefined' && _DEBUG){
	$.ajax({url: 'custom/json_vb.js', async: false,dataType: "script"});
	$.ajax({url: 'custom/graph_vb.js', async: false,dataType: "script"});
}
$.ajax({url: 'custom/custom.js', async: false,dataType: "script"});
$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});

var standby=true;
var standbyActive=false;
var standbyTime=0;

var swipebackTime=0;

var req;
var slide;
var sliding = false;
var defaultcolumns=false;
var allblocks={}
var alldevices={}
var myswiper;
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


if(typeof(columns)=='undefined') defaultcolumns = true;
var _GRAPHS_LOADED = new Object();
_GRAPHREFRESH = 5;

if(typeof(blocks)=='undefined') var blocks = {}
if(typeof(columns_standby)=='undefined') var columns_standby = {}

if(typeof(screens)=='undefined'){
	var screens = {}
	screens[1] = {}
	screens[1]['background'] = _BACKGROUND_IMAGE;
	screens[1]['columns'] = []
	if(defaultcolumns===false){
		for(c in columns){
			screens[1]['columns'].push(c);
		}
	}
}
if(objectlength(screens)>1){
	$.ajax({url: 'vendor/swiper/js/swiper.min.js', async: false,dataType: "script"});
}

$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});
$(document).ready(function(){	
	$('body').attr('unselectable','on')
     .css({'-moz-user-select':'-moz-none',
           '-moz-user-select':'none',
           '-o-user-select':'none',
           '-khtml-user-select':'none',
           '-webkit-user-select':'none',
           '-ms-user-select':'none',
           'user-select':'none'
     }).bind('selectstart', function(){ return false; });
	
	buildScreens();
	
	if(typeof(_APIKEY_MAPS)!=='undefined' && _APIKEY_MAPS!=="") $.ajax({url: 'https://maps.googleapis.com/maps/api/js?key='+_APIKEY_MAPS+'&callback=initMap', async: true,dataType: "script"});
	
	setTimeout(function(){
		if(objectlength(screens)>1 && (typeof(_EDIT_MODE)=='undefined' || _EDIT_MODE===false)){
			myswiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				effect: _SCREENSLIDER_EFFECT,
				keyboardControl:true
			});
		}
	},2000);
	setTimeout(function(){
		setInterval(function(){ 
			if(_HIDE_SECONDS_IN_CLOCK==true) $('.clock').html(moment().locale(_LANGUAGE.substr(0,2)).format('HH:mm'));
			else $('.clock').html(moment().locale(_LANGUAGE.substr(0,2)).format('HH:mm:ss'));
			$('.date').html(moment().locale(_LANGUAGE.substr(0,2)).format('D MMMM YYYY'));
			$('.weekday').html(moment().locale(_LANGUAGE.substr(0,2)).format('dddd'));
		},1000);
		
		getDevices(); 		
	},750);
	
	setClassByTime();
	setInterval(function(){ 
		setClassByTime();
	},(60000));
	
}); 

function toSlide(num){
	myswiper.slideTo( num,1000,false );
	
}
function buildStandby(){
	
	if($('.screenstandby').length==0){
		var screenhtml = '<div class="screen screenstandby swiper-slide slidestandby" style="height:'+$(window).height()+'px"><div class="row"></div></div>';
		$('div.screen').hide();
		$('div.swiper-container').before(screenhtml);	

		for(c in columns_standby){
			$('div.screenstandby .row').append('<div class="col-xs-'+columns_standby[c]['width']+' colstandby'+c+'"></div>');
			for(b in columns_standby[c]['blocks']){
				$('.block_'+columns_standby[c]['blocks'][b]).first().clone().appendTo('.colstandby'+c);
			}
		}
	}
}
function buildScreens(){
	var num=1;

	for(s in screens){
		var screenhtml = '<div class="screen screen'+s+' swiper-slide slide'+s+'"';
		if(typeof(screens[s]['background'])!=='undefined') screenhtml+='style="background-image:url(\'img/'+screens[s]['background']+'\');"';
		screenhtml+='><div class="row"></div></div>';
		$('div.contents').append(screenhtml);			
		
		if(defaultcolumns===false){
			for(cs in screens[s]['columns']){
				c = screens[s]['columns'][cs];
				if(typeof(columns[c])!=='undefined'){
					$('div.screen'+s+' .row').append('<div class="col-xs-'+columns[c]['width']+' sortable col'+c+'"></div>');
					for(b in columns[c]['blocks']){
						
						var width=12;
						if(typeof(blocks[columns[c]['blocks'][b]])!=='undefined' && typeof(blocks[columns[c]['blocks'][b]]['width'])!=='undefined') width = blocks[columns[c]['blocks'][b]]['width'];

						var blocktype='';
						if(typeof(blocks[columns[c]['blocks'][b]])!=='undefined' && typeof(blocks[columns[c]['blocks'][b]]['type'])!=='undefined') blocktype = blocks[columns[c]['blocks'][b]]['type'];

						if(blocktype=='blocktitle'){
							$('div.screen'+s+' .row .col'+c).append('<div class="col-xs-12 mh titlegroups transbg"><h3>'+blocks[columns[c]['blocks'][b]]['title']+'</h3></div>');
						}
						else if(columns[c]['blocks'][b]=='weather'){
							if(typeof(loadWeatherFull)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
							$('div.screen'+s+' .row .col'+c).append('<div data-id="weather" class="block_'+columns[c]['blocks'][b]+' containsweatherfull"></div>');
							if(_APIKEY_WUNDERGROUND!=="" && _WEATHER_CITY!=="") loadWeatherFull(_WEATHER_CITY,_WEATHER_COUNTRY,$('.weatherfull'));
						}
						else if(columns[c]['blocks'][b]=='currentweather' || columns[c]['blocks'][b]=='currentweather_big'){
							if(typeof(loadWeather)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
							var cl = '';
							if(columns[c]['blocks'][b]=='currentweather_big') $('div.screen'+s+' .row .col'+c).append('<div class="mh transbg big block_'+columns[c]['blocks'][b]+' col-xs-'+width+' containsweather"><div class="col-xs-1"><div class="weather" id="weather"></div></div><div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div></div>');
							else $('div.screen'+s+' .row .col'+c).append('<div data-id="currentweather" class="mh transbg block_'+columns[c]['blocks'][b]+' col-xs-'+width+' containsweather"><div class="col-xs-4"><div class="weather" id="weather"></div></div><div class="col-xs-8"><strong class="title weatherdegrees" id="weatherdegrees"></strong><br /><span class="weatherloc" id="weatherloc"></span></div></div>');
							if(_APIKEY_WUNDERGROUND!=="" && _WEATHER_CITY!=="") loadWeather(_WEATHER_CITY,_WEATHER_COUNTRY);
						}
						else if(columns[c]['blocks'][b]=='train'){
							if(typeof(getTrainInfo)!=='function') $.ajax({url: 'js/ns.js', async: false,dataType: "script"});
							$('div.screen'+s+' .row .col'+c).append('<div data-id="train" class="train"></div>');
							getTrainInfo();
						}
						else if(columns[c]['blocks'][b]=='traffic'){
							if(typeof(getTraffic)!=='function') $.ajax({url: 'js/traffic.js', async: false,dataType: "script"});
							$('div.screen'+s+' .row .col'+c).append('<div data-id="traffic" class="traffic"></div>');
							getTraffic();
						}
						else if(columns[c]['blocks'][b]=='trafficmap'){
							$('div.screen'+s+' .row .col'+c).append('<div data-id="trafficmap" class="mh transbg block_trafficmap col-xs-12"><div id="trafficm" class="trafficmap"></div></div>');
						}
						else if(typeof(columns[c]['blocks'][b])=='object' && typeof(columns[c]['blocks'][b]['latitude'])!=='undefined'){
							var random = getRandomInt(1,100000);
							$('div.screen'+s+' .row .col'+c).append(loadMaps(random,columns[c]['blocks'][b]));
						}
						else if(columns[c]['blocks'][b]=='news'){
							if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
							$('div.screen'+s+' .row .col'+c).append('<div data-id="news" class="news"></div>');
							getNews('news',_NEWS_RSSFEED);
						}
						else if(typeof(columns[c]['blocks'][b])=='string' && columns[c]['blocks'][b].substring(0,5)=='news_'){
							if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
							$('div.screen'+s+' .row .col'+c).append('<div class="'+columns[c]['blocks'][b]+'"></div>');
							getNews(columns[c]['blocks'][b],blocks[columns[c]['blocks'][b]]['feed']);
						}
						else if(columns[c]['blocks'][b]=='clock'){
							$('div.screen'+s+' .row .col'+c).append('<div data-id="clock" class="transbg block_'+columns[c]['blocks'][b]+' col-xs-'+width+' text-center"><h1 class="clock"></h1><h4 class="weekday"></h4><h4 class="date"></h4></div>');
						}
						else if(columns[c]['blocks'][b]=='sunrise'){
							$('div.screen'+s+' .row .col'+c).append('<div data-id="sunrise" class="block_'+columns[c]['blocks'][b]+' col-xs-'+width+' transbg text-center sunriseholder"><em class="wi wi-sunrise"></em><span class="sunrise"></span><em class="wi wi-sunset"></em><span class="sunset"></span></div>');
						}
						else if(typeof(columns[c]['blocks'][b])=='object' && typeof(columns[c]['blocks'][b]['isimage'])!=='undefined'){
							var random = getRandomInt(1,100000);
							$('div.screen'+s+' .row .col'+c).append(loadImage(random,columns[c]['blocks'][b]));
						}
						else if(columns[c]['blocks'][b]=='horizon'){
							var html ='<div data-id="horizon" class="containshorizon">';
									html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x07\')">';
										html+='<em class="fa fa-chevron-left fa-small"></em>';
									html+='</div>';
									html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E4x00\')">';
										html+='<em class="fa fa-pause fa-small"></em>';
									html+='</div>';
									html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x06\')">';
										html+='<em class="fa fa-chevron-right fa-small"></em>';
									html+='</div>';
								html+='</div>';
							$('div.screen'+s+' .row .col'+c).append(html);
						}
						else if(columns[c]['blocks'][b]=='icalendar'){
							var random = getRandomInt(1,100000);
							var html ='<div class="transbg containsicalendar containsicalendar'+random+'">';
									html+='<div class="col-xs-12 transbg"></div>';
								html+='</div>';
							$('div.screen'+s+' .row .col'+c).append(html);	
							$('.containsicalendar'+random).css('text-transform','capitalize');			
						}
						else if(columns[c]['blocks'][b]=='streamplayer'){
							var random = getRandomInt(1,100000);
							var html ='<div data-id="streamplayer" class="transbg containsstreamplayer'+random+'">';
									html+='<div class="col-xs-12 transbg smalltitle"><h3></h3></div>';
									html+='<audio class="audio1" preload="none"></audio>';
									html+='<div class="col-xs-4 transbg hover text-center btnPrev">';
										html+='<em class="fa fa-chevron-left fa-small"></em>';
									html+='</div>';
									html+='<div class="col-xs-4 transbg hover text-center playStream">';
										html+='<em class="fa fa-play fa-small stateicon"></em>';
									html+='</div>';
									html+='<div class="col-xs-4 transbg hover text-center btnNext">';
										html+='<em class="fa fa-chevron-right fa-small"></em>';
									html+='</div>';
								html+='</div>';
							$('div.screen'+s+' .row .col'+c).append(html);
							
							addStreamPlayer('.containsstreamplayer'+random);					
						}
						else if(typeof(columns[c]['blocks'][b])=='object'){
							var random = getRandomInt(1,100000);
							if(typeof(columns[c]['blocks'][b]['frameurl'])!=='undefined') $('div.screen'+s+' .row .col'+c).append(loadFrame(random,columns[c]['blocks'][b]));
							else $('div.screen'+s+' .row .col'+c).append(loadButton(b,columns[c]['blocks'][b]));
						}
						else {
							$('div.screen'+s+' .row .col'+c).append('<div class="mh transbg block_'+columns[c]['blocks'][b]+'"></div>');
						}
					}
				}
			}
		}
		else {
			$('body .row').append('<div class="col-xs-5 sortable col1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
			$('body .row').append('<div class="col-xs-5 sortable"><div class="block_weather containsweatherfull"></div><div class="auto_media"></div><div class="auto_states"></div></div>');
			$('body .row').append('<div class="col-xs-2 sortable"><div class="auto_clock"></div><div class="auto_sunrise"></div><div class="auto_buttons"></div></div>');

			$('.col2').prepend('<div class="mh transbg big block_currentweather_big col-xs-12 containsweather"><div class="col-xs-1"><div class="weather" id="weather"></div></div><div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div></div>');
			if(typeof(_APIKEY_WUNDERGROUND)!=='undefined' && _APIKEY_WUNDERGROUND!=="" && typeof(_WEATHER_CITY)!=='undefined' && _WEATHER_CITY!==""){
				if(typeof(loadWeatherFull)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
							loadWeatherFull(_WEATHER_CITY,_WEATHER_COUNTRY,$('#weatherfull'));
				loadWeather(_WEATHER_CITY,_WEATHER_COUNTRY);
			}

			$('.col3 .auto_clock').html('<div class="transbg block_clock col-xs-12 text-center"><h1 id="clock" class="clock"></h1><h4 id="weekday" class="weekday"></h4><h4 id="date" class="date"></h4></div>');
			$('.col3 .auto_sunrise').html('<div class="block_sunrise col-xs-12 transbg text-center sunriseholder"><em class="wi wi-sunrise"></em><span id="sunrise" class="sunrise"></span><em class="wi wi-sunset"></em><span id="sunset" class="sunset"></span></div>');
			if(typeof(buttons)!=='undefined'){
				for(b in buttons){
					if(buttons[b].isimage) $('.col3 .auto_buttons').append(loadImage(b,buttons[b]));
					else $('.col3 .auto_buttons').append(loadButton(b,buttons[b]));
				}
			}
		}
		num++;
	}
	if(typeof(_EDIT_MODE)!=='undefined' && _EDIT_MODE==true){
		setTimeout(function(){ 
			startSortable(); 
		},2000);
	}
	
	if($('.containsicalendar').length>0){
		addCalendar();
		setInterval(function(){
			addCalendar();
		},(60000*1));
	}
}

function initMap() {
      showMap('trafficm');
}
function showMap(mapid,map) {
	if(typeof(_APIKEY_MAPS)=='undefined' || _APIKEY_MAPS=="") alert('Please, set var _APIKEY_MAPS!');

	if(typeof(map)!=='undefined'){
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: map.zoom,
			  center: {lat: map.latitude, lng: map.longitude}
			});
	}
	else {
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: _MAPS_ZOOMLEVEL,
			  center: {lat: _MAPS_LATITUDE, lng: _MAPS_LONGITUDE}
			});
	}

	var transitLayer = new google.maps.TrafficLayer();
    transitLayer.setMap(map);
}

function setClassByTime(){
	//if($('input[name="slider"]:checked').length>0){
		
		var d = new Date();
		var n = d.getHours();

		if (n >= 20 || n <=5){
			newClass = 'night';
		}
		else if (n >= 6 && n <= 10) {
			newClass = 'morning';
		}
		else if (n >= 11 && n <= 15) {
			newClass = 'noon';
		}
		else if (n >= 16 && n <=19) {
			newClass = 'afternoon';
		}
		
		for(s in screens){
			if(typeof(screens[s]['background_'+newClass])!=='undefined'){
				$('.screen.screen'+s).css('background-image','url(\'img/'+screens[s]['background_'+newClass]+'\')');
			}
		}
		
		$('body').removeClass('morning noon afternoon night').addClass(newClass);
	//}
}

if(typeof(_AUTO_SWIPEBACK_TO)!=='undefined' && typeof(_AUTO_SWIPEBACK_TIME)!=='undefined'){
	if(parseFloat(_AUTO_SWIPEBACK_TIME)>0){
	   setInterval(function(){
		  swipebackTime+=1000;
		
		 if(swipebackTime>=(_AUTO_SWIPEBACK_TIME*1000)){
			toSlide(_AUTO_SWIPEBACK_TO);
			swipebackTime=0;
		 }
	   },1000);
		
	}
}

//STANDBY FUNCTION
setInterval(function(){
  standbyTime+=1000;
},1000);


if(!isMobile){
	$('body').bind('mousemove', function(e){
		standbyTime=0;
		swipebackTime=0;
		disableStandby();
	});
}

$('body').bind('touchend click', function(e){
	
	setTimeout(function(){ 
		standbyTime=0;
		swipebackTime=0;
		disableStandby(); 
	},100);
});

if(parseFloat(_STANDBY_AFTER_MINUTES)>0){
   setInterval(function(){
      if(standbyActive!=true){
         if(standbyTime>=((_STANDBY_AFTER_MINUTES*1000)*60)){
            $('body').addClass('standby');
			$('.swiper-container').hide();
			if(objectlength(columns_standby)>0) buildStandby();
            if(typeof(_STANDBY_CALL_URL)!=='undefined' && _STANDBY_CALL_URL!==''){
               $.get(_STANDBY_CALL_URL);
               standbyActive=true;
            }
         }
      }
   },5000);

   function disableStandby(){
     
	 if(standbyActive==true){
         standbyTime=0;
         if(typeof(_END_STANDBY_CALL_URL)!=='undefined' && _END_STANDBY_CALL_URL!==''){
               $.get(_END_STANDBY_CALL_URL);
         }
      }
	  
	  if(objectlength(columns_standby)>0){
		$('div.screen').show();
	  	$('.screenstandby').remove();
	  }
      $('body').removeClass('standby');
	  $('.swiper-container').show();
      standbyActive=false;
	 
   }
}
//END OF STANDBY FUNCTION

function loadMaps(b,map){
	var random = getRandomInt(1,100000);
	
	if(typeof(map.link)!=='undefined'){
		var html = '<div class="modal fade" id="trafficmap_frame_'+b+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			  html+='</div>';
			  html+='<div class="modal-body">';
				  html+='<iframe data-src="'+map.link+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}
	
	var width = 12;
	if(typeof(map.width)!=='undefined') width=map.width;
	if(typeof(map.link)!=='undefined') var html='<div class="col-xs-'+width+' mh hover swiper-no-swiping transbg block_trafficmap" data-toggle="modal" data-target="#trafficmap_frame_'+b+'" onclick="setSrc(this);" ';
	else var html='<div class="col-xs-'+width+' mh swiper-no-swiping transbg block_trafficmap" ';
	if(typeof(map.height)!=='undefined') html+=' style="height:'+map.height+'px !important;"';
	html+='>';
	html+='<div id="trafficmap_'+b+'" class="trafficmap"></div>';
	html+='</div>';
	setTimeout(function(){showMap('trafficmap_'+b,map);},1000)
	return html;
}

function loadButton(b,button){
	var random = getRandomInt(1,100000);
	if($('#button_'+b).length==0){
		var html = '<div class="modal fade" id="button_'+b+'_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			  html+='</div>';
			  html+='<div class="modal-body">';
				  html+='<iframe data-src="'+button.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}
	
	var width = 12;
	if(typeof(button.width)!=='undefined') width=button.width;
	var html='<div class="col-xs-'+width+' hover transbg" data-toggle="modal" data-target="#button_'+b+'_'+random+'" onclick="setSrc(this);">';
		html+='<div class="col-xs-4 col-icon">';
			if(typeof(button.image)!=='undefined') html+='<img class="buttonimg" src="'+button.image+'" />';
			else html+='<em class="fa '+button.icon+' fa-small"></em>';
		html+='</div>';
		html+='<div class="col-xs-8 col-data">';
			html+='<strong class="title">'+button.title+'</strong><br>';
			html+='<span class="state"></span>';
		html+='</div>';
	html+='</div>';
	return html;
}

function loadFrame(f,frame){
	
	var width = 12;
	if(typeof(frame.width)!=='undefined') width=frame.width;
	var html='<div class="col-xs-'+width+' hover transbg swiper-no-swiping imgblock imgblock'+f+'" style="height:'+frame.height+'px;padding:0px !important;">';
		html+='<div class="col-xs-12 col-data" style="padding:0px !important;">';
			html+='<iframe src="'+frame.frameurl+'" style="width:100%;border:0px;height:'+(frame.height-14)+'px;"></iframe>';
		html+='</div>';
	html+='</div>';
	
	var refreshtime = 60000;
	if(typeof(frame.refreshiframe)!=='undefined') refreshtime = frame.refreshiframe;
	setInterval(function(){ 
		reloadFrame(f,frame);
	},refreshtime);
	
	return html;
}

function reloadFrame(i,frame){
	var sep='?';
	
	if(typeof(frame.frameurl)!=='undefined'){
		var img = frame.frameurl;
		if (img.indexOf("?") != -1) var sep='&';

		if (img.indexOf("?") != -1){
			var newimg = img.split(sep+'t=');
			img = newimg;
		}
		img+=sep+'t='+(new Date()).getTime();
	}
	
	$('.imgblock'+i).find('iframe').attr('src',img);
}

function loadImage(i,image){

	if(typeof(image.image)!=='undefined'){
		var img = image.image;
	}
	
	if($('.imgblockopens'+i).length==0 && typeof(image.url)!=='undefined'){
		var html = '<div class="modal fade imgblockopens'+i+'" id="'+i+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			  html+='</div>';
			  html+='<div class="modal-body">';
				  html+='<iframe data-src="'+image.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}

	var width = 12;
	if(typeof(image.width)!=='undefined') width=image.width;
	var html='';
	
	if(typeof(image.url)!=='undefined') html+='<div class="col-xs-'+width+' hover transbg imgblock imgblock'+i+'" data-toggle="modal" data-target="#'+i+'" onclick="setSrc(this);">';
	else html+='<div class="col-xs-'+width+' transbg imgblock imgblock'+i+'">';
	html+='<div class="col-xs-12">';

	if (img=='moon'){
		html+='<div class="moon">';
		img=getMoonInfo(image);
		html+='</div>';

	} else {
		html+='<img src="'+img+'" style="max-width:100%;" />';
	}
	html+='</div>';
	html+='</div>';
	
	var refreshtime = 60000;
	if(typeof(image.refresh)!=='undefined') refreshtime = image.refresh;
	if(typeof(image.refreshimage)!=='undefined') refreshtime = image.refreshimage;
	setInterval(function(){ 
		reloadImage(i,image,true);
	},refreshtime);
	
	var refreshtime = 60000;
	if(typeof(image.refreshiframe)!=='undefined') refreshtime = image.refreshiframe;
	setInterval(function(){ 
		reloadIframe(i,image,true);
	},refreshtime);
	
	return html;
}

function reloadImage(i,image){
	var sep='?';
	
	if(typeof(image.image)!=='undefined'){
		var img = image.image;
		if (img.indexOf("?") != -1) var sep='&';

		if (img.indexOf("?") != -1){
			var newimg = img.split(sep+'t=');
			img = newimg;
		}
		img+=sep+'t='+(new Date()).getTime();
	}
	
	$('.imgblock'+i).find('img').attr('src',img);
}

function reloadIframe(i,image){
	var sep='?';
	
	if(typeof(image.url)!=='undefined'){
		var url = image.url;
		if (url.indexOf("?") != -1) var sep='&';

		if (url.indexOf("?") != -1){
			var newurl = url.split(sep+'t=');
			url = newurl;
		}
		url+=sep+'t='+(new Date()).getTime();
	}
	
	if(typeof($('.imgblockopens'+i+' iframe').attr('src')!=='undefined')){
	   
		$('.imgblockopens'+i+' iframe').attr('src',url);
	}
}

function getMoonInfo(image){
   req = $.getJSONP({
      url: _HOST_DOMOTICZ+"/json.htm?type=command&param=getuservariable&idx="+_IDXmoonpicture+"&jsoncallback=?",
      type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
      format: "json",
      success: function(data) {
         for(r in data.result){
            var src = '';
            var device = data.result[r];
            var value = device['Value'];
            src='img/moon/'+value;
            image.image='img/moon/'+value;
            $("div.moon").replaceWith('<div class="moon"><img src="'+src+'" style="width:100%;" /></div>');            
         }
           }   
   });
}

function addCalendar(){
	$('.containsicalendar').each(function(){
		var calobject = $(this);
		var icsUrl = _ICALENDAR_URL;

		//replace webcal protocol with https
		if (icsUrl.split('://')[0] == 'webcal') {
			icsUrl = icsUrl.replace(/^webcal?\:\/\//i, "https://");
		}
		icsUrl = 'https://crossorigin.me/'+icsUrl;

		new ical_parser(icsUrl, function(cal) {
			var events = cal.getFutureEvents();
			var counter = 0;
			calobject.find('.transbg').html('');
			counter=0;
			events.forEach(function(event) {
				if (counter < 5) {
					var date = event.start_date;
					var time = event.start_time;
						if(_ICALENDAR_DATEFORMAT == 'friendly') {
							var widget = '<li style="list-style:none;">' + moment(date+' '+time,'DD/MM/YYYY HH:mm').locale(_ICALENDAR_LOCALE).calendar() + ' - <b>' + event.SUMMARY + '</b></li>';	
						} else { 
							var widget = '<li style="list-style:none;">' + moment(date+' '+time,'DD/MM/YYYY HH:mm').format(_ICALENDAR_DATEFORMAT) + ' - <b>' + event.SUMMARY + '</b></li>';		
						}
						calobject.find('.transbg').append(widget);
				}
				counter++;
			});
		});
	});
}

function addStreamPlayer(streamelement){
	var supportsAudio = !!document.createElement('audio').canPlayType;
	if(supportsAudio) {
	  var index = 0,
	  playing = false;
	  tracks = _STREAMPLAYER_TRACKS,
	  trackCount = tracks.length,
	  npTitle = $(streamelement+' h3'),
	  audio = $(streamelement+' .audio1').bind('play', function() {
		$(streamelement+' .stateicon').removeClass('fa fa-play');
		$(streamelement+' .stateicon').addClass('fa fa-pause');
		playing = true;
	  }).bind('pause', function() {

		$(streamelement+' .stateicon').removeClass('fa fa-pause');
		$(streamelement+' .stateicon').addClass('fa fa-play');
		playing = false;
	  }).get(0),
	  btnPrev = $(streamelement+' .btnPrev').click(function() {
		if((index - 1) > -1) {
		  index--;
		  loadTrack(index);
		} else {
		  index = 0
		  loadTrack(trackCount-1);
		}
		if(playing) {
			audio.play();
		}
		audio.pause();
	  }),
	  btnNext = $(streamelement+' .btnNext').click(function() {
		if((index + 1) < trackCount) index++;
		else index = 0;
			
		loadTrack(index);

		if(playing) {
			audio.play();
		}
		audio.pause();
	  }),
	  loadTrack = function(id) {
		npTitle.text(tracks[id].name);
		index = id;
		audio.src = tracks[id].file;
	  };
	  loadTrack(index);
	}

	$(streamelement+' .playStream' ).click(function() {
	  var myAudio = $(streamelement+' .audio1').get(0);
	  if (myAudio.paused) {
	   $(streamelement+' .stateicon').removeClass('fa fa-play');
	   $(streamelement+' .stateicon').addClass('fa fa-pause');
	   myAudio.play();
	 } else {
	   $(streamelement+' .stateicon').removeClass('fa fa-pause');
	   $(streamelement+' .stateicon').addClass('fa fa-play');
	   myAudio.pause();
	}
	});
}

function addThermostatFunctions(thermelement){
									
	$(thermelement+' .btn-number').click(function(e) {
		sliding=true;
	  fieldName = $(this).attr('data-field');
	  type = $(this).attr('data-type');
	  var input = $(thermelement+" strong");
	  var currentVal = input.text().split('°');
	  currentVal = parseFloat(currentVal[0]);
	  if (!isNaN(currentVal)) {
		if (type == 'minus') {

		  if (currentVal > input.attr('min')) {
			input.text(currentVal - 0.5 + _TEMP_SYMBOL).change();
			switchThermostat(parseFloat(input.text()),input);
		  }
		  if (parseFloat(input.text()) == input.attr('min')) {
			$(this).attr('disabled', true);
		  }

		} else if (type == 'plus') {

		  if (currentVal < input.attr('max')) {
			input.text(currentVal + 0.5 + _TEMP_SYMBOL).change();
			switchThermostat(parseFloat(input.text()),input);
		  }
		  if (parseFloat(input.text()) == input.attr('max')) {
			$(this).attr('disabled', true);
		  }

		}
	  } else {
		input.text(0);
	  }
	});

	$(thermelement+' .input-number').focusin(function() {
	  $(this).data('oldValue', $(this).text());
	});

	$(thermelement+' .input-number').change(function() {
	  minValue = parseFloat($(this).attr('min'));
	  maxValue = parseFloat($(this).attr('max'));
	  valueCurrent = parseFloat($(this).text());

	  name = $(this).attr('name');
	  if (valueCurrent >= minValue) {
		$(thermelement+" .btn-number[data-type='minus']").removeAttr('disabled')
	  } else {
		  $(this).val($(this).data('oldValue'));
	  }
	  if (valueCurrent <= maxValue) {
		$(thermelement+" .btn-number[data-type='plus']").removeAttr('disabled')
	  } else {
		  $(this).val($(this).data('oldValue'));
	  }
	});
}

function getDevices(){
	if(!sliding){
		if(typeof(req)!=='undefined') req.abort();
		req = $.getJSONP({
			url: _HOST_DOMOTICZ+'/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?',
			type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
			error: function( jqXHR, textStatus ) {
				alert("Domoticz error!\nPlease, double check the path in _HOST_DOMOTICZ-variable!");
			},
			success: function(data) {
				if(typeof(_DEBUG)!=='undefined' && _DEBUG) data = $.parseJSON(jsonexample);
				if(!sliding){
					$('.solar').remove();
				
					if($('.sunrise').length>0) $('.sunrise').html(data.Sunrise);
					if($('.sunset').length>0) $('.sunset').html(data.Sunset);
										
					for(r in data.result){
						
						var device = data.result[r];
						var idx = device['idx'];
						
						if(device['Type']=='Group' || device['Type']=='Scene') var idx = 's'+device['idx'];
						
						if(typeof(blocks)!=='undefined' && typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['title'])!=='undefined'){
							device['Name'] = blocks[idx]['title'];
						}
						
						alldevices[idx] = device;
						
						if(
							(
								_USE_AUTO_POSITIONING==true && 
								(
									(_USE_FAVORITES==true && device['Favorite']==1) || 
									_USE_FAVORITES===false
								)
							) ||
							$('.block_'+idx).length>0 ||
							$('.block_'+idx+'_1').length>0 ||
							$('.block_'+idx+'_2').length>0 ||
							$('.block_'+idx+'_3').length>0 ||
							$('.block_graph_'+idx).length>0
						){
							var width=4;
							if(device['SwitchType']=='Media Player') width=12;
							if(device['SwitchType']=='Dimmer') width=12;
							if(typeof(blocks)!=='undefined' && typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['width'])!=='undefined') width=blocks[idx]['width'];
							
							if($('.block_'+idx).length<=0){
								if(
									device['Type']=='Thermostat' || 
									device['Type']=='Temp + Humidity' || 
									device['Type']=='Temp + Humidity + Baro' || 
									device['Type']=='Usage' || 
									device['Type']=='Temp' || 
									device['Type']=='Humidity' || 
									device['Type']=='General' || 
									device['Type']=='Wind' || 
									device['Type']=='Rain' || 
									device['Type']=='RFXMeter' || 
									device['Type']=='P1 Smart Meter' || 
									device['Type']=='P1 Smart Meter USB' || 
									device['Type']=='Group' || 
									device['Type']=='Scene' || 
									device['SwitchType']=='Motion Sensor' || 
									device['SwitchType']=='Smoke Detector' || 
									device['SwitchType']=='Contact'
								){
									$('.col2 .auto_states').append('<div class="mh transbg block_'+idx+'"></div>');
								}
								else if(
									device['SwitchType']=='Dimmer'
								){
									$('.col1 .auto_dimmers').append('<div class="mh transbg block_'+idx+'"></div>');
								}
								else if(
									device['SwitchType']=='Media Player'
								){
									$('.col2 .auto_media').append('<div class="mh transbg block_'+idx+'"></div>');
								}
								else $('.col1 .auto_switches').append('<div class="mh transbg block_'+idx+'"></div>');
							}
							
							var buttonimg = '';
							if(device['Image']=='Fan') buttonimg = 'fan';
							if(device['Image']=='Heating') buttonimg = 'heating';
							
							$('div.block_'+idx).data('light',idx);
							$('div.block_'+idx).addClass('col-xs-'+width);
							
							
							var i=1;
							while (i <= 5) {
								if($('div.block_'+idx+'_'+i).length>0){
									$('div.block_'+idx+'_'+i).data('light',idx);
									$('div.block_'+idx+'_'+i).addClass('col-xs-'+width);
									$('div.block_'+idx+'_'+i).html('');
								}
								i++;
							}
							
							var addHTML=true;
							var html = '';

							if($('div.block_graph_'+idx).length>0){
								getGraphs(device,false);
							}
							
							if(typeof(device['SubType'])!=='undefined' && device['SubType'] in blocktypes['SubType']){
								html+= getStatusBlock(device,blocktypes['SubType'][device['SubType']]);
							}
							else if(typeof(device['HardwareType'])!=='undefined' && device['HardwareType'] in blocktypes['HardwareType']){
								html+= getStatusBlock(device,blocktypes['HardwareType'][device['HardwareType']]);
							}
							else if(typeof(device['HardwareName'])!=='undefined' && device['HardwareName'] in blocktypes['HardwareName']){
								html+= getStatusBlock(device,blocktypes['HardwareName'][device['HardwareName']]);
							}
							else if(typeof(device['SensorUnit'])!=='undefined' && device['SensorUnit'] in blocktypes['SensorUnit']){
								html+= getStatusBlock(device,blocktypes['SensorUnit'][device['SensorUnit']]);
							}
							else if(typeof(device['Type'])!=='undefined' && device['Type'] in blocktypes['Type']){
								html+= getStatusBlock(device,blocktypes['Type'][device['Type']]);
							}
							else if(typeof(device['Name'])!=='undefined' && device['Name'] in blocktypes['Name']){
								html+= getStatusBlock(device,blocktypes['Name'][device['Name']]);
							}
							else if(parseFloat(device['idx'])==6 && device['Name']=='Thuis'){ //Special made for HansieNL! :)
							   $('.block_'+idx).attr('onclick','switchDevice(this)');
							   html+='<div class="col-xs-4 col-icon">';
								  if(device['Status']=='Off') html+='<img src="img/switch_off.png" class="off icon" />';
								  else html+='<img src="img/switch_on.png" class="on icon" />';
							   html+='</div>';
							   html+='<div class="col-xs-8 col-data">';
								  html+='<strong class="title">'+device['Name']+'</strong><br />';
								  if(device['Status']=='Off') html+='<span class="state">AFWEZIG</span>';
								  else html+='<span class="state">AANWEZIG</span>';
									if(_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)){
										html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
									}
							   html+='</div>';
							}
							else if(device['HardwareType']=='Logitech Media Server'){
								html+=iconORimage(idx,'fa-music','','on icon','',2);
								html+='<div class="col-xs-10 col-data">';
								html+='<strong class="title">'+device['Name']+'</strong><br />';
								html+='<span class="h4">'+device['Data']+'</span>';
								html+='<div>';
									html+='<a href="javascript:controlLogitech('+device['idx']+',\'Rewind\');"><em class="fa fa-arrow-circle-left fa-small"></em></a> ';
									html+='<a href="javascript:controlLogitech('+device['idx']+',\'Stop\');"><em class="fa fa-stop-circle fa-small"></em></a> ';
									if(device['Status']=='Playing') html+='<a href="javascript:controlLogitech('+device['idx']+',\'Pause\');"><em class="fa fa-pause-circle fa-small"></em></a> ';
									else html+='<a href="javascript:controlLogitech('+device['idx']+',\'Play\');"><em class="fa fa-play-circle fa-small"></em></a> ';
									html+='<a href="javascript:controlLogitech('+device['idx']+',\'Forward\');"><em class="fa fa-arrow-circle-right fa-small"></em></a>';
								html+='</div>';
								html+='</div>';
								
								$('div.block_'+idx).addClass('with_controls');
							}
							else if(device['SwitchType'] == 'Media Player'){
								if(device['HardwareType']=='Kodi Media Server') html+=iconORimage(idx,'','kodi.png','on icon','',2);
								else html+=iconORimage(idx,'fa-film','','on icon','',2);
								html+='<div class="col-xs-10 col-data">';
								html+='<strong class="title">'+device['Name']+'</strong><br />';
								if(device['Data']==''){
									device['Data']=lang.mediaplayer_nothing_playing;
									if(_HIDE_MEDIAPLAYER_WHEN_OFF) $('div.block_'+idx).hide();
								}
								else {
									$('div.block_'+idx).show();
								}
								html+='<span class="h4">'+device['Data']+'</span>';
							}
							else if((device['HardwareType']=='Toon Thermostat' && device['SubType']!=='SetPoint' && device['SubType']!=='AC') || device['Type']=='P1 Smart Meter' || device['HardwareType']=='P1 Smart Meter USB'){
								if(device['Type']=='P1 Smart Meter' && device['SubType']=='Energy'){
									if($('div.block_'+idx).length>0){
										allblocks[idx] = true;
									}
									
									var title=lang.energy_usage;
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									html+= getStateBlock(device['idx']+'sub1','fa fa-plug',title,device['Usage'],device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;
									
									var title=lang.energy_usagetoday;
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
									html = getStateBlock(device['idx']+'sub2','fa fa-plug',title,device['CounterToday'],device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
									$('div.block_'+idx+'_2').html(html);
									addHTML=false;
								}
							}
							else if(
								(device['Type']=='RFXMeter' && device['SubType']=='RFXMeter counter') || device['Type']=='YouLess Meter'){
								if($('div.block_'+idx).length>0){
									allblocks[idx] = true;
								}
								
								var rfxicon='fa fa-fire';
								if(device['Name']=='Water'){
									var rfxicon='fa fa-tint';
								}
								var title=device['Name'];
								if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
								html+= getStateBlock(device['idx']+'a',rfxicon,title,device['CounterToday'],device);
								if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
								$('div.block_'+idx+'_1').html(html);
								addHTML=false;
									
								var title=lang.energy_totals+' '+device['Name'];
								if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
								html= getStateBlock(device['idx']+'b',rfxicon,title,device['Counter'],device);
								if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
								$('div.block_'+idx+'_2').html(html);
								addHTML=false;
							}

							else if(device['Type']=='General' && device['SubType']=='kWh'){
								if($('div.block_'+idx).length>0){
									allblocks[idx] = true;
								}
								
								var title=device['Name']+' '+lang.energy_now;
								if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
								html+= getStateBlock(device['idx']+'a','fa fa-plug',title,number_format(device['Usage'],2,',','.')+' W',device);
								if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
								$('div.block_'+idx+'_1').html(html);
								addHTML=false;
									
								var title=device['Name']+' '+lang.energy_today;
								if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
								html= getStateBlock(device['idx']+'b','fa fa-plug',title,number_format(device['CounterToday'],2,',','.')+' kWh',device);
								if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
								$('div.block_'+idx+'_2').html(html);
								addHTML=false;
								
								var title=device['Name']+' '+lang.energy_total;
								if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
								html= getStateBlock(device['idx']+'c','fa fa-plug',title,number_format(device['Data'],2,',','.')+' kWh',device);
								if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_3').length==0) var duplicate = $('div.block_'+idx+'_2').last().clone().removeClass('block_'+idx+'_2').addClass('block_'+idx+'_3').insertAfter($('div.block_'+idx+'_2'));
								$('div.block_'+idx+'_3').html(html);
								addHTML=false;
								
							}
							else if(
								device['Type']=='Temp + Humidity + Baro' || 
								device['Type']=='Temp + Humidity' || 
								device['Type']=='Humidity'
							){
								
								if($('div.block_'+idx).length>0){
									allblocks[idx] = true;
								}
								
								var title=device['Name'];
								if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
								html+= getStateBlock(device['idx']+'a','fa fa-thermometer-half',title,number_format(device['Temp'],1,',','.')+_TEMP_SYMBOL,device);
								if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
								$('div.block_'+idx+'_1').html(html);
								addHTML=false;
									
								if(typeof(device['Humidity'])!=='undefined'){
									var title=device['Name'];
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
									html= getStateBlock(device['idx']+'b','wi wi-humidity',title,number_format(device['Humidity'],2,',','.')+'%',device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
									$('div.block_'+idx+'_2').html(html);
									addHTML=false;
								}
								
								if(typeof(device['Barometer'])!=='undefined'){
									var title=device['Name'];
									if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
									html= getStateBlock(device['idx']+'c','wi wi-barometer',title,device['Barometer']+' hPa',device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_3').length==0) var duplicate = $('div.block_'+idx+'_2').last().clone().removeClass('block_'+idx+'_2').addClass('block_'+idx+'_3').insertAfter($('div.block_'+idx+'_2'));
									$('div.block_'+idx+'_3').html(html);
									addHTML=false;
								}
								
							}
							else if(device['SwitchType']=='Dimmer'){
								if(buttonimg==''){
									if(device['Status']=='Off') html+=iconORimage(idx,'fa-lightbulb-o','','off icon iconslider','',2,'data-light="'+device['idx']+'" onclick="switchDevice(this);"');
									else html+=iconORimage(idx,'fa-lightbulb-o','','on icon iconslider','',2,'data-light="'+device['idx']+'" onclick="switchDevice(this);"');
								}
								else {
									if(device['Status']=='Off') html+=iconORimage(idx,'',buttonimg+'.png','off icon iconslider','',2,'data-light="'+device['idx']+'" onclick="switchDevice(this);"');
									else html+=iconORimage(idx,'',buttonimg+'.png','on icon iconslider','',2,'data-light="'+device['idx']+'" onclick="switchDevice(this);"');
								}
								html+='<div class="col-xs-10 swiper-no-swiping col-data">';
									html+='<strong class="title">'+device['Name']+': '+device['Level']+'%'+'</strong>';
									if(_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)){
										html+=' / <span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
									}
									html+='<br />';
									html+='<div class="slider slider'+device['idx']+'" data-light="'+device['idx']+'"></div>';
								html+='</div>';

								$('div.block_'+idx).html(html);
								addHTML=false;
								if(parseFloat(device['MaxDimLevel'])==100){
									$( ".slider"+device['idx'] ).slider({
										value:device['Level'],
										step: 1,
										min:1,
										max:100,
										slide: function( event, ui ) {
											sliding = true;
											slideDevice($(this).data('light'),ui.value);
										},
										stop: function( event, ui ) {
											sliding = false;
										}
									});
								}
								else /*if(parseFloat(device['MaxDimLevel'])==15)*/{
									$( ".slider"+device['idx'] ).slider({
										value:Math.ceil((device['Level']/100)*15),
										step: 1,
										min:2,
										max:15,
										slide: function( event, ui ) {
											sliding = true;
											slideDevice($(this).data('light'),ui.value);
										},
										stop: function( event, ui ) {
											sliding = false;
										}
									});
								}
							}
							else if(device['Type']=='Group' || device['Type']=='Scene'){
								if(device['Type']=='Group') $('.block_'+idx).attr('onclick','switchDevice(this)');
								if(device['Type']=='Scene') $('.block_'+idx).attr('onclick','switchGroup(this)');
								
								if(buttonimg==''){
									if(device['Status']=='Off') html+=iconORimage(idx,'fa-lightbulb-o','','off icon');
									else html+=iconORimage(idx,'fa-lightbulb-o','','on icon');
								}
								else {
									if(device['Status']=='Off') html+=iconORimage(idx,'',buttonimg+'.png','off icon');
									else html+=iconORimage(idx,'',buttonimg+'.png','on icon');	
								}
								
								html+=getBlockData(device,idx,lang.state_on,lang.state_off);
							}
							else if(typeof(device['LevelActions'])!=='undefined' && device['LevelActions']!==""){
								var names = device['LevelNames'].split('|');
	
								if(buttonimg==''){
									html+=iconORimage(idx,'fa-lightbulb-o','','on icon');
								}
								else {
									html+=iconORimage(idx,'',buttonimg+'.png','on icon');	
								}
										
								html+='<div class="col-xs-8 col-data">';
									html+='<strong class="title">'+device['Name']+'</strong><br />';
									html+='<select onchange="slideDevice('+device['idx']+',this.value);">';
									html+='<option value="">'+lang.select+'</option>';
									for(a in names){
										var s='';
										if((a*10)==parseFloat(device['Level'])) s = 'selected';
										html+='<option value="'+(a*10)+'" '+s+'>'+names[a]+'</option>';
									}
									html+='</select>';
								html+='</div>';
							}
							else if((device['Type']=='Thermostat' || device['HardwareType']=='Toon Thermostat') && device['SubType']=='SetPoint'){
								
								html+=iconORimage(idx+'_1','','heating.png','on icon','style="max-height:35px;"');
								html+='<div class="col-xs-8 col-data">';
									if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
										html+='<strong class="title">'+device['Name']+'</strong><br />';
										html+='<span class="state">'+device['Data']+_TEMP_SYMBOL+'</span>';
										
									}
									else {
										html+='<strong class="title">'+device['Data']+_TEMP_SYMBOL+'</strong><br />';
										html+='<span class="state">'+device['Name']+'</span>';
									}
									if(_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)){
										html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
									}
								html+='</div>';
								
								$('div.block_'+idx+'_1').html(html);
								addHTML=false;

								html='';
								var random = getRandomInt(1,100000);
								html+='<ul class="col-thermostat input-groupBtn">';
								  html+='<li class="up"><a href="javascript:void(0)" class="btn btn-number plus" data-type="plus" data-field="quant['+device['idx']+']" onclick="this.blur();">';
											html+='<em class="fa fa-plus fa-small fa-thermostat"></em>';
										html+='</a></li>';
								  html+='<li class="down"><a href="javascript:void(0)" class="btn btn-number min" data-type="minus" data-field="quant['+device['idx']+']" onclick="this.blur();">';
								  html+='<em class="fa fa-minus fa-small fa-thermostat"></em>';
										html+='</a></li>';
								html+='</ul>';
								
								html+=iconORimage(idx+'_2','','heating.png','on icon iconheating','','2');
								html+='<div class="col-xs-8 col-data">';
									html+='<strong class="title input-number title-input" min="12" max="25" data-light="'+device['idx']+'">'+device['Data']+_TEMP_SYMBOL+'</strong>';
									html+='<div class="state stateheating">'+device['Name']+'</div>';
									
								html+='</div>';
								
								$('div.block_'+idx+'_2').addClass('thermostat'+random).html(html);
								$('div.block_'+idx).addClass('thermostat'+random).html(html);
								addHTML=false;

								addThermostatFunctions('.thermostat'+random);
							}
							else if(device['SwitchType']=='Door Contact' || device['SwitchType']=='Door Lock'){
								html+='<div class="col-xs-4 col-icon">';
									if(device['Status']=='Closed') html+='<img src="img/door_closed.png" class="off icon" />';
									else html+='<img src="img/door_open.png" class="on icon" />';
								html+='</div>';
								html+=getBlockData(device,idx,lang.state_open,lang.state_closed);
							}
							else if(device['SwitchType']=='Contact'){
								html+='<div class="col-xs-4 col-icon">';
									if(device['Status']=='Closed') html+='<img src="img/door_closed.png" class="off icon" />';
									else html+='<img src="img/door_open.png" class="on icon" />';
								html+='</div>';
								html+=getBlockData(device,idx,lang.state_open,lang.state_closed);
							}
							else if(device['SubType']=='Custom Sensor'){
								
								if(device['Image']=='Water') html+=iconORimage(idx,'fa-tint','','on icon');
								else if(device['Image']=='Heating') html+=iconORimage(idx,'fa-cutlery','','on icon');
								else html+=iconORimage(idx,'fa-question','','on icon');
								
								html+='<div class="col-xs-8 col-data">';
									if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
										html+='<strong class="title">'+device['Data']+'</strong><br />';
										html+='<span class="state">'+device['Name']+'</span>';
									}
									else {
										html+='<strong class="title">'+device['Name']+'</strong><br />';
										html+='<span class="state">'+device['Data']+'</span>';
									}
									if(_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)){
										html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
									}
								html+='</div>';
							}
							else if(device['SwitchType']=='Venetian Blinds EU' || device['SwitchType']=='Blinds' || 
								   device['SwitchType']=='Venetian Blinds EU Percentage' || device['SwitchType']=='Blinds Percentage' || 
								   device['SwitchType']=='Venetian Blinds EU Inverted' || device['SwitchType']=='Blinds Inverted'){
								html+='<div class="col-xs-4 col-icon">';
								   if(device['Status']=='Closed') html+='<img src="img/blinds_closed.png" class="off icon" />';
								   else html+='<img src="img/blinds_open.png" class="on icon" />';
								html+='</div>';
								html+='<div class="col-xs-8 col-data">';
								   html+='<strong class="title">'+device['Name']+'</strong><br />';
								   html+='<span class="state">'+device['Data'].toUpperCase()+'</span>';
								html+='</div>';
										
								if(typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_stop'])=='undefined' || blocks[idx]['hide_stop']===false){
									var hidestop = false;
									html+='<ul class="input-groupBtn input-chevron">';
								}
								else {
									var hidestop = true;
									html+='<ul class="input-groupBtn input-chevron hidestop">';
								}
									if(device['SwitchType']=='Venetian Blinds EU Inverted' || device['SwitchType']=='Blinds Inverted'){
										html+='<li class="up"><a href="javascript:void(0)" class="btn btn-number plus" onclick="switchBlinds('+device['idx']+',\'On\');">';
										html+='<em class="fa fa-chevron-up fa-small"></em>';
										html+='</a></li>';

										html+='<li class="down"><a href="javascript:void(0)" class="btn btn-number min" onclick="switchBlinds('+device['idx']+',\'Off\');">';
										html+='<em class="fa fa-chevron-down fa-small"></em>';
										html+='</a></li>';

										if(!hidestop){
											html+='<li class="stop"><a href="javascript:void(0)" class="btn btn-number stop" onclick="switchBlinds('+device['idx']+',\'Stop\');">';
											html+='STOP';
											html+='</a></li>';
										}
									}
									else {
										html+='<li><a href="javascript:void(0)" class="btn btn-number plus" onclick="switchBlinds('+device['idx']+',\'Off\');">';
										html+='<em class="fa fa-chevron-up fa-small"></em>';
										html+='</a></li>';

										html+='<li><a href="javascript:void(0)" class="btn btn-number min" onclick="switchBlinds('+device['idx']+',\'On\');">';
										html+='<em class="fa fa-chevron-down fa-small"></em>';
										html+='</a></li>';

										if(!hidestop){
											html+='<li class="stop"><a href="javascript:void(0)" class="btn btn-number stop" onclick="switchBlinds('+device['idx']+',\'Stop\');">';
											html+='STOP';
											html+='</a></li>';
										}
									}

								html+='</ul>';
							}
							else if(device['SwitchType']=='Motion Sensor'){
								html+='<div class="col-xs-4 col-icon">';
								
									if(device['Status']=='Off' || device['Status']=='Normal') html+='<img src="img/motion_off.png" class="off icon" style="max-height:35px;" />';
									else html+='<img src="img/motion_on.png" class="on icon" style="max-height:35px;" />';	
								
								html+='</div>';
								html+=getBlockData(device,idx,lang.state_movement,lang.state_nomovement);
							}
							else if(device['SwitchType']=='Smoke Detector'){
								if(device['Status']=='Off' || device['Status']=='Normal') html+=iconORimage(idx,'','heating.png','off icon','style="max-height:35px;"');
								else html+=iconORimage(idx,'','heating.png','on icon','style="max-height:35px;border: 5px solid #F05F40;"');	
								html+=getBlockData(device,idx,lang.state_smoke,lang.state_nosmoke);
							}
							else if(device['HardwareName']=='Dummy') { 
								$('.block_'+idx).attr('onclick','switchDevice(this)');
								
								if(device['Status']=='Off') html+=iconORimage(idx,'fa-toggle-off','','off icon');
								else html+=iconORimage(idx,'fa-toggle-on','','on icon');
								
								html+=getBlockData(device,idx,lang.state_on,lang.state_off);
							}
							else if(device['Image']=='Alarm') { 
								if(device['Status']=='Off') html+=iconORimage(idx,'fa-warning','','off icon');
								else html+=iconORimage(idx,'fa-warning','','on icon','style="color:#F05F40;"');
								
								html+=getBlockData(device,idx,lang.state_on,lang.state_off);
							}
							else {
								$('.block_'+idx).attr('onclick','switchDevice(this)');
								if(buttonimg==''){
									if(device['Status']=='Off') html+=iconORimage(idx,'fa-lightbulb-o','','off icon');
									else html+=iconORimage(idx,'fa-lightbulb-o','','on icon');
								}
								else {
									if(device['Status']=='Off') html+=iconORimage(idx,'',buttonimg+'.png','off icon');
									else html+=iconORimage(idx,'',buttonimg+'.png','on icon');
								}
								html+=getBlockData(device,idx,lang.state_on,lang.state_off);
							}
							
							if(typeof($('.block_'+idx).attr('onclick'))!=='undefined'){
								$('div.block_'+idx).addClass('hover');	
							}
							if(addHTML){
								$('div.block_'+idx).html(html);
							}
						}
					}
					if(typeof(afterGetDevices)=='function') afterGetDevices();
				}
				
				if(typeof(_DEBUG)=='undefined' || _DEBUG===false) setTimeout(function(){ getDevices(); },(_DOMOTICZ_REFRESH*1000));
			}
		});
	}
	else {
		if(typeof(_DEBUG)=='undefined' || _DEBUG===false) setTimeout(function(){ getDevices(); },(_DOMOTICZ_REFRESH*1000));
	}
}