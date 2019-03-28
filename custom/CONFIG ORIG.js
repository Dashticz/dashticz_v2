
var config = {}
config['domoticz_ip'] = 'http://192.168.178.18:8080';
config['user_name'] = '';
config['pass_word'] = '';
config['app_title'] = 'Dashticz';
config['room_plan'] = '3';
config['domoticz_refresh'] = '500';
config['dashticz_refresh'] = '3000';
config['default_news_url'] = 'http://www.nu.nl/rss/Algemeen';
config['news_scroll_after'] = '7';
config['default_cors_url'] = '';
config['dashticz_php_path'] = './vendor/dashticz/';
config['standby_call_url'] = '';
config['standby_call_url_on_end'] = '';
config['theme'] = 'default';
config['background_image'] = 'img/bg2.jpg';
config['standby_after'] = '100';
config['auto_swipe_back_to'] = '1';
config['auto_swipe_back_after'] = '1000';
config['auto_slide_pages'] = '0';
config['slide_effect'] = 'slide';
config['standard_graph'] = 'month';
config['blink_color'] = '255, 255, 255, 1';
config['language'] = 'nl_NL';
config['timeformat'] = 'DD-MM-YY HH:mm';
config['calendarformat'] = 'dd DD.MM HH:mm';
config['calendarlanguage'] = 'nl_NL';
config['calendarurl'] = 'https://www.venlo.nl/trash-removal-calendar/ical/5912TN/3';
config['boss_stationclock'] = 'RedBoss';
config['gm_api'] = '';
config['gm_zoomlevel'] = '0';
config['gm_latitude'] = '0';
config['gm_longitude'] = '0';
config['speak_lang'] = 'en-US';
config['wu_api'] = '5946f47f6340e5c3';
config['wu_city'] = 'Amsterdam';
config['wu_name'] = '';
config['wu_country'] = 'NL';
config['owm_api'] = '6c4bd2526cc4b8ed811ddfead1a557b9';
config['owm_city'] = 'Mainaschaff';
config['owm_name'] = '';
config['owm_country'] = 'de';
config['owm_lang'] = 'nl';
config['owm_cnt'] = '3';
config['owm_min'] = true;
config['owm_days'] = 1;
config['idx_moonpicture'] = '0';
config['longfonds_zipcode'] = '5912TN';
config['longfonds_housenumber'] = '3';
config['switch_horizon'] = '0';
config['host_nzbget'] = '';
config['spot_clientid'] = '0637a7acd48d4350a5b1b990a4bc055f';
config['sonarr_url'] = '';
config['sonarr_apikey'] = '';
config['sonarr_maxitems'] = '';
config['google_api_key'] = '';
config['loginEnabled'] = 0;
config['disable_update_check'] = 0;
config['no_rgb'] = 0;
config['auto_positioning'] = 1;
config['use_favorites'] = 0;
config['disable_googleanalytics'] = 1;
config['last_update'] = 1;
config['hide_topbar'] = 0;
config['security_button_icons'] = 0;
config['edit_mode'] = 0;
config['hide_seconds'] = 1;
config['hide_seconds_stationclock'] = 0;
config['use_fahrenheit'] = 0;
config['use_beaufort'] = 0;
config['translate_windspeed'] = 1;
config['static_weathericons'] = 0;
config['hide_mediaplayer'] = 0;
/*
config['garbage_company'] = 'mijnafvalwijzer';
config['garbage_icalurl'] = '';
config['garbage_calendar_id'] = '';
config['garbage_zipcode'] = '3842CR';
config['garbage_street'] = '';
config['garbage_housenumber'] = '1';
config['garbage_housenumberadd'] = '';
config['garbage_maxitems'] = '12';
config['garbage_width'] = '12';
config['garbage_hideicon'] = 0;
config['garbage_icon_use_colors'] = 1;
config['garbage_use_colors'] = 1;
config['garbage_use_names'] = 1;
config['garbage_use_cors_prefix'] = 1;

config['garbage'] = {
gft: {kliko: 'green', code: '#32cd32', name: 'GFT', icon: 'img/garbage/kliko_green.png'},
pmd: {kliko: 'orange', code: '#F1C300', name: 'Plastic', icon: 'img/garbage/kliko_orange.png'},
rest: {kliko: 'grey', code: '#ffffff', name: 'Restafval', icon: 'img/garbage/kliko_grey.png'},
papier: {kliko: 'blue', code: '#38c7ff', name: 'Papier', icon: 'img/garbage/kliko_blue.png'},
kca: {kliko: 'red', code: '#b21807', name: 'Chemisch afval', icon: 'img/garbage/kliko_red.png'},
brown: {kliko: 'brown', code: '#7c3607', name: 'Bruin', icon: 'img/garbage/kliko_brown.png'},
black: {kliko: 'black', code: '#000000', name: 'Zwart', icon: 'img/garbage/kliko_black.png'},
milieu: {kliko: 'yellow', code: '#f9e231', name: 'Geel', icon: 'img/garbage/kliko_yellow.png'},
kerstboom: {kliko: 'green', code: '#375b23', name: 'Kerstboom', icon: 'img/garbage/tree.png'},
};

/*
      gft: ['gft', 'tuin', 'refuse bin', 'green', 'groen', 'Biodégradables', 'snoei'],
      pmd: ['plastic', 'pmd', 'verpakking', 'kunststof', 'valorlux'],
      rest: ['restafval'],
      papier: ['papier', 'blauw', 'blue', 'recycling bin collection'],
      kca: ['chemisch', 'kca','kga'],
      brown: ['brown', 'verre'],
      black: ['black', 'zwart'],
      milieu: ['milieu'],
      kerstboom: ['kerst'],
  };
  */

  config['garbage_company'] = 'ical';
  config['garbage_icalurl'] = 'https://calendar.google.com/calendar/ical/afvaltwist%40gmail.com/public/basic.ics';
  config['garbage_maxitems'] = '12';
  config['garbage_width'] = '12';
  config['garbage_hideicon'] = 0;
  config['garbage_use_names'] = true;
  config['garbage_use_colors'] = true;
  config['garbage_icon_use_colors'] = true;
  config['garbage_use_cors_prefix'] = true;
  config['garbage_mapping'] = {
    rest: ['Rest'],
    gelb: ['Gelber'],
    bio: ['Bio'],
    papier: ['Papier']
  }
  config['garbage'] = {
  //gft: {kliko: 'green', code: '#375b23', name: 'GFT', icon: 'img/garbage/kliko_green.png'},
  //pmd: {kliko: 'orange', code: '#db5518', name: 'PMD', icon: 'img/garbage/kliko_orange.png'},
  //Restabfallbehaelter: {kliko: 'grey', code: '#5e5d5c', name: 'Restafval', icon: 'img/garbage/kliko_grey.png'},
  //papier: {kliko: 'blue', code: '#153477', name: 'Papier', icon: 'img/garbage/kliko_blue.png'},
  //kca: {kliko: 'red', code: '#b21807', name: 'Chemisch afval', icon: 'img/garbage/kliko_red.png'},
  //brown: {kliko: 'brown', code: '#7c3607', name: 'Bruin', icon: 'img/garbage/kliko_brown.png'},
  //black: {kliko: 'black', code: '#000000', name: 'Zwart', icon: 'img/garbage/kliko_black.png'},
  //kerstboom: {kliko: 'green', code: '#375b23', name: 'Kerstboom', icon: 'img/garbage/tree.png'},
  rest: {kliko: 'black', code: '#000000', name: 'Restabfall', icon: 'img/garbage/kliko_black.png'},
  gelb: {kliko: 'yellow', code: '#f9e231', name: 'Gelber Sack', icon: 'img/garbage/kliko_yellow.png'},
  bio: {kliko: 'green', code: '#375b23', name: 'Bio', icon: 'img/garbage/kliko_green.png'},
  papier: {kliko: 'blue', code: '#153477', name: 'Papier', icon: 'img/garbage/kliko_blue.png'},
  };  




