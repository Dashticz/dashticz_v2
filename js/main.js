
window.onerror = function(msg, url, line, col, error) {
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line);

   var suppressErrorAlert = true;
   return suppressErrorAlert;
};

var customfolder = 'custom';
if(typeof(dashtype)!=='undefined' && parseFloat(dashtype)>1){
	customfolder = 'custom_'+dashtype;
}

if(typeof(_HOST_DOMOTICZ)=='undefined') var _HOST_DOMOTICZ='';
if(typeof(_LANGUAGE)=='undefined') var _LANGUAGE='nl_NL';
if(typeof(_USE_FAVORITES)=='undefined') var _USE_FAVORITES=false;
if(typeof(_USE_AUTO_POSITIONING)=='undefined') var _USE_AUTO_POSITIONING=false;
if(typeof(_HIDE_SECONDS_IN_CLOCK)=='undefined') var _HIDE_SECONDS_IN_CLOCK=false;
if(typeof(_HIDE_SECONDS_IN_STATIONCLOCK)=='undefined') var _HIDE_SECONDS_IN_STATIONCLOCK=false;
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
if(typeof(_DASHTICZ_REFRESH )=='undefined') var _DASHTICZ_REFRESH  = 240;
if(typeof(_USE_STATIC_WEATHERICONS )=='undefined') var _USE_STATIC_WEATHERICONS  = false;
if(typeof(_SAVED_COLORS )=='undefined') var _SAVED_COLORS  = [];
if(typeof(_EDIT_MODE )=='undefined') var _EDIT_MODE  = false;
if(typeof(_THEME)=='undefined') var _THEME  = 'default';

var _TEMP_SYMBOL = '°C';
if(_USE_FAHRENHEIT) _TEMP_SYMBOL = '°F';

var cache = new Date().getTime();
$('<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">').appendTo("head");
$('<link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="fonts/opensans/open-sans.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="vendor/weather/css/weather-icons.min.css?v='+cache+'" rel="stylesheet">').appendTo("head");
$('<link href="vendor/jquery/jquery-ui.css" rel="stylesheet">').appendTo("head");
$('<link href="vendor/morrisjs/morris.css" rel="stylesheet">').appendTo("head");
$('<link href="vendor/spectrum/spectrum.css" rel="stylesheet">').appendTo("head");
$('<link href="css/creative.css?v='+cache+'" rel="stylesheet">').appendTo("head");
$('<link href="css/sortable.css?v='+cache+'" rel="stylesheet">').appendTo("head");

$.ajax({url: 'vendor/jquery/jquery-ui.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/jquery/touchpunch.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/bootstrap/js/bootstrap.min.js', async: false,dataType: "script"});
$.ajax({url: 'js/functions.js?v='+cache, async: false,dataType: "script"});
		
$.ajax({url: customfolder+'/CONFIG.js?v='+cache, async: false,dataType: "script"});
$.ajax({url: 'lang/'+_LANGUAGE+'.js?v='+cache, async: false,dataType: "script"});
if(_THEME!=='default'){
	$('<link rel="stylesheet" type="text/css" href="themes/'+_THEME+'/'+_THEME+'.css?v='+cache+'" />').appendTo("head");
}
$('<link href="'+customfolder+'/custom.css?v='+cache+'" rel="stylesheet">').appendTo("head");
$.ajax({url: 'vendor/raphael/raphael-min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/morrisjs/morris.min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/moment.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/moment-with-locales.js', async: false,dataType: "script"});
//$.ajax({url: 'vendor/nzbget/nzbget.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/jquery.newsTicker.min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/skycons/skycons.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/spectrum/spectrum.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/ion.sound/ion.sound.min.js', async: false,dataType: "script"});
$.ajax({url: 'vendor/mobiledetect/mobiledetect.js', async: false,dataType: "script"});
$.ajax({url: 'js/sortable.js', async: false,dataType: "script"});
$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
$.ajax({url: 'js/trash.js', async: false,dataType: "script"});
$.ajax({url: 'js/calendar.js', async: false,dataType: "script"});
$.ajax({url: 'js/thermostat.js', async: false,dataType: "script"});
$.ajax({url: 'js/publictransport.js', async: false,dataType: "script"});

if(typeof(_DEBUG)!=='undefined' && _DEBUG){
	$.ajax({url: 'custom/json_vb.js', async: false,dataType: "script"});
	$.ajax({url: 'custom/graph_vb.js', async: false,dataType: "script"});
}

