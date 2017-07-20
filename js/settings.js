var settingList = {}
settingList['general'] = {}
settingList['general']['title'] = 'General';

settingList['general']['domoticz_ip'] = {}
settingList['general']['domoticz_ip']['title'] = 'Domoticz URL';
settingList['general']['domoticz_ip']['type'] = 'text';

settingList['general']['app_title'] = {}
settingList['general']['app_title']['title'] = 'App title';
settingList['general']['app_title']['type'] = 'text';

settingList['general']['language'] = {}
settingList['general']['language']['title'] = 'Language';
settingList['general']['language']['type'] = 'select';
settingList['general']['language']['options'] = {};
settingList['general']['language']['options']['zh_CN'] = 'Chinese';
settingList['general']['language']['options']['nl_NL'] = 'Dutch';
settingList['general']['language']['options']['en_US'] = 'English';
settingList['general']['language']['options']['fr_FR'] = 'French';
settingList['general']['language']['options']['hu_HU'] = 'Hungarian';
settingList['general']['language']['options']['it_IT'] = 'Italian';
settingList['general']['language']['options']['pt_PT'] = 'Portugese';
settingList['general']['language']['options']['sv_SE'] = 'Swedish';

settingList['general']['hide_topbar'] = {}
settingList['general']['hide_topbar']['title'] = 'Hide topbar';
settingList['general']['hide_topbar']['type'] = 'checkbox';

settingList['general']['auto_positioning'] = {}
settingList['general']['auto_positioning']['title'] = 'Auto Positioning?';
settingList['general']['auto_positioning']['type'] = 'checkbox';
settingList['general']['auto_positioning']['help'] = 'Don\'t want to configure positions, use auto positioning';

settingList['general']['use_favorites'] = {}
settingList['general']['use_favorites']['title'] = 'Only use favorite devices';
settingList['general']['use_favorites']['type'] = 'checkbox';
settingList['general']['use_favorites']['help'] = 'Only used when using auto positioning';

settingList['general']['standby_after'] = {}
settingList['general']['standby_after']['title'] = 'Standby after (minutes, 0 = never)';
settingList['general']['standby_after']['type'] = 'text';

settingList['general']['domoticz_refresh'] = {}
settingList['general']['domoticz_refresh']['title'] = 'Refresh Domoticz (seconds)';
settingList['general']['domoticz_refresh']['type'] = 'text';

settingList['general']['dashticz_refresh'] = {}
settingList['general']['dashticz_refresh']['title'] = 'Refresh Dashticz (minutes)';
settingList['general']['dashticz_refresh']['type'] = 'text';

settingList['general']['auto_swipe_back_to'] = {}
settingList['general']['auto_swipe_back_to']['title'] = 'Auto swipe back to screen #';
settingList['general']['auto_swipe_back_to']['type'] = 'text';
settingList['general']['auto_swipe_back_to']['help'] = 'When no activity, swipe back to main screen after x seconds';

settingList['general']['auto_swipe_back_after'] = {}
settingList['general']['auto_swipe_back_after']['title'] = 'Auto swipe back after (seconds)';
settingList['general']['auto_swipe_back_after']['type'] = 'text';

settingList['general']['auto_slide_pages'] = {}
settingList['general']['auto_slide_pages']['title'] = 'Auto slide screens (seconds, 0=do not auto slide)';
settingList['general']['auto_slide_pages']['type'] = 'text';

settingList['general']['slide_effect'] = {}
settingList['general']['slide_effect']['title'] = 'Slide effect';
settingList['general']['slide_effect']['type'] = 'select';
settingList['general']['slide_effect']['options'] = {};
settingList['general']['slide_effect']['options']['slide'] = 'slide';
settingList['general']['slide_effect']['options']['fade'] = 'fade';
settingList['general']['slide_effect']['options']['cube'] = 'cube';
settingList['general']['slide_effect']['options']['coverflow'] = 'coverflow';
settingList['general']['slide_effect']['options']['flip'] = 'flip';

settingList['general']['selector_instead_of_buttons'] = {}
settingList['general']['selector_instead_of_buttons']['title'] = 'Selector instead of buttons';
settingList['general']['selector_instead_of_buttons']['type'] = 'checkbox';

settingList['general']['hide_mediaplayer'] = {}
settingList['general']['hide_mediaplayer']['title'] = 'Hide mediaplayer when it\'s off';
settingList['general']['hide_mediaplayer']['type'] = 'checkbox';

