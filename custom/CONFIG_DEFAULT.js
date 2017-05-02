
var _LANGUAGE 				= 'nl_NL'; //or: en_US, fr_FR, hu_HU
var _HOST_DOMOTICZ		  	= 'http://192.168.1.3:8084';
var _DOMOTICZ_REFRESH		= 5; //in seconds
var _DASHTICZ_REFRESH		= 30; //in minutes

/*
IF YOU HAVE A MEDIABOX FROM ZIGGO (HORIZON), COPY SWITCH_HORIZON.PHP ON A WEBSERVER INSIDE YOUR NETWORK AND CHANGE THE IP.
ENTER THE PATH TO THIS FILE BELOW.
*/
var _HOST_ZIGGO_HORIZON	  	= ''; //e.g. http://192.168.1.3/domoticz/switch_horizon.php';
var _APIKEY_WUNDERGROUND  	= '';
var _WEATHER_CITY 			= 'Eindhoven';
var _WEATHER_CITYNAME 		= ''; //show a different city name, leave empty if same as _WEATHER_CITY
var _WEATHER_COUNTRY 		= 'NL';
var _USE_AUTO_POSITIONING 	= true; //don't want to configure positions, use auto positioning
var _USE_FAVORITES			= true; //only used when using auto positioning
var _HIDE_SECONDS_IN_CLOCK  = false; //do not show the seconds in the clock
var _HIDE_MEDIAPLAYER_WHEN_OFF = false; //when you have a mediaplayer connected, hide it if nothing is playing
var _NEWS_RSSFEED			= 'http://www.nu.nl/rss/algemeen';
var _USE_FAHRENHEIT			= false;
var _USE_BEAUFORT 			= true; //Bft instead of m/s
var _TRANSLATE_SPEED 		= false; //windspeed, north northwest instead of NNW
var _STANDBY_AFTER_MINUTES  = false; //enter amount of minutes like: 5 (5 minutes)
var _SCROLL_NEWS_AFTER 		= 7000; //milliseconds, so 7000 is 7 seconds
var _SHOW_LASTUPDATE 		= true;
var _LASTUPDATE_FORMAT 		= 'DD-MM-YY HH:mm';
var _SCREENSLIDER_EFFECT 	= 'slide'; //'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

var _APIKEY_MAPS			= '';
var _MAPS_LATITUDE			= '';
var _MAPS_LONGITUDE			= '';

var _AUTO_SWIPEBACK_TO		= 1; //when no activity, swipe back to main screen after x seconds
var _AUTO_SWIPEBACK_TIME	= 10; //seconds

// Online Radio Stream Plugin, Note: you must enable  plugin in column section 'streamplayer', see columns[3]['blocks'] example below.
var _STREAMPLAYER_TRACKS  	= [
								{"track":1,"name":"Music FM","file":"http://stream.musicfm.hu:8000/musicfm.mp3"},
								{"track":2,"name":"Radio 1","file":"http://213.181.210.106:8000/high.mp3"},
								{"track":3,"name":"Test FM","file":"http://213.181.210.106:8000/high.mp3"},
							  ]; 

// iCalendar Plugin, supports all .ics calendar types like Google Calendar, Apple Calendar
var _ICALENDAR_URL			= 'https://testurl.com/ical.ics'; //supports .ics type calendars (Google Calendar, Apple Calendar etc.)
var _ICALENDAR_DATEFORMAT	= 'friendly'; //'friendly', 'MM.DD.YYYY HH:mm', 'DD.MM.YYYY HH:mm', 'YYYY.MM.DD HH:mm'
var _ICALENDAR_LOCALE		= 'en'; //en,hu, etc. 

//Buttons or images to open webpages in an iframe, like a news website or weather forecast
var buttons = {}
buttons.buienradar = {width:12, isimage:true, refreshimage:60000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=285&h=256', url: 'http://www.weeronline.nl/Europa/Nederland/Son/4058667'}
buttons.radio = {width:12, image: 'img/radio_on.png', title: 'Radio', url: 'http://nederland.fm'}
buttons.nunl = {width:12, icon: 'fa-newspaper-o', title: 'Nu.nl', url: 'http://www.nu.nl'}


//CUSTOM POSITIONING:
//defining wich blocks to show, de numbers represents the IDX of the device in Domoticz
//only define if you want to use a custom width instead of the default

//var blocks = {}

//blocks[1] = {}
//blocks[1]['width'] = 4; //1 to 12, remove this line if you want to use the default (4)
//blocks[1]['title'] = 'Living room' //if you want change the name of switch different then domoticz
//blocks[1]['icon'] = 'fa-eye'; //if you want an other icon instead of the default, choose from: http://fontawesome.io/cheatsheet/
//blocks[1]['image'] = 'bulb_off.png'; //if you want to show an image instead if icon, place image in img/ folder

//blocks[204] = {} //dimmer
//blocks[204]['width'] = 12;
//blocks[204]['title'] = 'Living room' //if you want change the name of switch different then domoticz

//blocks['blocktitle_1'] = {}
//blocks['blocktitle_1']['type'] = 'blocktitle';
//blocks['blocktitle_1']['title'] = 'Schakelaars';

//var columns = {}

//columns[1] = {}
//columns[1]['blocks'] = ['blocktitle_1',1,2,62,'144_2',204,248,295] //remark: idx 144 produces 2 blocks, so you can use: '144_1' and '144_2' (or of course, just 144 if you want one)
//columns[1]['width'] = 5;

//columns[2] = {}
//columns[2]['blocks'] = ['currentweather_big','weather',5,'144_1']
//columns[2]['width'] = 5; 

//columns[3] = {}
//columns[3]['blocks'] = ['clock','sunrise','horizon','streamplayer',buttons.buienradar,buttons.radio,buttons.calendar,buttons.nunl,buttons.nzbget]
//columns[3]['width'] = 2;

//var columns_standby = {}
//columns_standby[1] = {}
//columns_standby[1]['blocks'] = ['clock','currentweather_big','weather']
//columns_standby[1]['width'] = 12;

//if you want to use multiple screens, use the code below:
//var screens = {}
//screens[1] = {}
//screens[1]['background'] = 'bg1.jpg';
//screens[1]['background_morning'] = 'bg_morning.jpg';
//screens[1]['background_noon'] = 'bg_noon.jpg';
//screens[1]['background_afternoon'] = 'bg_afternoon.jpg';
//screens[1]['background_night'] = 'bg_night.jpg';
//screens[1]['columns'] = [1,2,3]

//screens[2] = {}
//screens[2]['background'] = 'bg3.jpg';
//screens[2]['background_morning'] = 'bg_morning.jpg';
//screens[2]['background_noon'] = 'bg_noon.jpg';
//screens[2]['background_afternoon'] = 'bg_afternoon.jpg';
//screens[2]['background_night'] = 'bg_night.jpg';
//screens[2]['columns'] = [4,5,6]