//tmpconfig['owm_api'] = '6c4bd2526cc4b8ed811ddfead1a557b9';
//tmpconfig['owm_city'] = 'Venlo';
//tmpconfig['owm_name'] = 'Venlo';
//tmpconfig['owm_country'] = 'NL';






/*
// iCalendar Plugin, supports all .ics calendar types like Google Calendar, Apple Calendar
var _ICALENDAR_URL			= 'https://www.venlo.nl/trash-removal-calendar/ical/5912TN/3';//'https://testurl.com/ical.ics'; //supports .ics type calendars (Google Calendar, Apple Calendar etc.)
//var _ICALENDAR_DATEFORMAT	= 'friendly'; //'friendly', 'MM.DD.YYYY HH:mm', 'DD.MM.YYYY HH:mm', 'YYYY.MM.DD HH:mm'
var _ICALENDAR_DATEFORMAT	= 'DD-MM HH:mm';
var _ICALENDAR_LOCALE		= 'nl'; //en,hu, etc.
*/

//Buttons or images to open webpages in an iframe, like a news website or weather forecast
var buttons = {}
//buttons.buienradar = {width:12, isimage:true, refreshimage:300000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=360&h=300', url: 'http://www.weeronline.nl/Europa/Nederland/Venlo/4058117'}
//buttons.buienradar = {width:12, isimage:true, refreshimage:300000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=360&h=300', url: 'https://www.buienradar.nl'}
//buttons.buienradar = {width:12, isimage:true, refresh:3000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=360&h=300'}
//buttons.radio = {width:12, image: 'img/radio_on.png', title: 'Radio', url: 'http://nederland.fm'}
//buttons.nunl = {width:12, icon: 'fa-newspaper-o', title: 'Nu.nl', url: 'http://www.nu.nl'}
//buttons.afval = {width:12, url: 'https://crossorigin.me/https://www.venlo.nl/trash-removal-calendar/5912TN/3'}
//buttons.winter = {width:6, isimage:true, refreshimage:60000, image: 'https://www.sneeuwhoogte.nl/sneeuwhoogte-op-je-site/la plagne/big', url: 'https://www.sneeuwhoogte.nl/wintersport/frankrijk/savoie/paradiski/la%20plagne'}
//buttons.cam = {width:12, isimage:true, refreshimage:900000, image: 'http://www.trinum.com/ibox/ftpcam/mega_Peisey-Vallandry_vanoise-expresse.jpg', url: 'http://m.webcam-hd.com/webcam-station-la-plagne/grande-rochette'}
//CUSTOM POSITIONING:
//defining wich blocks to show, de numbers represents the IDX of the device in Domoticz
//only define if you want to use a custom width instead of the default