$.ajax({url: ''+customfolder+'/custom.js?v='+cache, async: false,dataType: "script"});
$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});

var standby=true;
var standbyActive=false;
var standbyTime=0;

var swipebackTime=0;
var audio = {};
var req;
var slide;
var sliding = false;
var defaultcolumns=false;
var allblocks={}
var alldevices={}
var myswiper;
var isMobile = false; //initiate as false
var addedThermostat = [];
var oldstates = [];
var gettingDevices = false;
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
if(typeof(_APIKEY_MAPS)!=='undefined' && _APIKEY_MAPS!=="") $.ajax({url: 'https://maps.googleapis.com/maps/api/js?key='+_APIKEY_MAPS+'&callback=initMap', async: false,dataType: "script"});
	
	
$(document).ready(function(){	
	
	if(_EDIT_MODE){
		$('body').append('<div class="editmode">EDIT MODE</div>');	
	}
	
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
	
	setInterval(function(){ 
		if(_HIDE_SECONDS_IN_CLOCK==true) $('.clock').html(moment().locale(_LANGUAGE.substr(0,2)).format('HH:mm'));
		else $('.clock').html(moment().locale(_LANGUAGE.substr(0,2)).format('HH:mm:ss'));
		$('.date').html(moment().locale(_LANGUAGE.substr(0,2)).format('D MMMM YYYY'));
		$('.weekday').html(moment().locale(_LANGUAGE.substr(0,2)).format('dddd'));
	},1000);

	getDevices(); 	
	
	setClassByTime();
	setInterval(function(){ 
		setClassByTime();
	},(60000));
	
	setTimeout(function(){
		document.location.href=document.location.href;
	},(_DASHTICZ_REFRESH*60*1000));
	
}); 

function toSlide(num){
	if(typeof(myswiper)!=='undefined') myswiper.slideTo( num,1000,false );
}

function buildStandby(){
	
	if($('.screenstandby').length==0){
		var screenhtml = '<div class="screen screenstandby swiper-slide slidestandby" style="height:'+$(window).height()+'px"><div class="row"></div></div>';
		$('div.screen').hide();
		$('div.swiper-container').before(screenhtml);	

		for(c in columns_standby){
			$('div.screenstandby .row').append('<div class="col-xs-'+columns_standby[c]['width']+' colstandby'+c+'"></div>');
			getBlock(columns_standby[c],c,'div.screenstandby .row .colstandby'+c,true);	
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
				getBlock(columns[c],c,'div.screen'+s+' .row .col'+c,false);
			}
		}
		else {
			$('body .row').append('<div class="col-xs-5 sortable col1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
			$('body .row').append('<div class="col-xs-5 sortable col2"><div class="block_weather containsweatherfull"></div><div class="auto_media"></div><div class="auto_states"></div></div>');
			$('body .row').append('<div class="col-xs-2 sortable col3"><div class="auto_clock"></div><div class="auto_sunrise"></div><div class="auto_buttons"></div></div>');

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
	
	startSwiper();
}

function startSwiper(){
	var md = new MobileDetect(window.navigator.userAgent);//window.navigator.userAgent);
	if(md.mobile()==null || md.tablet()!==null){
		$('<link href="vendor/swiper/css/swiper.min.css" rel="stylesheet">').appendTo("head");
		if(objectlength(screens)>1 && (typeof(_EDIT_MODE)=='undefined' || _EDIT_MODE===false)){
			setTimeout(function(){
				myswiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					loop: false,
					effect: _SCREENSLIDER_EFFECT,
					keyboardControl:true
				});
			},2000);
		}

	}
	$( window ).resize(function() { document.location.href=document.location.href });
}

function initMap() {
	if($('#trafficm').length>0){
		showMap('trafficm');
		setInterval(function(){
			showMap('trafficm');
		},(60000*5));
	}
}

function showMap(mapid,map) {
	if(typeof(_APIKEY_MAPS)=='undefined' || _APIKEY_MAPS=="") console.error('Please, set var _APIKEY_MAPS!');
	
	
	if(typeof(map)!=='undefined'){
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: map.zoom,
			  center: {lat: map.latitude, lng: map.longitude}
			});
	}
	else {
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: parseFloat(_MAPS_ZOOMLEVEL),
			  center: {lat: parseFloat(_MAPS_LATITUDE), lng: parseFloat(_MAPS_LONGITUDE)}
			});
	}

	var transitLayer = new google.maps.TrafficLayer();
	transitLayer.setMap(map);
	
}

function setClassByTime(){
		
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
}