settingList['general']['use_fahrenheit'] = {}
settingList['general']['use_fahrenheit']['title'] = 'Use Fahrenheit instead of Celcius';
settingList['general']['use_fahrenheit']['type'] = 'checkbox';

settingList['general']['use_beaufort'] = {}
settingList['general']['use_beaufort']['title'] = 'Use Bft instead of m/s';
settingList['general']['use_beaufort']['type'] = 'checkbox';

settingList['clocks'] = {}
settingList['clocks']['title'] = 'Clocks';

settingList['clocks']['hide_seconds'] = {}
settingList['clocks']['hide_seconds']['title'] = 'Hide seconds';
settingList['clocks']['hide_seconds']['type'] = 'checkbox';

settingList['clocks']['hide_seconds_stationclock'] = {}
settingList['clocks']['hide_seconds_stationclock']['title'] = 'Hide seconds in StationClock';
settingList['clocks']['hide_seconds_stationclock']['type'] = 'checkbox';

settingList['clocks']['boss_stationclock'] = {}
settingList['clocks']['boss_stationclock']['title'] = 'StationClock Type';
settingList['clocks']['boss_stationclock']['type'] = 'text';

settingList['googlemaps'] = {}
settingList['googlemaps']['title'] = 'Google Maps';

settingList['googlemaps']['gm_api'] = {}
settingList['googlemaps']['gm_api']['title'] = 'API Key';
settingList['googlemaps']['gm_api']['type'] = 'text';

settingList['googlemaps']['gm_zoomlevel'] = {}
settingList['googlemaps']['gm_zoomlevel']['title'] = 'Zoom level';
settingList['googlemaps']['gm_zoomlevel']['type'] = 'text';

settingList['googlemaps']['gm_latitude'] = {}
settingList['googlemaps']['gm_latitude']['title'] = 'Latitude';
settingList['googlemaps']['gm_latitude']['type'] = 'text';

settingList['googlemaps']['gm_longitude'] = {}
settingList['googlemaps']['gm_longitude']['title'] = 'Longitude';
settingList['googlemaps']['gm_longitude']['type'] = 'text';


settingList['wunderground'] = {}
settingList['wunderground']['title'] = 'Wunderground';

settingList['wunderground']['wu_api'] = {}
settingList['wunderground']['wu_api']['title'] = 'API Key';
settingList['wunderground']['wu_api']['type'] = 'text';

settingList['wunderground']['wu_city'] = {}
settingList['wunderground']['wu_city']['title'] = 'Station (City or Code)';
settingList['wunderground']['wu_city']['type'] = 'text';

settingList['wunderground']['wu_name'] = {}
settingList['wunderground']['wu_name']['title'] = 'Display Name';
settingList['wunderground']['wu_name']['type'] = 'text';

settingList['wunderground']['wu_country'] = {}
settingList['wunderground']['wu_country']['title'] = 'Country';
settingList['wunderground']['wu_country']['type'] = 'text';


settingList['ziggo'] = {}
settingList['ziggo']['title'] = 'Ziggo/UPC Mediabox XL (Horizon)';

settingList['ziggo']['switch_horizon'] = {}
settingList['ziggo']['switch_horizon']['title'] = 'Path to switch_horizon.php';
settingList['ziggo']['switch_horizon']['type'] = 'text';
settingList['ziggo']['switch_horizon']['help'] = 'If you have a mediabox from ZIGGO or UPC (Horizon), copy switch_horizon.php on a webserver inside your network and change the IP (of Horizon) inside this file.';


settingList['spotify'] = {}
settingList['spotify']['title'] = 'Spotify';

settingList['spotify']['spot_clientid'] = {}
settingList['spotify']['spot_clientid']['title'] = 'ClientID';
settingList['spotify']['spot_clientid']['type'] = 'text';

var settings = {};
$.each(localStorage, function(key, value){
   if(key.substr(0,9)=='dashticz_') settings[key.substr(9)] = value;
});