var blocks = {}

blocks[123] = {} //lamps virtual switch
blocks[123]['title'] = 'Lampen'
blocks[123]['width'] = 2
blocks[123]['hide_data'] = true

blocks[545] = {} //Spotify selector
blocks[545]['title'] = 'Spotif'
blocks[545]['width'] = 12
blocks[545]['hide_data'] = true

blocks[125] = {} //TV virtual switch
blocks[125]['width'] = 6
blocks[125]['icon'] = 'fas fa-tv'
blocks[125]['hide_data'] = true

blocks[120] = {}
blocks[120]['title'] = 'Kamer midden'
blocks[120]['width'] = 2
//blocks[120]['icon'] = 'fas fa-lightbulb'
blocks[120]['icon'] = 'fas fa-tv'
blocks[120]['hide_data'] = true

blocks[121] = {}
blocks[121]['title'] = 'Kamer links'
blocks[121]['width'] = 2
blocks[121]['icon'] = 'fas fa-lightbulb'
blocks[121]['hide_data'] = true
blocks[121]['flash'] = 100;


blocks[122] = {}
blocks[122]['title'] = 'Kamer rechts'
blocks[122]['width'] = 2
blocks[122]['icon'] = 'fas fa-lightbulb'
blocks[122]['hide_data'] = true

blocks[373] = {}
blocks[373]['title'] = 'Buffet kast'
blocks[373]['width'] = 6
blocks[373]['icon'] = 'fas fa-lightbulb'
blocks[373]['hide_data'] = true
//blocks[373]['flash'] = 1000;


blocks[379] = {}
blocks[379]['title'] = 'Aanrecht'
blocks[379]['width'] = 12
blocks[379]['icon'] = 'fas fa-lightbulb'
blocks[379]['hide_data'] = true


blocks[372] = {}
blocks[372]['title'] = 'Kerstboom'
blocks[372]['width'] = 6
blocks[372]['icon'] = 'fas fa-tree'
blocks[372]['hide_data'] = true

