
var language = {};
var cache = new Date().getTime();

// device detection
var standby=true;
var standbyActive=false;
var standbyTime=0;
var swipebackTime=0;
var audio = {};
var screens = {}
var columns = {}
var columns_standby = {}
var blocks = {}
var defaultcolumns = true;
var req;
var slide;
var sliding = false;
var defaultcolumns=false;
var allblocks={}
var alldevices={}
var myswiper;
var addedThermostat = [];
var oldstates = [];
var gettingDevices = false;
var md;
var _GRAPHS_LOADED = {};
var _BACKGROUND_IMAGE = 'img/bg2.jpg';
var _THEME = 'default';
var _STREAMPLAYER_TRACKS = {"track":1,"name":"Music FM","file":"http://stream.musicfm.hu:8000/musicfm.mp3"};
	
function loadFiles(){
	
	$.ajax({url: customfolder+'/CONFIG.js', async: false,dataType: "script"}).done(function() {
		if(objectlength(columns)==0) defaultcolumns = true;

		_GRAPHREFRESH = 5;
		if(typeof(screens)=='undefined' || objectlength(screens)==0){

			screens = {}
			screens[1] = {}
			screens[1]['background'] = _BACKGROUND_IMAGE;
			screens[1]['columns'] = []
			if(defaultcolumns===false){
				for(c in columns){
					if(c!=='bar') screens[1]['columns'].push(c);
				}
			}
		}
		//Check language before loading settings and fallback to Englisch when not set
		if(typeof(localStorage.dashticz_language)!=='undefined'){setLang = localStorage.dashticz_language}
		else if(typeof(config)!=='undefined' && typeof(config.language)!=='undefined'){ setLang = config.language}
		else {setLang = 'en_US'}
		$.ajax({url: 'lang/'+setLang+'.json?v='+cache, async: false, dataType: 'json', success: function(data) {
			language = data
		}});

		$.ajax({url: 'js/settings.js', async: false,dataType: "script"}).done(function() {
			loadSettings();

			$('<link href="css/creative.css?v='+cache+'" rel="stylesheet">').appendTo("head");
			
			if(_THEME!=='default'){
				$('<link rel="stylesheet" type="text/css" href="themes/'+_THEME+'/'+_THEME+'.css?v='+cache+'" />').appendTo("head");
			}
			$('<link href="'+customfolder+'/custom.css?v='+cache+'" rel="stylesheet">').appendTo("head");
			
			if(typeof(settings['edit_mode'])!=='undefined' && settings['edit_mode']==1){
				$('<link href="css/sortable.css?v='+cache+'" rel="stylesheet">').appendTo("head");
				$.ajax({url: 'js/sortable.js', async: false,dataType: "script"});
				
				var html = '<div class="newblocksHolder" style="display:none;">';
					html+= '<div class="title">'+language.editmode.add_plugin+'</div>';
					html+= '<div class="newblocks plugins sortable"></div>';
					html+= '<div class="title">'+language.editmode.add_block+'</div>';
					html+= '<div class="newblocks domoticz sortable"></div>';
				html+= '</div>';
					
				$('body').prepend(html);
			}
			
			$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
			$.ajax({url: 'js/thermostat.js', async: false,dataType: "script"});

			$.ajax({url: customfolder+'/custom.js?v='+cache, async: false,dataType: "script"});
			$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
			$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});

			$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
			$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
			$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});
			if(typeof(settings['gm_api'])!=='undefined' && settings['gm_api']!=="" && settings['gm_api']!==0){
				$.ajax({url: 'https://maps.googleapis.com/maps/api/js?key='+settings['gm_api']+'&callback=initMap', async: false,dataType: "script"}).done(function() {
					onLoad();
				});
			}
			else onLoad();
		});
	});
}

