var settingList = {}
settingList['general'] = {}
settingList['general']['title'] = 'General';

settingList['general']['domoticz_ip'] = {}
settingList['general']['domoticz_ip']['title'] = 'Domoticz URL';
settingList['general']['domoticz_ip']['type'] = 'text';

settingList['general']['app_title'] = {}
settingList['general']['app_title']['title'] = 'App title';
settingList['general']['app_title']['type'] = 'text';

settingList['general']['selector_instead_of_buttons'] = {}
settingList['general']['selector_instead_of_buttons']['title'] = 'Selector instead of buttons';
settingList['general']['selector_instead_of_buttons']['type'] = 'checkbox';

settingList['general']['use_favorites'] = {}
settingList['general']['use_favorites']['title'] = 'Only use favorite devices';
settingList['general']['use_favorites']['type'] = 'checkbox';
settingList['general']['use_favorites']['help'] = 'Only used when using auto positioning';

settingList['general']['domoticz_refresh'] = {}
settingList['general']['domoticz_refresh']['title'] = 'Refresh Domoticz (seconds)';
settingList['general']['domoticz_refresh']['type'] = 'text';

settingList['general']['dashticz_refresh'] = {}
settingList['general']['dashticz_refresh']['title'] = 'Refresh Dashticz (minutes)';
settingList['general']['dashticz_refresh']['type'] = 'text';

settingList['screen'] = {}
settingList['screen']['title'] = 'Screen';

settingList['screen']['hide_topbar'] = {}
settingList['screen']['hide_topbar']['title'] = 'Hide topbar';
settingList['screen']['hide_topbar']['type'] = 'checkbox';

settingList['screen']['auto_positioning'] = {}
settingList['screen']['auto_positioning']['title'] = 'Auto Positioning?';
settingList['screen']['auto_positioning']['type'] = 'checkbox';
settingList['screen']['auto_positioning']['help'] = 'Don\'t want to configure positions, use auto positioning';

settingList['screen']['standby_after'] = {}
settingList['screen']['standby_after']['title'] = 'Standby after (minutes, 0 = never)';
settingList['screen']['standby_after']['type'] = 'text';

settingList['screen']['auto_swipe_back_to'] = {}
settingList['screen']['auto_swipe_back_to']['title'] = 'Auto swipe back to screen #';
settingList['screen']['auto_swipe_back_to']['type'] = 'text';
settingList['screen']['auto_swipe_back_to']['help'] = 'When no activity, swipe back to main screen after x seconds';

settingList['screen']['auto_swipe_back_after'] = {}
settingList['screen']['auto_swipe_back_after']['title'] = 'Auto swipe back after (seconds)';
settingList['screen']['auto_swipe_back_after']['type'] = 'text';

settingList['screen']['auto_slide_pages'] = {}
settingList['screen']['auto_slide_pages']['title'] = 'Auto slide screens (seconds, 0=do not auto slide)';
settingList['screen']['auto_slide_pages']['type'] = 'text';

settingList['screen']['slide_effect'] = {}
settingList['screen']['slide_effect']['title'] = 'Slide effect';
settingList['screen']['slide_effect']['type'] = 'select';
settingList['screen']['slide_effect']['options'] = {};
settingList['screen']['slide_effect']['options']['slide'] = 'slide';
settingList['screen']['slide_effect']['options']['fade'] = 'fade';
settingList['screen']['slide_effect']['options']['cube'] = 'cube';
settingList['screen']['slide_effect']['options']['coverflow'] = 'coverflow';
settingList['screen']['slide_effect']['options']['flip'] = 'flip';

settingList['localize'] = {}
settingList['localize']['title'] = 'Localize';

settingList['localize']['language'] = {}
settingList['localize']['language']['title'] = 'Language';
settingList['localize']['language']['type'] = 'select';
settingList['localize']['language']['options'] = {};
settingList['localize']['language']['options']['zh_CN'] = 'Chinese';
settingList['localize']['language']['options']['nl_NL'] = 'Dutch';
settingList['localize']['language']['options']['en_US'] = 'English';
settingList['localize']['language']['options']['fr_FR'] = 'French';
settingList['localize']['language']['options']['hu_HU'] = 'Hungarian';
settingList['localize']['language']['options']['it_IT'] = 'Italian';
settingList['localize']['language']['options']['pt_PT'] = 'Portugese';
settingList['localize']['language']['options']['sv_SE'] = 'Swedish';

settingList['localize']['hide_seconds'] = {}
settingList['localize']['hide_seconds']['title'] = 'Hide seconds';
settingList['localize']['hide_seconds']['type'] = 'checkbox';

settingList['localize']['hide_seconds_stationclock'] = {}
settingList['localize']['hide_seconds_stationclock']['title'] = 'Hide seconds in StationClock';
settingList['localize']['hide_seconds_stationclock']['type'] = 'checkbox';

settingList['localize']['boss_stationclock'] = {}
settingList['localize']['boss_stationclock']['title'] = 'StationClock Type';
settingList['localize']['boss_stationclock']['type'] = 'text';

settingList['localize']['gm_api'] = {}
settingList['localize']['gm_api']['title'] = 'API Key';
settingList['localize']['gm_api']['type'] = 'text';

settingList['localize']['gm_zoomlevel'] = {}
settingList['localize']['gm_zoomlevel']['title'] = 'Zoom level';
settingList['localize']['gm_zoomlevel']['type'] = 'text';