blocks[107] = {}
blocks[107]['title'] = 'IJspegels achter'
blocks[107]['width'] = 6
blocks[107]['icon'] = 'fas fa-lightbulb'
blocks[107]['hide_data'] = true
blocks[107]['flash'] = 1000;
blocks[107]['openpopup'] = { url: './hallo.html', auto_close : 500, frameheight:200};

blocks[381] = {
  title: 'Keuken tafel',
  width: 12,
  icon: 'fas fa-lightbulb',
  hide_data: true,
  flash:1000,
  MaxDimLevel: 84
}

blocks[382] = {
  title: 'Keuken spots',
  width: 12,
  icon: 'fas fa-lightbulb',
  hide_data: true,
  clickslide : 2,
  MinDimLevel : 16,
  MaxDimLevel: 84
}
/*
blocks[382]['title'] = 'Keuken spots'
blocks[382]['width'] = 6
blocks[382]['icon'] = 'fas fa-lightbulb'
blocks[382]['hide_data'] = true
*/


blocks[374] = {}
blocks[374]['title'] = 'Disco!'
blocks[374]['width'] = 6
blocks[374]['icon'] = 'fas fa-lightbulb'
blocks[374]['hide_data'] = true



blocks[41] = {}  //Afzuiging
blocks[41]['title'] = 'Afzuiging'
blocks[41]['width'] = 6
blocks[41]['image'] = 'fan_on.png';
blocks[41]['hide_data'] = true

blocks[6] = {}
blocks[6]['width'] = 12

blocks['6_1'] = {}
blocks['6_1']['image'] = 'bulb_off.png';
blocks['6_1'][ 'width'] = 4

blocks['46'] = {}
blocks['46']['width'] = 6

blocks['blocktitle_1'] = {}
blocks['blocktitle_1']['type'] = 'blocktitle';
blocks['blocktitle_1']['title'] = 'Schakelaars';

blocks['s2'] = {}  //Bedtime scene
blocks['s2']['title'] = 'Bed time'
blocks['s2']['width'] = 2
blocks['s2']['image'] = 'sleep.png'
blocks['s2']['show_lastupdate'] = false
blocks['s2']['hide_data'] = true
//blocks['s2']['speak'] = 'Good night, sweet dreams.'

blocks['s3'] = {}  //Kerst scene
blocks['s3']['title'] = 'Kerst'
blocks['s3']['width'] = 12
blocks['s3']['image'] = 'sleep.png'
blocks['s3']['show_lastupdate'] = false
blocks['s3']['hide_data'] = true

blocks['v1'] = {}
blocks['v1']['title'] = 'Var 1'
blocks['v2'] = {}
blocks['v4'] = {};
blocks[ 'v4'] = { width: 8, title:'custom title'};
//blocks['v1']['title'] = 'Var 1'

//blocks['141'] = {}  //Bedtime scene
//blocks['141']['title'] = 'Vancouver'
//blocks['141']['width'] = 4
//blocks['141']['image'] = 'sleep.png'
//blocks['141']['show_lastupdate'] = false
//blocks['141']['hide_data'] = true

blocks[412] = {}  //stocks day
blocks[412]['width'] = 12
/*
blocks[412]['title'] = 'Stocks'
blocks[412]['icon'] = 'fas fa-chart-line'
blocks[412]['show_lastupdate'] = false
blocks[412]['hide_data'] = false
*/

blocks[25] = {}
blocks[25]['width'] = 4

blocks[53] = {}
blocks[53]['width'] = 12
blocks[53]['last_update'] = true
blocks[53]['hide_data'] = true
blocks[53]['switch'] = false;


blocks[545] = {}; //spotify selector
//blocks[545]['title'] = 'On/off';
blocks[545]['width'] = 12
blocks[545]['switch'] = true;


blocks[57] = {}
blocks[57]['width'] = 12
blocks[57]['switch'] = true;

blocks[56] = {}
blocks[56] = {width:6, switch:true, frameheight:200, framewidth:400};
//blocks[56]['width'] = 6
//blocks[56]['switch'] = true;

blocks[644] = {}
//blocks['weather']['width'] = 6

blocks[690] = {  
  width:12,
  hide_stop: false
}

blocks[691] = {  
  width:12
}

blocks[25] = {
  width:12
}

blocks[659] = {
//  single_block: true,
  width:12
}
blocks['659_1'] = {
}

