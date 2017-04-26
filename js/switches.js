function switchDevice(cur){
	var idx = $(cur).data('light');
	if($(cur).find('.icon').hasClass('on') || $(cur).find('.fa-toggle-on').length>0){
		var doStatus='Off';
		if($(cur).find('.fa-toggle-on').length>0){
			$(cur).find('.fa-toggle-on').addClass('fa-toggle-off').removeClass('fa-toggle-on');
		}
		
		$(cur).find('.icon').removeClass('on');
		$(cur).find('.icon').addClass('off');
		$(cur).find('.state').html(lang.state_off);
	}
	else {
		var doStatus='On';
		$(cur).find('.icon').removeClass('off');
		$(cur).find('.icon').addClass('on');
		
		if($(cur).find('.fa-toggle-off').length>0){
			$(cur).find('.fa-toggle-off').addClass('fa-toggle-on').removeClass('fa-toggle-off');
		}
		
		$(cur).find('.state').html(lang.state_on);
	}

	if(typeof(req)!=='undefined') req.abort();
	
	if(typeof(idx)=='string' && idx.substr(0,1)=='s'){
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchscene&idx='+idx.replace('s','')+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success:function(data) {
				getDevices();
			}
		});
	}
	else {
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success:function(data) {
				getDevices();
			}
		});
	}
}

function switchThermostat(setpoint,cur){
	var idx = $(cur).data('light');	
	if(typeof(req)!=='undefined') req.abort();
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=setsetpoint&idx='+idx+'&setpoint='+setpoint+'&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success:function(data) {
			getDevices();
		}
	});
}

function switchBlinds(idx,action){
	if(action=='off'){
		$('.block'+idx).find('.icon').removeClass('on').addClass('off');
		$('.block'+idx).find('.icon').attr('src',$('.block'+idx).find('.icon').attr('src').replace('open','closed'));
	}
	else if(action=='on'){
		$('.block'+idx).find('.icon').removeClass('off').addClass('on');
		$('.block'+idx).find('.icon').attr('src',$('.block'+idx).find('.icon').attr('src').replace('closed','open'));
	}
	
	if(typeof(req)!=='undefined') req.abort();
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd='+action+'&level=0&passcode=&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success:function(data) {
			getDevices();
		}
	});
}

function switchDeviceBtn(cur,url){
	if(url!==""){
		sliding = true;
		setTimeout(function(){ sliding = false; },5000);
		if(typeof(req)!=='undefined') req.abort();	
		
		var url = decodeURIComponent(url);
		$.ajax({
			url: url+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success:function(data) {
				getDevices();
			}
		});
	}
}
function switchGroup(cur){
	var idx = $(cur).data('light');
	if($(cur).find('img.icon').hasClass('on')){
		var doStatus='Off';
		$(cur).find('.icon').removeClass('on');
		$(cur).find('.icon').addClass('off');
		$(cur).find('.state').html(lang.state_off);
	}
	else {
		var doStatus='On';
		$(cur).find('.icon').removeClass('off');
		$(cur).find('.icon').addClass('on');
		$(cur).find('.state').html(lang.state_on);
	}
	
	if(typeof(req)!=='undefined') req.abort();	
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchscene&idx='+idx.replace('s','')+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success:function(data) {
			getDevices();
		}
	});
}

function slideDevice(idx,status){
	if(typeof(slide)!=='undefined') slide.abort();
	slide = $.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd=Set%20Level&level='+status+'&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success:function(data) {
			getDevices();
		}
	});
}

function ziggoRemote(key){
	$.get(_HOST_ZIGGO_HORIZON+'?key='+key);
}

function controlLogitech(idx,action){
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=lmsmediacommand&idx='+idx+'&action='+action+'&jsoncallback=?',
		type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
		success: function(data) {
			getDevices();
		}
	});
}