function onLoad(){
	
	md = new MobileDetect(window.navigator.userAgent);
	
	if(settings['edit_mode']==1){
		$('body').append('<div class="editmode">'+language.editmode.edit+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="saveBlocks();" style="color:#fff;"><em class="fa fa-save" /></a>&nbsp;&nbsp;</div>');	
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
		if(settings['hide_seconds']==true) $('.clock').html(moment().locale(settings['language']).format('HH:mm'));
		else $('.clock').html(moment().locale(settings['language']).format('HH:mm:ss'));
		if(settings['language']=='zh_CN') $('.date').html(moment().format('YYYY年MM月D日'));
		else $('.date').html(moment().locale(settings['language']).format('D MMMM YYYY'));
		$('.weekday').html(moment().locale(settings['language']).format('dddd'));
	},1000);

	getDevices(); 	

	setClassByTime();
	setInterval(function(){ 
		setClassByTime();
	},(60000));

	setTimeout(function(){
		document.location.href=document.location.href;
	},(settings['dashticz_refresh']*60*1000));
	
	if(typeof(settings['auto_swipe_back_to'])!=='undefined' && typeof(settings['auto_swipe_back_after'])!=='undefined'){
		if(parseFloat(settings['auto_swipe_back_after'])>0){
		   setInterval(function(){
			  swipebackTime+=1000;
			 if(swipebackTime>=(settings['auto_swipe_back_after']*1000)){
				toSlide((settings['auto_swipe_back_to']-1));
				swipebackTime=0;
			 }
		   },1000);

		}
	}

	if((settings['auto_swipe_back_after'] == 0  || typeof(settings['auto_swipe_back_after'])== 'undefined') && parseFloat(settings['auto_slide_pages']) > 0){
		var nextSlide = 1;
		setInterval(function(){
			toSlide(nextSlide);
			nextSlide++;
			if(nextSlide > myswiper.slides.length-1){
				nextSlide = 0;
			}
		},(parseFloat(settings['auto_slide_pages']) * 1000));
	}

	if(md.mobile()==null){
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

	if(parseFloat(settings['standby_after'])>0){
	   setInterval(function(){
		  standbyTime+=5000;
		  if(standbyActive!=true){
			 if(standbyTime>=((settings['standby_after']*1000)*60)){
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
}

function toSlide(num){
	if(typeof(myswiper)!=='undefined') myswiper.slideTo( num,1000,false );
}

function buildStandby(){
	
	if($('.screenstandby').length==0){
		var screenhtml = '<div class="screen screenstandby swiper-slide slidestandby" style="height:'+$(window).height()+'px"><div class="row"></div></div>';
		$('div.screen').hide();
		$('#settingspopup').modal('hide');
		$('div.swiper-container').before(screenhtml);	

		for(c in columns_standby){
			$('div.screenstandby .row').append('<div class="col-xs-'+columns_standby[c]['width']+' colstandby'+c+'"></div>');
			getBlock(columns_standby[c],c,'div.screenstandby .row .colstandby'+c,true);	
		}
	}
}

function buildScreens(){
	var num=1;
	var allscreens = {}
	for(t in screens){
		if(typeof(screens[t]['maxwidth'])!=='undefined' && typeof(screens[t]['maxheight'])!=='undefined'){
			allscreens[screens[t]['maxwidth']]=screens[t];
		}
		else {
			var maxwidth = 5000;
			if(typeof(allscreens[maxwidth])=='undefined'){
				allscreens[maxwidth] = {}
				allscreens[maxwidth]['maxwidth'] = maxwidth;
				allscreens[maxwidth]['maxheight'] = maxwidth;
			}
			allscreens[maxwidth][t]=screens[t];
		}
	}
	screens = allscreens;
	keys = Object.keys(screens);
  	len = keys.length;
	keys.sort();
	for (i = 0; i < len; i++) {
  		t = keys[i];
		if(
			typeof(screens[t]['maxwidth'])=='undefined' || 
			(
				typeof(screens[t]['maxwidth'])!=='undefined' && 
				parseFloat(screens[t]['maxwidth'])>=$(window).width() && 
				parseFloat(screens[t]['maxheight'])>=$(window).height()
			)
		){
			
			for(s in screens[t]){
				if(s!=='maxwidth' && s!=='maxheight'){
					var screenhtml = '<div class="screen screen'+s+' swiper-slide slide'+s+'"';
					if(typeof(screens[t][s]['background'])!=='undefined'){
						if(screens[t][s]['background'].indexOf("/")>0) screenhtml+='style="background-image:url(\''+screens[t][s]['background']+'\');"';
						else screenhtml+='style="background-image:url(\'img/'+screens[t][s]['background']+'\');"';
					}
					else if(typeof(screens[t][s][1])!=='undefined' && typeof(screens[t][s][1]['background'])!=='undefined'){
						if(screens[t][s][1]['background'].indexOf("/")>0) screenhtml+='style="background-image:url(\''+screens[t][s][1]['background']+'\');"';
						else screenhtml+='style="background-image:url(\'img/'+screens[t][s][1]['background']+'\');"';
					}
					
					screenhtml+='><div class="row"></div></div>';
					$('div.contents').append(screenhtml);			

					if(defaultcolumns===false){
						if(!settings['hide_topbar']==1){
							if(typeof(columns['bar'])=='undefined'){
								columns['bar'] = {}
								columns['bar']['blocks'] = ['logo','miniclock','settings']
							}
							getBlock(columns['bar'],'bar','div.screen'+s+' .row .colbar',false);
						}

						for(cs in screens[t][s]['columns']){
							c = screens[t][s]['columns'][cs];
							getBlock(columns[c],c,'div.screen'+s+' .row .col'+c,false);
						}

					}
					else {
						
						if(settings['hide_topbar']==0) $('body .row').append('<div class="col-sm-undefined col-xs-12 sortable colbar transbg dark"><div data-id="logo" class="logo col-xs-2">'+settings['app_title']+'<div></div></div><div data-id="miniclock" class="miniclock col-xs-8 text-center"><span class="weekday"></span> <span class="date"></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="clock"></span></div><div data-id="settings" class="settings settingsicon text-right" data-toggle="modal" data-target="#settingspopup"><em class="fa fa-cog" /></div></div></div>');
						if(typeof(settings['default_columns'])=='undefined' || parseFloat(settings['default_columns'])==3){
							$('body .row').append('<div class="col-xs-5 sortable col1" data-colindex="1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
							$('body .row').append('<div class="col-xs-5 sortable col2" data-colindex="2"><div class="block_weather containsweatherfull"></div><div class="auto_media"></div><div class="auto_states"></div></div>');
							$('body .row').append('<div class="col-xs-2 sortable col3" data-colindex="3"><div class="auto_clock"></div><div class="auto_sunrise"></div><div class="auto_buttons"></div></div>');
						
							if(typeof(settings['wu_api'])!=='undefined' && settings['wu_api']!=="" && settings['wu_api']!==0 && typeof(settings['wu_city'])!=='undefined' && settings['wu_city']!==""){
								$('.col2').prepend('<div class="mh transbg big block_currentweather_big col-xs-12 containsweather"><div class="col-xs-1"><div class="weather" id="weather"></div></div><div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div></div>');
								if(typeof(loadWeatherFull)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
								loadWeatherFull(settings['wu_city'],settings['wu_country'],$('#weatherfull'));
								loadWeather(settings['wu_city'],settings['wu_country']);
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
						else if(parseFloat(settings['default_columns'])==1){
							$('body .row').append('<div class="col-xs-12 sortable col1" data-colindex="1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
						}
						else if(parseFloat(settings['default_columns'])==2){
							$('body .row').append('<div class="col-xs-6 sortable col1" data-colindex="1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
							$('body .row').append('<div class="col-xs-6 sortable col2" data-colindex="2"><div class="block_weather containsweatherfull"></div><div class="auto_media"></div><div class="auto_states"></div></div>');
						}
					}
					num++;
				}
			}
			break;
		}
	}
	
	if(typeof(settings['edit_mode'])!=='undefined' && settings['edit_mode']==1){
		$('.swiper-container').addClass('edit');
		setTimeout(function(){ 
			startSortable(); 
		},2000);
	}
	
	startSwiper();
}

function startSwiper(){
	
	if(md.mobile()==null || md.tablet()!==null){
		if($('.swiper-container .screen').length>1){
			$.ajax({url: 'vendor/swiper/js/swiper.min.js', async: false,dataType: "script"}).done(function() {
				$('<link href="vendor/swiper/css/swiper.min.css" rel="stylesheet">').appendTo("head");
				//if((typeof(settings['edit_mode'])=='undefined' || settings['edit_mode']===false)){
					setTimeout(function(){
						myswiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							loop: false,
							effect: settings['slide_effect'],
							keyboardControl:true
						});
					},2000);
				//}
			});
		}
	}
	//$( window ).resize(function() { document.location.href=document.location.href });
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
	if(typeof(settings['gm_api'])=='undefined' || settings['gm_api']=="" || settings['gm_api']==0) console.log('Please, set Google Maps API KEY!');
	else {
	
		if(typeof(map)!=='undefined'){
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: map.zoom,
			  center: {lat: map.latitude, lng: map.longitude}
			});
		}
		else {
			var map = new google.maps.Map(document.getElementById(mapid), {
			  zoom: parseFloat(settings['gm_zoomlevel']),
			  center: {lat: parseFloat(settings['gm_latitude']), lng: parseFloat(settings['gm_longitude'])}
			});
		}

		var transitLayer = new google.maps.TrafficLayer();
		transitLayer.setMap(map);
	}
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

	for(t in screens){
		for(s in screens[t]){
			if(typeof(screens[t][s]['background_'+newClass])!=='undefined'){
				if(screens[t][s]['background_'+newClass].indexOf("/")>0) $('.screen.screen'+s).css('background-image','url(\''+screens[t][s]['background_'+newClass]+'\')');
				else $('.screen.screen'+s).css('background-image','url(\'img/'+screens[t][s]['background_'+newClass]+'\')');
			}
		}
	}

	$('body').removeClass('morning noon afternoon night').addClass(newClass);
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
		
		if(button.log==true){
		  if(typeof(getLog)!=='function') $.ajax({url: 'js/log.js', async: false,dataType: "script"});
		  $('#button_'+b+'_'+random+' .modal-body').html('');
		  getLog($('#button_'+b+'_'+random+' .modal-body'),button.level,true);
		}
				
	}
	var width = 12;
	if(typeof(button.width)!=='undefined') width=button.width;
	
	var key = 'UNKNOWN';
	if(typeof(button.key)!=='undefined') key=button.key;
	
	if(typeof(button.newwindow)!=='undefined'){
		var html='<div class="col-xs-'+width+' hover transbg buttons-'+key+'" data-id="buttons.'+key+'" onclick="window.open(\''+button.url+'\')">';
	}
	else if(typeof(button.slide)!=='undefined'){
		var html='<div class="col-xs-'+width+' hover transbg buttons-'+key+'" data-id="buttons.'+key+'" onclick="toSlide('+(parseFloat(button.slide)-1)+')">';
	}
	else {
		var html='<div class="col-xs-'+width+' hover transbg buttons-'+key+'" data-id="buttons.'+key+'" data-toggle="modal" data-target="#button_'+b+'_'+random+'" onclick="setSrc(this);">';
	}
		
		if(typeof(button.title)!=='undefined'){
			html+='<div class="col-xs-4 col-icon">';
		}
		else {html+='<div class="col-xs-12 col-icon">';}
		if(typeof(button.image)!=='undefined') html+='<img class="buttonimg" src="'+button.image+'" />';
			else html+='<em class="fa '+button.icon+' fa-small"></em>';
		html+='</div>';
		if(typeof(button.title)!=='undefined'){
			html+='<div class="col-xs-8 col-data">';
				html+='<strong class="title">'+button.title+'</strong><br>';
				html+='<span class="state"></span>';
			html+='</div>';
		}
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
      url: settings['domoticz_ip']+"/json.htm?type=command&param=getuservariable&idx="+settings['idx_moonpicture']+"&jsoncallback=?",
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
		
		if(settings['domoticz_ip']=='http://192.168.1.10:1407'){
			if($('.settingsicon').length==0) $('body').prepend('<div data-id="settings" class="settings settingsicon col-xs-12 text-right" data-toggle="modal" data-target="#settingspopup"><em class="fa fa-cog" /><div>');
			setTimeout(function(){ $('.settingsicon').trigger('click'); },3000);
		}
		else {
		
			req = $.getJSONP({
			url: settings['domoticz_ip']+'/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?',
			type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
			error: function( jqXHR, textStatus ) {
				console.error("Domoticz error!\nPlease, double check the path to Domoticz in Settings!");
			},
			success: function(data) {
				gettingDevices = false;
				if(!sliding || override){
					$('.solar').remove();
				
					if($('.sunrise').length>0) $('.sunrise').html(data.Sunrise);
					if($('.sunset').length>0) $('.sunset').html(data.Sunset);
										
					$('div.newblocks.plugins').html('');
					$('div.newblocks.domoticz').html('');
					if(settings['edit_mode']){
						$('div.newblocks.plugins').append('<div data-id="clock"><span class="title">'+language.editmode.clock+'</span></div>');
						$('div.newblocks.plugins').append('<div data-id="currentweather_big"><span class="title">'+language.editmode.currentweather_big+'</span></div>');
						$('div.newblocks.plugins').append('<div data-id="garbage"><span class="title">'+language.settings.garbage.title+'</span></div>');
						$('div.newblocks.plugins').append('<div data-id="streamplayer"><span class="title">Radio</span></div>');
						$('div.newblocks.plugins').append('<div data-id="nzbget"><span class="title">NZBget</span></div>');
						$('div.newblocks.plugins').append('<div data-id="sunrise"><span class="title">'+language.editmode.sunrise+'</set</span></div>');
						$('div.newblocks.plugins').append('<div data-id="weather"><span class="title">'+language.settings.weather.title+'</span></div>');
						$('div.newblocks.plugins').append('<div data-id="news"><span class="title">'+language.editmode.news+'</span></div>');
					}
					
					for(r in data.result){
						
						var device = data.result[r];
						var idx = device['idx'];
						
						if(device['Type']=='Group' || device['Type']=='Scene') var idx = 's'+device['idx'];
						
						if(typeof(blocks)!=='undefined' && typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['title'])!=='undefined'){
							device['Name'] = blocks[idx]['title'];
						}
						
						if(settings['edit_mode']) $('div.newblocks.domoticz').append('<div data-id="'+idx+'"><span class="title">'+device['Name']+'</span></div>');
						alldevices[idx] = device;
						
						if(
							(
								settings['auto_positioning']==1 && 
								(
									(settings['use_favorites']==1 && device['Favorite']==1) || 
									settings['use_favorites']==0
								)
							) || 
							(
								settings['auto_positioning']==0 && 
								(

									$('.block_'+idx).length>0 ||
									$('.block_'+idx+'_1').length>0 ||
									$('.block_'+idx+'_2').length>0 ||
									$('.block_'+idx+'_3').length>0 ||
									$('.block_graph_'+idx).length>0
								)
							)
						){
							if(settings['edit_mode']) $('div.newblocks > div[data-id="'+idx+'"]').remove();
							
							var width=4;
                            if(device['SwitchType']=='Selector') width=8;
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
									device['Type']=='Heating' || 
									device['Type']=='General' || 
									device['Type']=='Wind' || 
									device['Type']=='Rain' || 
									device['Type']=='RFXMeter' || 
									device['Type']=='Security' || 
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
							if(typeof(settings['default_columns'])=='undefined' || parseFloat(settings['default_columns'])==3) $('div.block_'+idx).addClass('col-xs-'+width);
							else if(parseFloat(settings['default_columns'])==1) $('div.block_'+idx).addClass('col-xs-3');
							else if(parseFloat(settings['default_columns'])==2) $('div.block_'+idx).addClass('col-xs-4');
							
							
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
									html+= getStatusBlock(idx,device,blocktypes['SubType'][device['SubType']]);
								}
								else if(typeof(device['HardwareType'])!=='undefined' && device['HardwareType'] in blocktypes['HardwareType']){
									if(typeof(blocktypes['HardwareType'][device['HardwareType']]['icon'])!=='undefined'){
										html+= getStatusBlock(idx,device,blocktypes['HardwareType'][device['HardwareType']]);
									}
									else {
										var c=1;
										for(de in blocktypes['HardwareType'][device['HardwareType']]){
											html = getStatusBlock(idx,device,blocktypes['HardwareType'][device['HardwareType']][de],c);
											
											triggerStatus(idx+'_'+c,device['LastUpdate'],device);
											triggerChange(idx+'_'+c,device['LastUpdate'],device);
							
											$('div.block_'+idx+'_'+c).html(html);
											addHTML=false;
											c++;
										}
									}
								}
								else if(typeof(device['HardwareName'])!=='undefined' && device['HardwareName'] in blocktypes['HardwareName']){
									html+= getStatusBlock(idx,device,blocktypes['HardwareName'][device['HardwareName']]);
								}
								else if(typeof(device['SensorUnit'])!=='undefined' && device['SensorUnit'] in blocktypes['SensorUnit']){
									html+= getStatusBlock(idx,device,blocktypes['SensorUnit'][device['SensorUnit']]);
								}
								else if(typeof(device['Type'])!=='undefined' && device['Type'] in blocktypes['Type']){
									html+= getStatusBlock(idx,device,blocktypes['Type'][device['Type']]);
								}
								else if(typeof(device['Name'])!=='undefined' && device['Name'] in blocktypes['Name']){
									html+= getStatusBlock(idx,device,blocktypes['Name'][device['Name']]);
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
										device['Data']=language.misc.mediaplayer_nothing_playing;
										if(settings['hide_mediaplayer']==1) $('div.block_'+idx).hide();
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
							
										var title=language.energy.energy_usage;
										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
										var icon = 'fa fa-plug';
										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['icon'])!=='undefined') icon=blocks[idx+'_1']['icon'];
										if(typeof(device['UsageDeliv'])!=='undefined' && (parseFloat(device['UsageDeliv'])>0 || parseFloat(device['UsageDeliv'])<0)){
											html+= getStateBlock(idx+'_1',icon,title,device['UsageDeliv'],device);
										}
										else {
											html+= getStateBlock(idx+'_1',icon,title,device['Usage'],device);
										}
										if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
										$('div.block_'+idx+'_1').html(html);
										addHTML=false;

										triggerStatus(idx+'_2',device['LastUpdate'],device);
										triggerChange(idx+'_2',device['LastUpdate'],device);
							
										var title=language.energy.energy_usagetoday;
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
										var icon = 'fa fa-plug';
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['icon'])!=='undefined') icon=blocks[idx+'_2']['icon'];
										html = getStateBlock(idx+'_2',icon,title,device['CounterToday'],device);
										if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
										$('div.block_'+idx+'_2').html(html);
										addHTML=false;
										
										triggerStatus(idx+'_3',device['LastUpdate'],device);
										triggerChange(idx+'_3',device['LastUpdate'],device);

										var title=language.energy.energy_totals;
										if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
										var icon = 'fa fa-plug';
										if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['icon'])!=='undefined') icon=blocks[idx+'_3']['icon'];
										html = getStateBlock(idx+'_3',icon,title,device['Counter']+' kWh',device);
										if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_3').length==0) var duplicate = $('div.block_'+idx+'_2').last().clone().removeClass('block_'+idx+'_2').addClass('block_'+idx+'_3').insertAfter($('div.block_'+idx+'_2'));
										$('div.block_'+idx+'_3').html(html);
										addHTML=false;

										if(parseFloat(device['CounterDeliv'])>0){
											triggerStatus(idx+'_4',device['LastUpdate'],device);
											triggerChange(idx+'_4',device['LastUpdate'],device);
							
											var title=language.energy.energy_delivered;
											if(typeof(blocks[idx+'_4'])!=='undefined' && typeof(blocks[idx+'_4']['title'])!=='undefined') title=blocks[idx+'_4']['title'];
											var icon = 'fa fa-plug';
											if(typeof(blocks[idx+'_4'])!=='undefined' && typeof(blocks[idx+'_4']['icon'])!=='undefined') icon=blocks[idx+'_4']['icon'];
											html = getStateBlock(idx+'_4',icon,title,device['CounterDeliv']+' kWh',device);
											if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_4').length==0) var duplicate = $('div.block_'+idx+'_3').last().clone().removeClass('block_'+idx+'_3').addClass('block_'+idx+'_4').insertAfter($('div.block_'+idx+'_3'));
											$('div.block_'+idx+'_4').html(html);
											addHTML=false;

											triggerStatus(idx+'_5',device['LastUpdate'],device);
											triggerChange(idx+'_5',device['LastUpdate'],device);
							
											var title=language.energy.energy_deliveredtoday;
											if(typeof(blocks[idx+'_5'])!=='undefined' && typeof(blocks[idx+'_5']['title'])!=='undefined') title=blocks[idx+'_5']['title'];
											var icon = 'fa fa-plug';
											if(typeof(blocks[idx+'_5'])!=='undefined' && typeof(blocks[idx+'_5']['icon'])!=='undefined') icon=blocks[idx+'_5']['icon'];
											html = getStateBlock(idx+'_5',icon,title,device['CounterDelivToday'],device);
											if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_5').length==0) var duplicate = $('div.block_'+idx+'_4').last().clone().removeClass('block_'+idx+'_4').addClass('block_'+idx+'_5').insertAfter($('div.block_'+idx+'_4'));
											$('div.block_'+idx+'_5').html(html);
											addHTML=false;
										}
									}
									if(device['Type']=='P1 Smart Meter' && device['SubType']=='Gas'){
										if($('div.block_'+idx).length>0){
											allblocks[idx] = true;
										}

										triggerStatus(idx+'_1',device['LastUpdate'],device);
										triggerChange(idx+'_1',device['LastUpdate'],device);
							
										var title=language.energy.gas_usagetoday;
										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
										var icon = 'fa fa-fire';
										if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['icon'])!=='undefined') icon=blocks[idx+'_1']['icon'];
										html+= getStateBlock(idx+'_1',icon,title,device['CounterToday'],device);
										if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
										$('div.block_'+idx+'_1').html(html);
										addHTML=false;

										triggerStatus(idx+'_2',device['LastUpdate'],device);
										triggerChange(idx+'_2',device['LastUpdate'],device);
							
										var title=language.energy.energy_totals;
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
										var icon = 'fa fa-fire';
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['icon'])!=='undefined') icon=blocks[idx+'_2']['icon'];
										html = getStateBlock(idx+'_2',icon,title,device['Counter']+' m3',device);
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
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['icon'])!=='undefined') rfxicon=blocks[idx+'_1']['icon'];
									
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
							
									var title=language.energy.energy_totals+' '+device['Name'];
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
							
									var title=device['Name']+' '+language.energy.energy_now;
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									var icon = 'fa fa-fire';
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['icon'])!=='undefined') icon=blocks[idx+'_1']['icon'];
									html+= getStateBlock(device['idx']+'a',icon,title,number_format(device['Usage'],2,',','.')+' W',device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;

									triggerStatus(idx+'_2',device['LastUpdate'],device);
									triggerChange(idx+'_2',device['LastUpdate'],device);
							
									var title=device['Name']+' '+language.energy.energy_today;
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
									var icon = 'fa fa-fire';
									if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['icon'])!=='undefined') icon=blocks[idx+'_2']['icon'];
									html= getStateBlock(device['idx']+'b',icon,title,number_format(device['CounterToday'],2,',','.')+' kWh',device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
									$('div.block_'+idx+'_2').html(html);
									addHTML=false;

									triggerStatus(idx+'_3',device['LastUpdate'],device);
									triggerChange(idx+'_3',device['LastUpdate'],device);
							
									var title=device['Name']+' '+language.energy.energy_total;
									if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
									var icon = 'fa fa-fire';
									if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['icon'])!=='undefined') icon=blocks[idx+'_3']['icon'];
									html= getStateBlock(device['idx']+'c',icon,title,number_format(device['Data'],2,',','.')+' kWh',device);
									if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_3').length==0) var duplicate = $('div.block_'+idx+'_2').last().clone().removeClass('block_'+idx+'_2').addClass('block_'+idx+'_3').insertAfter($('div.block_'+idx+'_2'));
									$('div.block_'+idx+'_3').html(html);
									addHTML=false;

								}
								else if(
									device['Type']=='Temp + Humidity + Baro' || 
									device['Type']=='Temp + Humidity' || 
									device['Type']=='Humidity' || 
									device['Type']=='Heating'
								){

									if($('div.block_'+idx).length>0){
										allblocks[idx] = true;
									}

									triggerStatus(idx+'_1',device['LastUpdate'],device);
									triggerChange(idx+'_1',device['LastUpdate'],device);
							
									var title=device['Name'];
									if(typeof(blocks[idx+'_1'])!=='undefined' && typeof(blocks[idx+'_1']['title'])!=='undefined') title=blocks[idx+'_1']['title'];
									var icon = 'fa fa-thermometer-half';
									if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['icon'])!=='undefined') icon=blocks[idx+'_3']['icon'];
									html+= getStateBlock(device['idx']+'a',icon,title,number_format(device['Temp'],1,',','.')+_TEMP_SYMBOL,device);
									if(!$('div.block_'+idx).hasClass('block_'+idx+'_1')) $('div.block_'+idx).addClass('block_'+idx+'_1');
									$('div.block_'+idx+'_1').html(html);
									addHTML=false;

									if(typeof(device['Humidity'])!=='undefined'){
										triggerStatus(idx+'_2',device['LastUpdate'],device);
										triggerChange(idx+'_2',device['LastUpdate'],device);
							
										var title=device['Name'];
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['title'])!=='undefined') title=blocks[idx+'_2']['title'];
										var icon = 'wi wi-humidity';
										if(typeof(blocks[idx+'_2'])!=='undefined' && typeof(blocks[idx+'_2']['icon'])!=='undefined') icon=blocks[idx+'_2']['icon'];
										html= getStateBlock(device['idx']+'b',icon,title,number_format(device['Humidity'],2,',','.')+'%',device);
										if(typeof(allblocks[idx])!=='undefined' && $('div.block_'+idx+'_2').length==0) var duplicate = $('div.block_'+idx+'_1').last().clone().removeClass('block_'+idx+'_1').addClass('block_'+idx+'_2').insertAfter($('div.block_'+idx+'_1'));
										$('div.block_'+idx+'_2').html(html);
										addHTML=false;
									}

									if(typeof(device['Barometer'])!=='undefined'){
										triggerStatus(idx+'_3',device['LastUpdate'],device);
										triggerChange(idx+'_3',device['LastUpdate'],device);
							
										var title=device['Name'];
										if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['title'])!=='undefined') title=blocks[idx+'_3']['title'];
										var icon = 'wi wi-barometer';
										if(typeof(blocks[idx+'_3'])!=='undefined' && typeof(blocks[idx+'_3']['icon'])!=='undefined') icon=blocks[idx+'_3']['icon'];
										html= getStateBlock(device['idx']+'c',icon,title,device['Barometer']+' hPa',device);
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
										if((settings['last_update']==1 && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (settings['last_update']==0 && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
											html+=' / <span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
										}
										html+='<br />';
										if(device['SubType']=='removeRGBW' || device['SubType']=='removeRGBWW'){
											html+='<input type="text" class="rgbw" data-light="'+device['idx']+'" />';
											html+='<div class="slider slider'+device['idx']+'" style="margin-left:55px;" data-light="'+device['idx']+'"></div>';
										}
										else {
											html+='<div class="slider slider'+device['idx']+'" data-light="'+device['idx']+'"></div>';
										}
										
									html+='</div>';

									$('div.block_'+idx).html(html);
									addHTML=false;
									
									if(device['SubType']=='removeRGBW' || device['SubType']=='removeRGBWW'){
										$(".rgbw").spectrum({
											color: Cookies.get('rgbw_'+idx)
										});
										
										$(".rgbw").on("dragstop.spectrum",function(e, color) {
											curidx=$(this).data('light');
											color = color.toHexString();
											Cookies.set('rgbw_'+curidx, color);
											hue=hexToHsb(color);
											var bIsWhite = (hue.s < 20);
											
											sliding=true;
											var url = settings['domoticz_ip']+'/json.htm?type=command&param=setcolbrightnessvalue&idx='+curidx+'&hue='+hue.h+'&brightness='+hue.b+'&iswhite='+bIsWhite;
											$.ajax({
												url: url+'&jsoncallback=?',
												type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp'
											});
										});
										
										$(".rgbw").on('hide.spectrum', function(e, tinycolor) { 
											sliding=false;
											getDevices(true);
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
									else  if(parseFloat(device['MaxDimLevel'])==32){
										$( ".slider"+device['idx'] ).slider({
											value:Math.ceil((device['Level']/100)*32),
											step: 1,
											min:2,
											max:32,
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
									else {
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

									html+=getBlockData(device,idx,language.switches.state_on,language.switches.state_off);
								}
								else if(typeof(device['LevelActions'])!=='undefined' && device['LevelNames']!==""){
									var names = device['LevelNames'].split('|');
									
									var onoff='on';
									if(device['Status']=='Off') var onoff='off';
									
									if(buttonimg==''){
										html+=iconORimage(idx,'fa-lightbulb-o','',onoff+' icon');
									}
									else {
										html+=iconORimage(idx,'',buttonimg+'.png',onoff+' icon');	
									}

									if((typeof(device['SelectorStyle'])!=='undefined' && device['SelectorStyle']==1)){
										html+='<div class="col-xs-8 col-data">';
											html+='<strong class="title">'+device['Name']+'</strong><br />';
											html+='<select onchange="slideDevice('+device['idx']+',this.value);">';
											html+='<option value="">'+language.misc.select+'</option>';
											for(a in names){
												if(parseFloat(a)>0 || (a==0 && (typeof(device['LevelOffHidden'])=='undefined' || device['LevelOffHidden']===false))){
												
													var s='';
													if((a*10)==parseFloat(device['Level'])) s = 'selected';
													html+='<option value="'+(a*10)+'" '+s+'>'+names[a]+'</option>';
												}
											}
											html+='</select>';
										html+='</div>';
									}
									else {
										html+='<div class="col-xs-8 col-data">';
											html+='<strong class="title">'+device['Name']+'</strong><br />';
											html+='<div class="btn-group" data-toggle="buttons">';
											for(a in names) {
												if(parseFloat(a)>0 || (a==0 && (typeof(device['LevelOffHidden'])=='undefined' || device['LevelOffHidden']===false))){
													var s = '';
													if ((a * 10) == parseFloat(device['Level'])) s = 'active';
													html+='<label class="btn btn-default '+s+'" onclick="slideDevice('+device['idx']+',$(this).children(\'input\').val());">';
													html += '<input type="radio" name="options" autocomplete="off" value="'+(a*10)+'" checked>'+names[a];
													html+='</label>';
												}
											}
											html+='</select>';
											html+='</div>';
										html+='</div>';
									}
									
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
										if((settings['last_update']==1 && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (settings['last_update']==0 && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
											html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
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
									
									html+=getBlockData(device,idx,language.switches.state_open,language.switches.state_closed);
								}
								else if(device['SwitchType']=='Contact'){
									if(device['Status']=='Closed') html+=iconORimage(idx,'','door_closed.png','off icon','',2);
									else html+=iconORimage(idx,'','door_open.png','on icon','',2);

									html+=getBlockData(device,idx,language.switches.state_open,language.switches.state_closed);
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
										if((settings['last_update']==1 && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
										  (settings['last_update']==0 && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
										  ){
											html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
										}
									html+='</div>';
								}
								else if(device['SwitchType']=='Venetian Blinds EU' || device['SwitchType']=='Blinds' || 
									   device['SwitchType']=='Venetian Blinds EU Percentage' || device['SwitchType']=='Blinds Percentage' || device['SwitchType']=='Blinds Percentage Inverted' || 
									   device['SwitchType']=='Venetian Blinds EU Inverted' || device['SwitchType']=='Blinds Inverted'){
									html+='<div class="col-xs-4 col-icon">';
									   if(device['Status']=='Closed') html+='<img src="img/blinds_closed.png" class="off icon" />';
									   else html+='<img src="img/blinds_open.png" class="on icon" />';
									html+='</div>';
									html+='<div class="col-xs-8 col-data">';
									   html+='<strong class="title">'+device['Name']+'</strong><br />';

									   if(device['Status']=='Closed') html+='<span class="state">'+language.switches.state_closed+'</span>';
									   else html+='<span class="state">'+language.switches.state_open+'</span>';

									html+='</div>';
									
									if(typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_stop'])=='undefined' || blocks[idx]['hide_stop']===false){
										var hidestop = false;
										html+='<ul class="input-groupBtn input-chevron">';
									}
									else {
										var hidestop = true;
										html+='<ul class="input-groupBtn input-chevron hidestop">';
									}
									
										if(device['SwitchType']=='Venetian Blinds EU Inverted' || device['SwitchType']=='Blinds Inverted' || device['SwitchType']=='Blinds Percentage Inverted'){
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
									html+=getBlockData(device,idx,language.switches.state_movement,language.switches.state_nomovement);
								}
								else if(device['SwitchType']=='Smoke Detector'){
									if(device['Status']=='Off' || device['Status']=='Normal') html+=iconORimage(idx,'','heating.png','off icon','style="max-height:35px;"');
									else html+=iconORimage(idx,'','heating.png','on icon','style="max-height:35px;border: 5px solid #F05F40;"');	
									html+=getBlockData(device,idx,language.switches.state_smoke,language.switches.state_nosmoke);
								}
								else if(device['HardwareName']=='Dummy') { 
									if((typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['protected']) == 'undefined' || blocks[idx]['protected'] == false) && device['Protected'] == false){
										$('.block_'+idx).attr('onclick','switchDevice(this)');
									}

									if(device['Status']=='Off') html+=iconORimage(idx,'fa-toggle-off','','off icon');
									else html+=iconORimage(idx,'fa-toggle-on','','on icon');

									html+=getBlockData(device,idx,language.switches.state_on,language.switches.state_off);
								}
								else if(device['Image']=='Alarm') { 
									if(device['Status']=='Off') html+=iconORimage(idx,'fa-warning','','off icon');
									else html+=iconORimage(idx,'fa-warning','','on icon','style="color:#F05F40;"');

									html+=getBlockData(device,idx,language.switches.state_on,language.switches.state_off);
								}
								else if(device['SwitchType'] =='Doorbell') {
									if(buttonimg==''){
										if(device['Status']=='Off') html+=iconORimage(idx,'fa-bell-o','','off icon');
										else html+=iconORimage(idx,'fa-bell-o','','on icon');
									}
									else {
										if(device['Status']=='Off') html+=iconORimage(idx,'',buttonimg+'.png','off icon');
										else html+=iconORimage(idx,'',buttonimg+'.png','on icon');
									}
									html+=getBlockData(device,idx,'','');
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
									html+=getBlockData(device,idx,language.switches.state_on,language.switches.state_off);
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
				
				if(!settings['edit_mode']){
					setTimeout(function(){ getDevices(); },(settings['domoticz_refresh']*1000));
				}
			}
		});
			
		}
	}
	else {
		if(!settings['edit_mode']){
			setTimeout(function(){ getDevices(); },(settings['domoticz_refresh']*1000));
		}
	}
}