blocks['graph_659'] = {
  graphTypes: ['ba']
}
var tvguide = {}
tvguide.dutch = { key:'dutch', icon: '', width:12, channels: [1,2,3,4,31,46,92], maxitems: 10 }
//tvguide.dutch = { key:'dutch', width:12, channels: [1,2,3,4,31,46,92], maxitems: 10 }

//example station id: station-eindhoven
var publictransport = {}
//publictransport.ovinfo= { station: 'station-venlo', title:'OV Info', show_lastupdate:true, provider: '9292', icon: 'train', results: 5 };
//publictransport.ovinfotrain= { station: 'station-venlo', title:'Bus', show_lastupdate:true, provider: '9292-bus', icon: 'bus', results: 5 };
//publictransport.ovinfobus= { station: 'station-venlo', title:'Trein', show_lastupdate:true, provider: '9292-train', icon: 'train', results: 5 };
publictransport.ovinfotrain = { show_via: true, station: 'station-den-haag-centraal', title:'NS-Den Haag centraal', provider: '9292-train', show_lastupdate:true, icon: 'train', width: 5, results: 6 };
publictransport.ovinfotram = { show_via: true, station: 'rijswijk-zh/tramhalte-aletta-jacobsstraat', provider: '9292-tram-bus', show_lastupdate:true, icon: 'bus', width:5, results: 6 };



////////////////////// FRAMES ///////////////////////////
var frames = {}
frames.weather = {refreshiframe:1000,height:230,frameurl:"//forecast.io/embed/#lat=49.2624&lon=-123.1155&name=Vancouver&color=#00aaff&font=Helvetica&fontColor=#ffffff&units=si&text-color=#fff&",width:12}
frames.weathervenlo = {refreshiframe:1000,height:230,frameurl:"//forecast.io/embed/#lat=51.3769&lon=6.1495&name=Venlo&color=#00aaff&font=Helvetica&fontcolor=#ffffff&units=si&text-color=#fff&",width:12}
frames.buienradar1 = {refreshiframe:1000, width:12, height:550, frameurl:"https://gadgets.buienradar.nl/gadget/zoommap/?lat=52.05036&lng=4.37942&overname=2&zoom=8&naam=2496HX&size=2b&voor=1"}
frames.video = { frameurl: 'https://www.nu.nl/videos'};
frames.cal = { frameurl: 'https://calendar.google.com/calendar/embed?src=slokerse%40gmail.com&ctz=Europe%2FAmsterdam'}

//frames.weather = {refreshiframe:10000,height:230,frameurl:"//darksky.net/widget/default/49.282729,-123.120738/ca12/nl.js?width=100%&height=350&title=Vancouver&textColor=333333&bgColor=FFFFFF&transparency=false&skyColor=333333&fontFamily=Default&customFont=&units=ca&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes",width:12}

var calendars = {}
//calendars.afval = {title:'Afval', icalurl:'https://crossorigin.me/https://www.venlo.nl/trash-removal-calendar/ical/5912TN/3'}
calendars.afval = {maxitems:4, icalurl:'https://inzamelschema.rmn.nl/ical/0356200000014977'} //custom/ical/Afvalkalender.ic'}
calendars.private = { maxitems: 5, url: 'https://www.formula1.com/sp/static/f1/2018/calendar/ical.ics', icalurl: 'https://www.formula1.com/sp/static/f1/2018/calendar/ical.ics' }
calendars.me = { maxitems: 10,
  icon:'far fa-lightbulb',
  icalurl: 'https://calendar.google.com/calendar/ical/slokerse%40gmail.com/private-5045b31db6a73abcfeab887b93c7f0ba/basic.ics',
  url: 'https://calendar.google.com/calendar/ical/slokerse%40gmail.com/private-5045b31db6a73abcfeab887b93c7f0ba/basic.ics'
}
calendars.lok = { maxitems: 10,  icalurl: 'https://calendar.google.com/calendar/ical/slokerse%40gmail.com/public/basic.ics' }
calendars.peter = {maxitems:4, icalurl:'https://inzamelschema.rmn.nl/ical/0356200000014977'} 
calendars.file = {maxitems:4, icalurl:'/home/lokies/Downloads/mycalendar.ics'}
//calendars.private = { maxitems: 5, icalurl: '/home/lokies/dev/dashticz_v2/custom/ical.ics' }


