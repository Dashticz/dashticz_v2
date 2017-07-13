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
settingList['general']['language']['options']['nl_NL'] = 'Dutch';
settingList['general']['language']['options']['en_US'] = 'English';

settingList['general']['domoticz_refresh'] = {}
settingList['general']['domoticz_refresh']['title'] = 'Refresh Domoticz (seconds)';
settingList['general']['domoticz_refresh']['type'] = 'text';

settingList['general']['dashticz_refresh'] = {}
settingList['general']['dashticz_refresh']['title'] = 'Refresh Dashticz (minutes)';
settingList['general']['dashticz_refresh']['type'] = 'text';


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
			  
				  html+='<div class="col-md-6 col-xs-12"><br /><h4 style="margin:0px 0px 7px 5px;">'+settingList[b]['title']+'</h4>';
				  
				  for(s in settingList[b]){
					  if(s!=='title'){
							html+='<div class="col-xs-4" style="margin-bottom:1px;"><label style="margin-top: 6px;font-size: 12px;">'+settingList[b][s]['title']+'</label></div>';
							html+='<div class="col-xs-8" style="margin-bottom:1px;">';
							var val='';
							if(typeof(settings[s])!=='undefined') val=settings[s];
							if(settingList[b][s]['type']=='text') html+='<input class="form-control" type="text" name="'+s+'" value="'+val+'" style="max-width:95%;" />';
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
						  html+='</div>';
					  }
				  }
				  
				  html+='</div>';
			  }
			html+='</div>';
		  html+='<button onClick="saveSettings();">Save</button></div>';
		html+='</div>';
	  html+='</div>';
	html+='</div>';
	$('body').append(html);

});

function saveSettings(){
	if (typeof(Storage) !== "undefined") {
		$('div#settings input,div#settings select').each(function(){
			localStorage.setItem('dashticz_'+$(this).attr('name'), $(this).val());
		});
		
		document.location.href=document.location.href;
	}
	else {
		alert('Oh no, LocalStorage is not supported in your browser!');
	}
}