if(typeof(settings['language'])=='undefined') settings['language'] = 'en_US';
if(typeof(settings['domoticz_ip'])=='undefined') settings['domoticz_ip'] = 'http://192.168.1.10:8080';
if(typeof(settings['app_title'])=='undefined') settings['app_title'] = 'Dashticz';
if(typeof(settings['domoticz_refresh'])=='undefined') settings['domoticz_refresh'] = 5;
if(typeof(settings['dashticz_refresh'])=='undefined') settings['dashticz_refresh'] = 60;
if(typeof(settings['wu_country'])=='undefined') settings['wu_country'] = 'NL';
if(typeof(settings['wu_city'])=='undefined') settings['wu_city'] = 'Amsterdam';
if(typeof(settings['boss_stationclock'])=='undefined') settings['boss_stationclock'] = 'RedBoss';
if(typeof(settings['use_fahrenheit'])=='undefined' || settings['use_fahrenheit']==0) settings['use_fahrenheit'] = false;
if(typeof(settings['use_beaufort'])=='undefined' || settings['use_beaufort']==0) settings['use_beaufort'] = false;
if(typeof(settings['hide_topbar'])=='undefined' || settings['hide_topbar']==0) settings['hide_topbar'] = false;
if(typeof(settings['slide_effect'])=='undefined') settings['slide_effect'] = 'slide';
if(typeof(settings['hide_mediaplayer'])=='undefined' || settings['hide_mediaplayer']==0) settings['hide_mediaplayer'] = false;
if(typeof(settings['auto_swipe_back_to'])=='undefined') settings['auto_swipe_back_to'] = 1;
if(typeof(settings['auto_swipe_back_after'])=='undefined') settings['auto_swipe_back_after'] = 10;
if(typeof(settings['standby_after'])=='undefined' || settings['standby_after']==0) settings['standby_after'] = false;
if(typeof(settings['selector_instead_of_buttons'])=='undefined' || settings['selector_instead_of_buttons']==0) settings['selector_instead_of_buttons'] = false;

var _TEMP_SYMBOL = '°C';
if(settings['use_fahrenheit']) _TEMP_SYMBOL = '°F';

$(document).ready(function(){
	if(typeof(settings['dashticz_domoticz_ip'])=='undefined'){
		$('.settingsicon').click('click');
	}
	var html = '<div class="modal fade" id="settings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	  html+='<div class="modal-dialog">';
		html+='<div class="modal-content">';
		  html+='<div class="modal-header">';
			html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		  html+='</div>';
		  html+='<div class="modal-body">';
			html+='<div class="row">';
		  	  for(b in settingList){
			  
				  html+='<div class="col-md-6 col-xs-12"><h4 style="margin:0px 0px 7px -1px;">'+settingList[b]['title']+'</h4>';
				  
				  for(s in settingList[b]){
					  if(s!=='title'){
							html+='<div class="row"><div class="col-xs-5" style="margin-bottom:1px;"><label style="margin-top: 6px;font-size: 12px;">'+settingList[b][s]['title']+'</label></div>';
							html+='<div class="col-xs-7" style="margin-bottom:1px;">';
							var val='';
							if(typeof(settings[s])!=='undefined') val=settings[s];
							if(settingList[b][s]['type']=='text') html+='<div><input class="form-control" type="text" name="'+s+'" value="'+val+'" style="max-width:95%;" /></div>';
							if(settingList[b][s]['type']=='checkbox'){
								var sel='';
								if(settings[s]==1) sel='checked';
								html+='<div class="material-switch pull-left"><input type="checkbox" id="'+s+'" name="'+s+'" value="1" '+sel+' style="margin-top:11px;" /><label for="'+s+'" class="label-success"></label></div>';
							}
							if(settingList[b][s]['type']=='select'){
								html+='<select name="'+s+'" class="form-control" style="max-width:95%;padding-left: 8px;color: #555 !important;">';
									html+='<option value=""></option>';
									for(o in settingList[b][s]['options']){
										var sel='';
										if(settings[s]==o) sel='selected';
										html+='<option value="'+o+'" '+sel+'>'+settingList[b][s]['options'][o]+'</option>';
									}
								html+='</select>';
							}
						  html+='</div></div>';
					  }
				  }
				  
				  html+='<br /><br /></div>';
			  }
			html+='</div>';
		  html+='<div class="text-right"><button onClick="saveSettings();" style="font-size: 16px;margin-right: 20px;margin-top: 30px;">Opslaan</button></div></div>';
		html+='</div>';
	  html+='</div>';
	html+='</div>';
	$('body').append(html);

});

function saveSettings(){
	if (typeof(Storage) !== "undefined") {
		$('div#settings input[type="text"],div#settings select').each(function(){
			localStorage.setItem('dashticz_'+$(this).attr('name'), $(this).val());
		});
		
		$('div#settings input[type="checkbox"]').each(function(){
			if($(this).is(':checked')) localStorage.setItem('dashticz_'+$(this).attr('name'), $(this).val());
			else localStorage.setItem('dashticz_'+$(this).attr('name'), 0);
		});
		
		document.location.href=document.location.href;
	}
	else {
		alert('Oh no, LocalStorage is not supported in your browser!');
	}
}