//blocks['news_1']={}
//blocks['news_1']['feed']='https://cors-anywhere.herokuapp.com/http://www.nu.nl/rss/Algemeen';
//blocks['news_1']['feed']='http://www.nu.nl/rss/Algemeen';
//blocks['news_1']['feed']='http://www.nu.nl/rss/Algemeen';
blocks['news_4'] = {}
blocks['news_4']['feed'] = 'http://feeds.feedburner.com/tweakers/nieuws';

//buttons.nunl = {key: 'nunl', width:12, icon: 'fa-newspaper-o', title: 'Nu.nl', newwindow:true, url: 'http://www.nu.nl'}
buttons.nunl = {key: 'nunl', width:12, icon: 'fa-newspaper-o', title: 'Nu.nl', url: 'http://192.168.178.18/'}
buttons.nos = {key: 'nos', width:12, icon: 'fa-newspaper-o', title: 'Nos', url: 'http://www.nos.nl', closebutton:false}
//buttons.nos = {key: 'nos', width:12, icon: 'fa-newspaper-o', title: 'Nos', url: 'http://www.nos.nl', closebutton:false}
buttons.buienradar	= { key: 'buienradar', width:12, isimage:true, refresh:30000,
      refreshiframe:6000, forcerefresh:1,
      image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=256&h=256',
      url:'https://gadgets.buienradar.nl/gadget/zoommap/?lat=52.06022&lng=4.39288&overname=2&zoom=13&naam=2496hx&size=5&voor=1', framewidth:580, frameheight: 520, closebutton:false};
//buttons.buienradar	= { key: 'buienradar', width:12, isimage:true, refresh:6000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=256&h=256', url:'https://gadgets.buienradar.nl/gadget/zoommap/?lat=52.06022&lng=4.39288&overname=2&zoom=13&naam=2496hx&size=5&voor=1'}
buttons.moon = {width:12, isimage:true, refreshimage:60000, image: 'moon'}
buttons.page1 = { width:12, key:'first', title:'page 1', slide:1};
buttons.page2 = { width:12, title:'page 2', slide:2};
buttons.page3 = { width:12, title:'page 3', slide:3};
buttons.calendar = {title: 'My Calendar', url: 'https://calendar.google.com/calendar/embed?src=slokerse%40gmail.com&ctz=Europe%2FAmsterdam'}
buttons.yr = {
			key:'yr',
			width:12, isimage:true, refreshimage:60000,forcerefresh: 0,
			image: 'https://www.yr.no/sted/Norge/Oppland/%C3%98ystre_Slidre/Beito/advanced_meteogram.png',
			url: 'https://www.yr.no/sted/Norge/Oppland/%C3%98ystre_Slidre/Beito/langtidsvarsel.html'
			};

blocks['longfonds'] = {};
blocks['longfonds']['width'] = 4;

var _STREAMPLAYER_TRACKS     = [
   {"track":1,"name":"Q-music","file":"http://icecast-qmusic.cdp.triple-it.nl/Qmusic_nl_live_96.mp3"},
   {"track":2,"name":"538 Hitzone","file":"http://vip-icecast.538.lw.triple-it.nl/WEB11_MP3"},
   {"track":3,"name":"Slam! NonStop","file":"http://stream.radiocorp.nl/web10_mp3"},
   {"track":4,"name":"100%NL","file":"http://stream.100p.nl/100pctnl.mp3"},
   {"track":5,"name":"StuBru","file":"http://mp3.streampower.be/stubru-high.mp3"},
   {"track":6,"name":"NPO Radio 1","file":"http://icecast.omroep.nl/radio1-bb-mp3"},
   {"track":7,"name":"Omroep Brabant","file":"http://streaming.omroepbrabant.nl/mp3"},
];
/**/
var columns = {}

columns['menu'] = {}
columns['menu']['blocks'] = [
  buttons.page1, buttons.page2, buttons.page3
]