settingList['localize']['gm_latitude'] = {}
settingList['localize']['gm_latitude']['title'] = 'Latitude';
settingList['localize']['gm_latitude']['type'] = 'text';

settingList['localize']['gm_longitude'] = {}
settingList['localize']['gm_longitude']['title'] = 'Longitude';
settingList['localize']['gm_longitude']['type'] = 'text';


settingList['weather'] = {}
settingList['weather']['title'] = 'Weather';

settingList['weather']['use_fahrenheit'] = {}
settingList['weather']['use_fahrenheit']['title'] = 'Use Fahrenheit instead of Celcius';
settingList['weather']['use_fahrenheit']['type'] = 'checkbox';

settingList['weather']['use_beaufort'] = {}
settingList['weather']['use_beaufort']['title'] = 'Use Bft instead of m/s';
settingList['weather']['use_beaufort']['type'] = 'checkbox';

settingList['weather']['wu_api'] = {}
settingList['weather']['wu_api']['title'] = 'API Key';
settingList['weather']['wu_api']['type'] = 'text';

settingList['weather']['wu_city'] = {}
settingList['weather']['wu_city']['title'] = 'Station (City or Code)';
settingList['weather']['wu_city']['type'] = 'text';

settingList['weather']['wu_name'] = {}
settingList['weather']['wu_name']['title'] = 'Display Name';
settingList['weather']['wu_name']['type'] = 'text';

settingList['weather']['wu_country'] = {}
settingList['weather']['wu_country']['title'] = 'Country';
settingList['weather']['wu_country']['type'] = 'text';


settingList['media'] = {}
settingList['media']['title'] = 'Media';

settingList['media']['switch_horizon'] = {}
settingList['media']['switch_horizon']['title'] = 'Ziggo/UPC Mediabox Path';
settingList['media']['switch_horizon']['type'] = 'text';
settingList['media']['switch_horizon']['help'] = 'If you have a mediabox from ZIGGO or UPC (Horizon), copy switch_horizon.php on a webserver inside your network and change the IP (of Horizon) inside this file.';

settingList['media']['spot_clientid'] = {}
settingList['media']['spot_clientid']['title'] = 'Spotify ClientID';
settingList['media']['spot_clientid']['type'] = 'text';

settingList['media']['hide_mediaplayer'] = {}
settingList['media']['hide_mediaplayer']['title'] = 'Hide mediaplayer when it\'s off';
settingList['media']['hide_mediaplayer']['type'] = 'checkbox';

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
	  html+='<div class="modal-dialog modal-dialog-settings">';
		html+='<div class="modal-content">';
		  html+='<div class="modal-body"><br />';
			html+='<div class="row">';
			
			
			
			  html+='<ul class="nav nav-pills">';
				 var first=true;
				 for(b in settingList){
				 	var c='';
					if(first){
						c=' class="active"'; 
						first=false;
					}
					html+='<li'+c+'><a data-toggle="pill" href="#tabs-'+b+'">'+settingList[b]['title']+'</a></li>';
				 }
			  html+='</ul>';
			  
			  html+='<div class="tab-content"><br /><br />';
			  
			  var first=true;
			  for(b in settingList){
			  		var c='';
					if(first){
						c=' active in'; 
						first=false;
					}
				  html+='<div class="tab-pane fade'+c+'" id="tabs-'+b+'">';
					for(s in settingList[b]){
						if(s!=='title'){
							html+='<div class="row">';
								html+='<div class="col-xs-5" style="margin-bottom:1px;"><label style="margin-top: 6px;font-size: 12px;">'+settingList[b][s]['title']+'</label>';
								if(typeof(settingList[b][s]['help'])!=='undefined') html+='<span class="glyphicon" title="'+settingList[b][s]['help']+'">&nbsp;&#xe086;</span>';
								html+='</div>';
								html+='<div class="col-xs-7" style="margin-bottom:1px;">';
								var val='';
								if(typeof(settings[s])!=='undefined') val=settings[s];
								if(settingList[b][s]['type']=='text') html+='<div><input class="form-control" type="text" name="'+s+'" value="'+val+'" style="max-width:75%;" /></div>';
								if(settingList[b][s]['type']=='checkbox'){
									var sel='';
									if(settings[s]==1) sel='checked';
									html+='<div class="material-switch pull-left"><input type="checkbox" id="'+s+'" name="'+s+'" value="1" '+sel+' style="margin-top:11px;" /><label for="'+s+'" class="label-success"></label></div>';
								}
								if(settingList[b][s]['type']=='select'){
									html+='<select name="'+s+'" class="form-control" style="max-width:75%;padding-left: 8px;color: #555 !important;">';
										html+='<option value=""></option>';
										for(o in settingList[b][s]['options']){
											var sel='';
											if(settings[s]==o) sel='selected';
											html+='<option value="'+o+'" '+sel+'>'+settingList[b][s]['options'][o]+'</option>';
										}
									html+='</select>';
								}
								html+='</div>';
							html+='</div>';
					  	}
					}
					//html+='<p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>';
				  html+='</div>';
			  }
			html+='</div>';
		  html+='</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button onClick="saveSettings();" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button></div>';
		html+='</div>';
	  html+='</div>';
	html+='</div>';
	$('body').append(html);
	
	$( "#tabs" ).tabs();

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