if(typeof(_AUTO_SWIPEBACK_TO)!=='undefined' && typeof(_AUTO_SWIPEBACK_TIME)!=='undefined'){
	if(parseFloat(_AUTO_SWIPEBACK_TIME)>0){
	   setInterval(function(){
		  swipebackTime+=1000;
		
		 if(swipebackTime>=(_AUTO_SWIPEBACK_TIME*1000)){
			toSlide((_AUTO_SWIPEBACK_TO-1));
			swipebackTime=0;
		 }
	   },1000);
		
	}
}

//Loop through pages
if(_SLIDE_PAGES != false && (_AUTO_SWIPEBACK_TIME == 0  || typeof(_AUTO_SWIPEBACK_TIME)== 'undefined') && _SLIDE_PAGES > 4){
	var nextSlide = 1;
	setInterval(function(){
		toSlide(nextSlide);
		nextSlide++;
		if(nextSlide > myswiper.slides.length-1){
			nextSlide = 0;
		}
	},(_SLIDE_PAGES * 1000));
}

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
	  standbyTime+=5000;
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

}

function playAudio(file){
	var key = $.md5(file);
	file = file.split('/');
	
	filename = file[(file.length-1)].split('.');
	filename = filename[0];
	delete file[(file.length-1)];
	
	if(!gettingDevices){
		ion.sound({
			sounds: [
				{name: filename}
			],

			path: file.join('/')+"/",
			preload: true,
			multiplay: false
		});

		ion.sound.play(filename);
	}
}

function triggerStatus(idx,value,device){
	try {
		eval('getStatus_'+idx+'(idx,value,device)');
	}
	catch(err) {}
}

function triggerChange(idx,value,device){
	if(typeof(oldstates[idx])!=='undefined' && value!==oldstates[idx]){
		//disableStandby(); 
		try {
			eval('getChange_'+idx+'(idx,value,device)');
		}
		catch(err) {}
		
		if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['playsound'])!=='undefined'){
			playAudio(blocks[idx]['playsound']);
		}
		if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['gotoslide'])!=='undefined'){
			toSlide((blocks[idx]['gotoslide']-1));
		}
		if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['openpopup'])!=='undefined'){
			var random = getRandomInt(1,100000);
			$('.modal.openpopup,.modal-backdrop').remove();
			
			var html = '<div class="modal fade openpopup" id="popup_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
			  html+='<div class="modal-dialog">';
				html+='<div class="modal-content">';
				  html+='<div class="modal-header">';
					html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
				  html+='</div>';
				  html+='<div class="modal-body">';
					  html+='<iframe src="'+blocks[idx]['openpopup']['url']+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
				  html+='</div>';
				html+='</div>';
			  html+='</div>';
			html+='</div>';
			$('body').append(html);
			$('#popup_'+random).modal('show');
			
			if(typeof(blocks[idx]['openpopup']['auto_close'])!=='undefined'){
				setTimeout(function(){
					$('.modal.openpopup,.modal-backdrop').remove();
				},(parseFloat(blocks[idx]['openpopup']['auto_close'])*1000));
			}
		}
	}
	oldstates[idx] = value;
}
function disableStandby(){

 if(standbyActive==true){
	 standbyTime=0;
	 if(typeof(_END_STANDBY_CALL_URL)!=='undefined' && _END_STANDBY_CALL_URL!==''){
		   $.get(_END_STANDBY_CALL_URL);
	 }
  }

  if(objectlength(columns_standby)>0){
	$('div.screen').show();
  }
  $('.screenstandby').remove();
  $('body').removeClass('standby');
  $('.swiper-container').show();
  standbyActive=false;

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
				  html+='<iframe data-popup="'+map.link+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}
	
	var key = 'UNKNOWN';
	if(typeof(map.key)!=='undefined') key=map.key;
	
	var width = 12;
	if(typeof(map.width)!=='undefined') width=map.width;
	if(typeof(map.link)!=='undefined') var html='<div class="col-xs-'+width+' mh hover swiper-no-swiping transbg block_trafficmap" data-toggle="modal" data-target="#trafficmap_frame_'+b+'" onclick="setSrc(this);" ';
	else var html='<div class="col-xs-'+width+' mh swiper-no-swiping transbg block_trafficmap" ';
	if(typeof(map.height)!=='undefined') html+=' style="height:'+map.height+'px !important;"';
	html+='>';
	html+='<div id="trafficmap_'+b+'" data-id="maps.'+key+'" class="trafficmap"></div>';
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
				  html+='<iframe data-popup="'+button.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}
	var width = 12;
	if(typeof(button.width)!=='undefined') width=button.width;
	
	var key = 'UNKNOWN';
	if(typeof(button.key)!=='undefined') key=button.key;
	
	var html='<div class="col-xs-'+width+' hover transbg" data-id="buttons.'+key+'" data-toggle="modal" data-target="#button_'+b+'_'+random+'" onclick="setSrc(this);">';
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
	
	var key = 'UNKNOWN';
	if(typeof(frame.key)!=='undefined') key=frame.key;
	
	var width = 12;
	if(typeof(frame.width)!=='undefined') width=frame.width;
	var html='<div data-id="frames.'+key+'" class="col-xs-'+width+' hover transbg swiper-no-swiping imgblock imgblock'+f+'" style="height:'+frame.height+'px;padding:0px !important;">';
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
				  html+='<iframe data-popup="'+image.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);
	}

	var key = 'UNKNOWN';
	if(typeof(image.key)!=='undefined') key=image.key;
	
	var width = 12;
	if(typeof(image.width)!=='undefined') width=image.width;
	var html='';
	
	if(typeof(image.url)!=='undefined') html+='<div data-id="buttons.'+key+'" class="col-xs-'+width+' hover transbg imgblock imgblock'+i+'" data-toggle="modal" data-target="#'+i+'" onclick="setSrc(this);">';
	else html+='<div class="col-xs-'+width+' transbg imgblock imgblock'+i+'" data-id="buttons.'+key+'">';
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