columns['menu'].width = 1;
columns[1] = {}
//columns[1]['blocks'] = ['news'] //remark: idx 144 produces 2 blocks, so you can use: '144_1' and '144_2' (or of course, just 144 if you want one)
//columns[1]['blocks'] = [buttons.buienradar, 'currentweather_big','weather' ]
//columns[1]['blocks'] = [buttons.buienradar,'news' ]
//columns[1]['blocks'] =  ['currentweather_big_owm','weather_owm',tvguide.dutch, 'traffic', frames.weathervenlo, frames.weather,'news']
columns[1]['blocks'] =  [
//  'chromecast',
//  659,
  buttons.calendar,
  calendars.me,
  tvguide.dutch,
//  calendars.peter,
//  'news_4',
//  publictransport.ovinfotrain,
//  publictransport.ovinfotram,
//   publictransport.ovinfobus, publictransport.ovinfotrain,
//'longfonds',
//644,
//buttons.test,
//calendars.me,
//buttons.nunl,
//'flipclock',
//buttons.moon,
//buttons.nos,
buttons.buienradar,
//  frames.weacthervenlo,
//tvguide.dutch,
//'traffic',
'news'
]
//columns[1]['blocks'] = ['currentweather_big_owm','weather_owm']
//columns[1]['blocks'] = ['currentweather_big', 'weather', 'news']
columns[1]['width'] = 5;

columns[2] = {}
columns[2]['blocks'] = [
  'garbage',
  659,
//  '659_1',
//  '659_3',
  382,
  '691_1',
//  'graph_691',
  690,
  25,
//  buttons.yr,
  buttons.moon,
//columns[2]['blocks'] = ['currentweather_big','weather','6_1','46_1', calendars.afval]
//columns[2]['blocks'] = ['currentweather_big','weather','graph_6','graph_46']
//columns[2]['blocks'] = [25, 's2','spotify', calendars.afval]
//columns[2]['blocks'] = [25, 's2','news', 'spotify', calendars.afval]
//columns[2]['blocks'] = [123, 's2','s3',125,25, 374,'news', calendars.afval, buttons.winter, 41]
//columns[2]['blocks'] = [123, 's2','s3',125,25, 374,'news', calendars.afval, frames.weather, 41]
//columns[2]['blocks'] = [123, 's2','s3',125,25, 374, frames.weathervenlo, frames.weather, 41]
//columns[2]['blocks'] = [buttons.buienradar, 123,'s2', 's3', 412, calendars.afval]
//  buttons.buienradar,
//  frames.buienradar1,
//  'spotify',
//calendars.me,
//calendars.lok,
//calendars.private,
//412, 545,'garbage',
calendars.me,
calendars.file,
//'spotify',
//frames.cal,
buttons.calendar
]
//columns[2]['blocks'] = [123,'s2', 's3']
//columns[2]['blocks'] = [ 123,'s2', 's3']
columns[2]['width'] = 3;

columns[3] = {}
//columns[3]['blocks'] = [545, 122,121,120,372, 373, 379, 381, 382, 107]
//columns[3]['blocks'] = [ 'spotify', 121,120, 379, 381, 382, , 373, 107]
columns[3]['blocks'] = [ 'v4', 53, calendars.afval, calendars.private, 123,'s2', 121, 'v1', 'v2', 381, 379,  382, , 373, 107, 56,27]
//columns[3]['blocks'] = [  123,'s2', 121,120 , 373, 107,27]
//columns[3]['blocks'] = [ 545, 121,120, 379, 381, 382, 373, 107]
columns[3]['width'] = 4;

columns[4] = {}
columns[4]['blocks'] = ['6_1', 'graph_6']
columns[4]['width'] = 6;

columns[5] = {}
//columns[5]['blocks'] = ['graph_46']
columns[5]['width'] = 4;
columns[5]['blocks'] = [
//  'weather', 'currentweather_big',
  'log',
  'currentweather_big_owm',
  'weather_owm' 
]
/**/

var columns_standby = {}
columns_standby[1] = {}
columns_standby[1]['blocks'] = ['clock','123']
columns_standby[1]['width'] = 12;


//if you want to use multiple screens, use the code below:
var screens = {}
/*
screens[1] = {}
screens[1]['background'] = 'bg2.jpg';
//screens[1]['columns'] = [1,2,3]
screens[1]['columns'] = ['menu', 1,2]
*/
screens[1] = {
  background: 'bg2.jpg',
  columns: ['menu', 1,2]  
}


screens[2] = {}
screens[2]['background'] = 'bg2.jpg';
//screens[2]['columns'] = ['menu', 4,5]
screens[2]['columns'] = ['menu', 3,4]
screens[3] = {}
screens[3]['columns'] = ['menu', 5]
