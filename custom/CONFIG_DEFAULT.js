
var _LANGUAGE 				= 'nl_NL'; //or: en_US, fr_FR, hu_HU
var _HOST_DOMOTICZ		  	= 'http://192.168.1.3:8084';
var _DOMOTICZ_REFRESH		= 5; //in seconds
var _DASHTICZ_REFRESH		= 30; //in minutes
var _THEME 					= 'default'; // default = dashticz default theme
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

var _SLIDE_PAGES			= false; //Loop all pages and change page every x (min. 5) seconds, set _AUTO_SWIPEBACK_TIME = 0
