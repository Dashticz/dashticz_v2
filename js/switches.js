function switchDeviceConfirm(cur) {
	var r = confirm("Are you sure you want to switch?");
	if (r == true) {
		switchDevice(cur)
	}
}

function switchOnOffConfirm(cur) {
	var r = confirm("Are you sure you want to switch?");
	if (r == true) {
		switchDevice(cur)
	}
}

function switchDevice(cur) {
    var idx = $(cur).data('light');
    var doStatus = '';
    var param = 'switchlight';
    if ($(cur).find('.icon').hasClass('on') || $(cur).find('.fa-toggle-on').length > 0) {
        doStatus = toggleItem(cur, 'on');
    } else {
        doStatus = toggleItem(cur, 'off');
    }
    triggerChange(idx, doStatus);
    if (typeof(req) !== 'undefined') {
        req.abort();
    }
    if (typeof(idx) === 'string' && idx.substr(0, 1) === 's') {
        idx = idx.replace('s', '');
        param = 'switchscene';
    }
	
	
    $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=' + param + '&idx=' + idx + '&switchcmd=' + doStatus + '&level=0&passcode=&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
	
}

function switchOnOff(cur, onOrOff) {
    var idx = $(cur).data('light');
    var doStatus = toggleItem(cur, onOrOff === 'off' ? 'on' : 'off');

    triggerChange(idx, doStatus);
    if (typeof(req) !== 'undefined') {
        req.abort();
    }

    $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=switchlight&idx=' + idx + '&switchcmd=' + doStatus + '&level=0&passcode=&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
}

function toggleItem(cur, currentState) {
    if (currentState.toLowerCase() === 'off') {
        currentState = 'off';
        this.newState = 'on';
    } else {
        currentState = 'on';
        this.newState = 'off';
    }
    if ($(cur).find('.fa-toggle-' + currentState).length > 0) {
        $(cur).find('.fa-toggle-' + currentState).addClass('fa-toggle-' + this.newState).removeClass('fa-toggle-' + currentState);
    }

    $(cur).find('.icon').removeClass(currentState);
    $(cur).find('.icon').addClass(this.newState);
    $(cur).find('.state').html(language.switches['state_' + this.newState]);

    return this.newState.charAt(0).toUpperCase() + this.newState.slice(1);
}

function switchThermostat(setpoint, cur) {
    sliding = true;
    var idx = $(cur).data('light');
    if (typeof(req) !== 'undefined') req.abort();
    req = $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=setsetpoint&idx=' + idx + '&setpoint=' + setpoint + '&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {

            sliding = false;
            //getDevices(true);
        }
    });
}

function switchBlinds(idx, action) {
    switch (action.toLowerCase()) {
        case 'off':
            $('.block_' + idx).find('.icon').removeClass('on').addClass('off');
            $('.block_' + idx).find('.icon').attr('src').replace('open', 'closed');
            break;
        case 'on':
            $('.block_' + idx).find('.icon').removeClass('off').addClass('on');
            $('.block_' + idx).find('.icon').attr('src').replace('closed', 'open');
            break;
    }

    if (typeof(req) !== 'undefined') req.abort();
    $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=switchlight&idx=' + idx + '&switchcmd=' + action + '&level=0&passcode=&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
}

function switchDeviceBtn(cur, url) {
    if (url !== "") {
        sliding = true;
        if (typeof(req) !== 'undefined') req.abort();

        var url = decodeURIComponent(url);
        $.ajax({
            url: url + '&jsoncallback=?',
            type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
            done: function (data) {
                getDevices(true);
            }
        });
    }
}

function switchScene(cur) {
    var idx = $(cur).data('light');
    var doStatus = 'On'; // toggleItem(cur, $(cur).find('img.icon').hasClass('on') ? 'on' : 'off');
    triggerChange(idx, doStatus);
    if (typeof(req) !== 'undefined') req.abort();
    $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=switchscene&idx=' + idx.replace('s', '') + '&switchcmd=' + doStatus + '&level=0&passcode=&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
}

function slideDevice(idx, status) {
    if (typeof(slide) !== 'undefined') slide.abort();

    $('.block_' + idx).find('.icon').removeClass('off');
    $('.block_' + idx).find('.icon').addClass('on');

    if ($('.block_' + idx).find('.fa-toggle-off').length > 0) {
        $('.block_' + idx).find('.fa-toggle-off').addClass('fa-toggle-on').removeClass('fa-toggle-off');
    }

    $('.block_' + idx).find('.state').html(language.switches.state_on);

    slide = $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=switchlight&idx=' + idx + '&switchcmd=Set%20Level&level=' + status + '&jsoncallback=?',
        type: 'GET', async: false, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
}



/*
The following slider functions are used to set the slider while sliding.
On the first change an async request is send to Domoticz.
On succuueding changes first itś checked whether the previous request did finish.
If not, the new value is buffered, and will be send by sliderCallback after the previous request finished..
*/

var sliderAction = {
  "state" : "idle",
  "idx" : 0,
  "value" : 0,
  "request" : 0
}

function sliderSetValue(p_idx, p_value, p_Callback) {
    return $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=switchlight&idx=' + p_idx + '&switchcmd=Set%20Level&level=' + p_value + '&jsoncallback=?',
        type: 'GET', async: true, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
                p_Callback();
        }  
      });
}

function sliderCallback() {
  if (sliderAction.state == "set") { //check whether we have to set another value
    sliderAction.request = sliderSetValue(sliderAction.idx, sliderAction.value, sliderCallback);
    sliderAction.state = "idle";
  }
}

function slideDeviceExt(idx, value, sliderState) {
    if(sliderState==0) { //start sliding 
        $('.block_' + idx).find('.icon').removeClass('off');
        $('.block_' + idx).find('.icon').addClass('on');

        if ($('.block_' + idx).find('.fa-toggle-off').length > 0) {
            $('.block_' + idx).find('.fa-toggle-off').addClass('fa-toggle-on').removeClass('fa-toggle-off');
        }
  
        $('.block_' + idx).find('.state').html(language.switches.state_on);
    
        sliderAction.request = sliderSetValue(idx, value, sliderCallback);
        return;
      }
      if(sliderState==1 || sliderState == 2) { //sliding or change at the end
          if(sliderAction.request.readyState == 4) {
            sliderAction.request = sliderSetValue(idx, value, sliderCallback);
          }
          else {
             sliderAction.state = 'set';
             sliderAction.idx = idx;
             sliderAction.value = value;
           }
          return;
      }
}

function ziggoRemote(key) {
    $.get(settings['switch_horizon'] + '?key=' + key);
}

function controlLogitech(idx, action) {
    $.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=lmsmediacommand&idx=' + idx + '&action=' + action + '&jsoncallback=?',
        type: 'GET', async: true, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
            getDevices(true);
        }
    });
}
var statusmsg = '';
function switchSecurity(level, pincode) {

	pincode = $.md5(pincode)
	$.ajax({
        url: settings['domoticz_ip'] + '/json.htm?username=' + usrEnc + '&password=' + pwdEnc + '&type=command&param=setsecstatus&secstatus=' + level + '&seccode=' + pincode + '&jsoncallback=?',
        type: 'GET', async: true, contentType: 'application/json', dataType: 'jsonp',
        success: function (data) {
			if (data.status != "OK" ) {
			statusmsg = data.message;
            if (statusmsg = 'WRONG CODE') statusmsg = language.misc.wrong_code;
			infoMessage('<font color="red">Alert!</font>',statusmsg, 10000);
			}
            getDevices(true);
        }
    });
}