function getDevices(override){
	if(typeof(override)=='undefined') override=false;
	if(!sliding || override){
		if(typeof(req)!=='undefined') req.abort();
		gettingDevices=true;
		req = $.getJSONP({
			url: _HOST_DOMOTICZ+'/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?',
			type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
			error: function( jqXHR, textStatus ) {
				console.error("Domoticz error!\nPlease, double check the path in _HOST_DOMOTICZ-variable!");
			},
			success: function(data) {
				gettingDevices = false;
				if(typeof(_DEBUG)!=='undefined' && _DEBUG) data = $.parseJSON(jsonexample);
				if(!sliding || override){
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
							
							triggerStatus(idx,device['LastUpdate'],device);
							triggerChange(idx,device['LastUpdate'],device);
							
							try {
								html+= eval('getBlock_'+idx+'(device,idx,data.result)');
							}
							catch(err) {
								
								if(typeof(device['SubType'])!=='undefined' && device['SubType'] in blocktypes['SubType']){
									html+= getStatusBlock(device,blocktypes['SubType'][device['SubType']]);
								}
								else if(typeof(device['HardwareType'])!=='undefined' && device['HardwareType'] in blocktypes['HardwareType']){
									if(typeof(blocktypes['HardwareType'][device['HardwareType']]['icon'])!=='undefined'){
										html+= getStatusBlock(device,blocktypes['HardwareType'][device['HardwareType']]);
									}
									else {
										var c=1;
										for(de in blocktypes['HardwareType'][device['HardwareType']]){
											html = getStatusBlock(device,blocktypes['HardwareType'][device['HardwareType']][de],c);
											
											triggerStatus(idx+'_'+c,device['LastUpdate'],device);
											triggerChange(idx+'_'+c,device['LastUpdate'],device);
							
											$('div.block_'+idx+'_'+c).html(html);
											addHTML=false;
											c++;
										}
									}
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

										triggerStatus(idx+'_1',device['LastUpdate'],device);
										triggerChange(idx+'_1',device['LastUpdate'],device);
							
										var title=lang.energy_usage;
										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
										if(typeof(device['UsageDeliv'])!=='undefined' && (parseFloat(device['UsageDeliv'])>0 || parseFloat(device['UsageDeliv'])<0)){
											html+= getStateBlock(device['idx']+'sub1','fa fa-plug',title,device['UsageDeliv'],device);
										}
										else {
											html+= getStateBlock(device['idx']+'sub1','fa fa-plug',title,device['Usage'],device);
										}
										if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
										$('div.block_'+idx+'_1').html(html);
										addHTML=false;

										triggerStatus(idx+'_2',device['LastUpdate'],device);
										triggerChange(idx+'_2',device['LastUpdate'],device);
							
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
									triggerStatus(idx+'_1',device['LastUpdate'],device);
									triggerChange(idx+'_1',device['LastUpdate'],device);
							
									var title=device['Name'];
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									html+= getStateBlock(device['idx']+'a',rfxicon,title,device['CounterToday'],device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;

									triggerStatus(idx+'_2',device['LastUpdate'],device);
									triggerChange(idx+'_2',device['LastUpdate'],device);
							
									var title=lang.energy_totals+' '+device['Name'];
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
									html= getStateBlock(device['idx']+'b',rfxicon,title,device['Counter'],device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
									$('div.block_'+idx+'_2').html(html);
									addHTML=false;

									if(typeof(device['Usage'])!=='undefined'){
										triggerStatus(idx+'_3',device['LastUpdate'],device);
										triggerChange(idx+'_3',device['LastUpdate'],device);

										var title=device['Name'];
										if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
										html= getStateBlock(device['idx']+'c',rfxicon,title,device['Usage'],device);
										if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_3').length==0) var duplicate = $('div.block_'+idx+'_2').last().clone().removeClass('block_'+idx+'_2').addClass('block_'+idx+'_3').insertAfter($('div.block_'+idx+'_2'));
										$('div.block_'+idx+'_3').html(html);
										addHTML=false;
									}
								}

								else if(device['Type']=='General' && device['SubType']=='kWh'){
									if($('div.block_'+idx).length>0){
										allblocks[idx] = true;
									}

									triggerStatus(idx+'_1',device['LastUpdate'],device);
									triggerChange(idx+'_1',device['LastUpdate'],device);
							
									var title=device['Name']+' '+lang.energy_now;
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									html+= getStateBlock(device['idx']+'a','fa fa-plug',title,number_format(device['Usage'],2,',','.')+' W',device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;

									triggerStatus(idx+'_2',device['LastUpdate'],device);
									triggerChange(idx+'_2',device['LastUpdate'],device);
							
									var title=device['Name']+' '+lang.energy_today;
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
									html= getStateBlock(device['idx']+'b','fa fa-plug',title,number_format(device['CounterToday'],2,',','.')+' kWh',device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
									$('div.block_'+idx+'_2').html(html);
									addHTML=false;

									triggerStatus(idx+'_3',device['LastUpdate'],device);
									triggerChange(idx+'_3',device['LastUpdate'],device);
							
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

									triggerStatus(idx+'_1',device['LastUpdate'],device);
									triggerChange(idx+'_1',device['LastUpdate'],device);
							
									var title=device['Name'];
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									html+= getStateBlock(device['idx']+'a','fa fa-thermometer-half',title,number_format(device['Temp'],1,',','.')+_TEMP_SYMBOL,device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;

									if(typeof(device['Humidity'])!=='undefined'){
										triggerStatus(idx+'_2',device['LastUpdate'],device);
										triggerChange(idx+'_2',device['LastUpdate'],device);
							
										var title=device['Name'];
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
										html= getStateBlock(device['idx']+'b','wi wi-humidity',title,number_format(device['Humidity'],2,',','.')+'%',device);
										if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
										$('div.block_'+idx+'_2').html(html);
										addHTML=false;
									}

									if(typeof(device['Barometer'])!=='undefined'){
										triggerStatus(idx+'_3',device['LastUpdate'],device);
										triggerChange(idx+'_3',device['LastUpdate'],device);
							
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
										html+='<strong class="title">'+device['Name'];
									if(typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_data'])=='undefined' || blocks[idx]['hide_data']==false){
										html+=' '+device['Level']+'%';
									}
									html+='</strong>';
										if((_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (!_SHOW_LASTUPDATE && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
											html+=' / <span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
										}
										html+='<br />';
										if(device['SubType']=='RGBW_TEMP'){
											html+='<input type="text" class="rgbw" />';
											html+='<div class="slider slider'+device['idx']+'" style="margin-left:55px;" data-light="'+device['idx']+'"></div>';
										}
										else {
											html+='<div class="slider slider'+device['idx']+'" data-light="'+device['idx']+'"></div>';
										}
										
									html+='</div>';

									$('div.block_'+idx).html(html);
									addHTML=false;
									
									if(device['SubType']=='RGBW_TEMP'){
										$(".rgbw").spectrum({
											color: "#f00",
											showPalette: true,
											palette: [_SAVED_COLORS]
										});
										
										$(".rgbw").on("dragstop.spectrum",function(e, color) {
											color = color.toHexString(); // #ff0000
											alert(color);
										});
										
									}
									
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
											change:function( event, ui ) {
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
											value:Math.ceil((device['Level']/100)*16),
											step: 1,
											min:2,
											max:15,
											slide: function( event, ui ) {
												sliding = true;
												slideDevice($(this).data('light'),ui.value);
											},
											change:function( event, ui ) {
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

										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['switch'])!=='undefined' && blocks[idx+'_1']['switch']==true){
											html+='<strong class="title">'+device['Name']+'</strong><br />';
											html+='<span class="state">'+device['Data']+_TEMP_SYMBOL+'</span>';

										}
										else {
											html+='<strong class="title">'+device['Data']+_TEMP_SYMBOL+'</strong><br />';
											html+='<span class="state">'+device['Name']+'</span>';
										}
										if((_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (!_SHOW_LASTUPDATE && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
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
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['switch'])!=='undefined' && blocks[idx+'_2']['switch']==true){
											html+='<strong class="title input-number title-input" min="12" max="25" data-light="'+device['idx']+'">'+device['Name']+'</strong>';
											html+='<div class="state stateheating">'+device['Data']+_TEMP_SYMBOL+'</div>';
										}
										else {	
											html+='<strong class="title input-number title-input" min="12" max="25" data-light="'+device['idx']+'">'+device['Data']+_TEMP_SYMBOL+'</strong>';
											html+='<div class="state stateheating">'+device['Name']+'</div>';
										}

									html+='</div>';

									$('div.block_'+idx+'_2').html(html);
									$('div.block_'+idx).html(html);
									addHTML=false;

									if(typeof(addedThermostat[idx])=='undefined'){
										addThermostatFunctions('.block_'+idx);
										addedThermostat[idx] = true;
									}
									if(typeof(addedThermostat[idx+'_2'])=='undefined'){
										addThermostatFunctions('.block_'+idx+'_2');
										addedThermostat[idx+'_2'] = true;
									}
								}
								else if(device['SwitchType']=='Door Contact' || device['SwitchType']=='Door Lock'){
									if(device['Status']=='Closed') html+=iconORimage(idx,'','door_closed.png','off icon','',2);
									else html+=iconORimage(idx,'','door_open.png','on icon','',2);
									
									html+=getBlockData(device,idx,lang.state_open,lang.state_closed);
								}
								else if(device['SwitchType']=='Contact'){
									if(device['Status']=='Closed') html+=iconORimage(idx,'','door_closed.png','off icon','',2);
									else html+=iconORimage(idx,'','door_open.png','on icon','',2);

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
										if((_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (!_SHOW_LASTUPDATE && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
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

									   if(device['Status']=='Closed') html+='<span class="state">'+lang.state_closed+'</span>';
									   else html+='<span class="state">'+lang.state_open+'</span>';

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
								else if(device['SwitchType']=='Blinds Percentage Inverted'){
									html+='<div class="col-xs-2 col-icon">';
									   if(device['Status']=='Closed') html+='<img src="img/blinds_closed.png" class="off icon" />';
									   else html+='<img src="img/blinds_open.png" class="on icon" />';
									html+='</div>';
									html+='<div class="col-xs-9 col-data">';
									   html+='<strong class="title">'+device['Name']+'</strong><br />';

									   //if(device['Status']=='Closed') html+='<span class="state">'+lang.state_closed+'</span>';
									   //else html+='<span class="state">'+lang.state_open+'</span>';
										
									    html+='<div class="slider slider'+device['idx']+'" data-light="'+device['idx']+'"></div>';
										
									html+='</div>';
									
									if(typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_stop'])=='undefined' || blocks[idx]['hide_stop']===false){
										var hidestop = false;
										html+='<ul class="input-groupBtn input-chevron">';
									}
									else {
										var hidestop = true;
										html+='<ul class="input-groupBtn input-chevron hidestop">';
									}
									
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

									html+='</ul>';
									
									$('div.block_'+idx).html(html);
									addHTML=false;
									
									$( ".slider"+idx ).slider({
										value:device['Level'],
										step: 1,
										min:1,
										max:100,
										slide: function( event, ui ) {
											sliding = true;
											slideDevice($(this).data('light'),ui.value);
										},
										change:function( event, ui ) {
											sliding = true;
											slideDevice($(this).data('light'),ui.value);
										},
										stop: function( event, ui ) {
											sliding = false;
										}
									});
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
									if((typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['protected']) == 'undefined' || blocks[idx]['protected'] == false) && device['Protected'] == false){
										$('.block_'+idx).attr('onclick','switchDevice(this)');
									}

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

									if((typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['protected']) == 'undefined' || blocks[idx]['protected'] == false) && device['Protected'] == false){
										$('.block_'+idx).attr('onclick','switchDevice(this)');
									}
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
