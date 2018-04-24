var language = {};
var cache = new Date().getTime();

// device detection
var standby = true;
var standbyActive = false;
var standbyTime = 0;
var swipebackTime = 0;
var audio = {};
var screens = {};
var columns = {};
var columns_standby = {};
var blocks = {};
var req;
var slide;
var sliding = false;
var defaultcolumns = false;
var allblocks = {};
var alldevices = {};
var myswiper;
var addedThermostat = [];
var oldstates = [];
var onOffstates = [];
var gettingDevices = false;
var md;
var usrEnc;
var pwdEnc;
var _GRAPHS_LOADED = {};
var _STREAMPLAYER_TRACKS = {"track": 1, "name": "Music FM", "file": "http://stream.musicfm.hu:8000/musicfm.mp3"};
var _THOUSAND_SEPARATOR = '.';
var _DECIMAL_POINT = ',';

function loadFiles() {
    $.ajax({url: customfolder + '/CONFIG.js', async: false, dataType: 'script'}).done(function () {
        if (objectlength(columns) === 0) defaultcolumns = true;

        _GRAPHREFRESH = 5;
        
        //Check language before loading settings and fallback to English when not set
        if (typeof(localStorage.dashticz_language) !== 'undefined') {
            setLang = localStorage.dashticz_language
        }
        else if (typeof(config) !== 'undefined' && typeof(config.language) !== 'undefined') {
            setLang = config.language;
        }
        else {
            setLang = 'en_US';
        }
        $.ajax({
            url: 'lang/' + setLang + '.json?v=' + cache, async: false, dataType: 'json', success: function (data) {
                language = data;
            }
        });

	$.ajax({url: 'js/version.js', async: false, dataType: 'script'});
        $.ajax({url: 'js/settings.js', async: false, dataType: 'script'}).done(function () {
            loadSettings();
			userEnc='';
			pwdEnc='';
			if(typeof(settings['user_name'])!=='undefined'){
				usrEnc = window.btoa(settings['user_name']);
				pwdEnc = window.btoa(settings['pass_word']);
			}
			if (typeof(screens) === 'undefined' || objectlength(screens) === 0) {
				screens = {};
				screens[1] = {};
				screens[1]['background'] = settings['background_image'];
				screens[1]['columns'] = [];
				if (defaultcolumns === false) {
					for (c in columns) {
						if (c !== 'bar') screens[1]['columns'].push(c);
					}
				}
			}
			
            $('<link href="css/creative.css?v=' + cache + '" rel="stylesheet">').appendTo('head');
            $('<link href="vendor/weather/css/weather-icons.min.css?v=' + cache + '" rel="stylesheet">').appendTo('head');

            if (settings['theme'] !== 'default') {
              $('<link rel="stylesheet" type="text/css" href="themes/' + settings['theme'] + '/' + settings['theme'] + '.css?v=' + cache + '" />').appendTo('head');
            }
            $('<link href="' + customfolder + '/custom.css?v=' + cache + '" rel="stylesheet">').appendTo('head');

            if (typeof(settings['edit_mode']) !== 'undefined' && settings['edit_mode'] == 1) {
                $('<link href="css/sortable.css?v=' + cache + '" rel="stylesheet">').appendTo('head');
                $.ajax({url: 'js/sortable.js', async: false, dataType: 'script'});

                var html = '<div class="newblocksHolder" style="display:none;">';
                html += '<div class="title">' + language.editmode.add_plugin + '</div>';
                html += '<div class="newblocks plugins sortable"></div>';
                html += '<div class="title">' + language.editmode.add_block + '</div>';
                html += '<div class="newblocks domoticz sortable"></div>';
                html += '</div>';

                $('body').prepend(html);
            }

            $.ajax({url: 'js/switches.js', async: false, dataType: 'script'});
            $.ajax({url: 'js/thermostat.js', async: false, dataType: 'script'});

            $.ajax({url: customfolder + '/custom.js?v=' + cache, async: false, dataType: 'script'});
            $.ajax({url: 'js/switches.js', async: false, dataType: 'script'});
            $.ajax({url: 'js/blocks.js', async: false, dataType: 'script'});
            $.ajax({url: 'js/graphs.js', async: false, dataType: 'script'});
	    $.ajax({url: 'js/login.js', async: false, dataType: 'script'});
		
	    sessionValid();
		
            if (typeof(settings['gm_api']) !== 'undefined' && settings['gm_api'] !== '' && settings['gm_api'] !== 0) {
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/js?key=' + settings['gm_api'],
                    async: false,
                    dataType: 'script'
                }).done(function () {
                    setTimeout(function () {
                        initMap();
                    }, 2000);
                    onLoad();
                });
            }
            else onLoad();
        });
    });
}

function onLoad() {
    md = new MobileDetect(window.navigator.userAgent);

    if (settings['edit_mode'] == 1) {
        $('body').append('<div class="editmode">' + language.editmode.edit + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="saveBlocks();" style="color:#fff;"><em class="fa fa-save" /></a>&nbsp;&nbsp;</div>');
    }

    $('body').attr('unselectable', 'on')
        .css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart', function () {
        return false;
    });

    buildScreens();
    setTimeout(function(){
		$('#loaderHolder').fadeOut();
		$('body').css('overflow','auto');
	},2000);

    setInterval(function () {
        $('.clock').html(moment().locale(settings['language']).format(settings['hide_seconds'] ? settings['shorttime'] : settings['longtime']));
        $('.date').html(moment().locale(settings['language']).format(settings['longdate']));
        $('.weekday').html(moment().locale(settings['language']).format(settings['weekday']));
    }, 1000);

    getDevices();

    setClassByTime();
    setInterval(function () {
        setClassByTime();
    }, (60000));

    setTimeout(function () {
        document.location.href = document.location.href;
    }, (settings['dashticz_refresh'] * 60 * 1000));

    if (typeof(settings['auto_swipe_back_to']) !== 'undefined' && typeof(settings['auto_swipe_back_after']) !== 'undefined') {
        if (parseFloat(settings['auto_swipe_back_after']) > 0) {
            setInterval(function () {
                swipebackTime += 1000;
                if (swipebackTime >= (settings['auto_swipe_back_after'] * 1000)) {
                    toSlide((settings['auto_swipe_back_to'] - 1));
                    swipebackTime = 0;
                }
            }, 1000);

        }
    }
	
	if(typeof(settings['disable_googleanalytics'])=='undefined' || parseFloat(settings['disable_googleanalytics'])==0){
		
		var googleAnalytics="<script>";
		  googleAnalytics+="(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
		  googleAnalytics+="(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
		  googleAnalytics+="m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
		  googleAnalytics+="})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";

		  googleAnalytics+="ga('create', 'UA-102837285-1', 'auto');";
		  googleAnalytics+="ga('send', 'pageview');";

		googleAnalytics+="</script>";
        $('body').prepend(googleAnalytics);
	}
	
    if ((settings['auto_swipe_back_after'] == 0 || typeof(settings['auto_swipe_back_after']) == 'undefined') && parseFloat(settings['auto_slide_pages']) > 0) {
        var nextSlide = 1;
        setInterval(function () {
            toSlide(nextSlide);
            nextSlide++;
            if (nextSlide > myswiper.slides.length - 1) {
                nextSlide = 0;
            }
        }, (parseFloat(settings['auto_slide_pages']) * 1000));
    }

    if (md.mobile() == null) {
        $('body').bind('mousemove', function (e) {
            standbyTime = 0;
            swipebackTime = 0;
            disableStandby();
        });
    }

    $('body').bind('touchend click', function (e) {
        setTimeout(function () {
            standbyTime = 0;
            swipebackTime = 0;
            disableStandby();
        }, 100);
    });

    if (parseFloat(settings['standby_after']) > 0) {
        setInterval(function () {
            standbyTime += 5000;
            if (standbyActive != true) {
                if (standbyTime >= ((settings['standby_after'] * 1000) * 60)) {
                    $('body').addClass('standby');
                    $('.swiper-container').hide();
                    if (objectlength(columns_standby) > 0) buildStandby();
                    if (typeof(_STANDBY_CALL_URL) !== 'undefined' && _STANDBY_CALL_URL !== '') {
                        $.get(_STANDBY_CALL_URL);
                        standbyActive = true;
                    }
                }
            }
        }, 5000);
    }
}

function toSlide(num) {
    if (typeof(myswiper) !== 'undefined') myswiper.slideTo(num, 1000, false);
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

function buildScreens() {
    var num = 1;
    var allscreens = {}
    for (t in screens) {
        if (typeof(screens[t]['maxwidth']) !== 'undefined' && typeof(screens[t]['maxheight']) !== 'undefined') {
            allscreens[screens[t]['maxwidth']] = screens[t];
        }
        else {
            var maxwidth = 5000;
            if (typeof(allscreens[maxwidth]) == 'undefined') {
                allscreens[maxwidth] = {}
                allscreens[maxwidth]['maxwidth'] = maxwidth;
                allscreens[maxwidth]['maxheight'] = maxwidth;
            }
            allscreens[maxwidth][t] = screens[t];
        }
    }
    screens = allscreens;
    keys = Object.keys(screens);
    len = keys.length;
    keys.sort(function(a, b){return a-b});
    for (i = 0; i < len; i++) {
        t = keys[i];
        if (
            typeof(screens[t]['maxwidth']) == 'undefined' ||
            (
                parseFloat(screens[t]['maxwidth']) >= $(window).width() &&
                parseFloat(screens[t]['maxheight']) >= $(window).height()
            )
        ) {
            for (s in screens[t]) {
                if (s !== 'maxwidth' && s !== 'maxheight') {
                    var screenhtml = '<div class="screen screen' + s + ' swiper-slide slide' + s + '"';
					if (typeof(screens[t][s]['background']) === 'undefined') {
						screens[t][s]['background'] = settings['background_image'];
					}
                    if (typeof(screens[t][s]['background']) !== 'undefined') {
                        if (screens[t][s]['background'].indexOf("/") > 0) screenhtml += 'style="background-image:url(\'' + screens[t][s]['background'] + '\');"';
                        else screenhtml += 'style="background-image:url(\'img/' + screens[t][s]['background'] + '\');"';
                    }
                    else if (typeof(screens[t][s][1]) !== 'undefined' && typeof(screens[t][s][1]['background']) !== 'undefined') {
                        if (screens[t][s][1]['background'].indexOf("/") > 0) screenhtml += 'style="background-image:url(\'' + screens[t][s][1]['background'] + '\');"';
                        else screenhtml += 'style="background-image:url(\'img/' + screens[t][s][1]['background'] + '\');"';
                    }

                    screenhtml += '><div class="row"></div></div>';
                    $('div.contents').append(screenhtml);

                    if (defaultcolumns === false) {
                        if (!parseFloat(settings['hide_topbar']) == 1) {
                            if (typeof(columns['bar']) == 'undefined') {
                                columns['bar'] = {}
                                columns['bar']['blocks'] = ['logo', 'miniclock', 'settings']
                            }
                            getBlock(columns['bar'], 'bar', 'div.screen' + s + ' .row .colbar', false);
                        }

                        for (cs in screens[t][s]['columns']) {
                            c = screens[t][s]['columns'][cs];
                            getBlock(columns[c], c, 'div.screen' + s + ' .row .col' + c, false);
                        }
                    }
                    else {
						
                        if (parseFloat(settings['hide_topbar']) == 0) $('body .row').append('<div class="col-sm-undefined col-xs-12 sortable colbar transbg dark"><div data-id="logo" class="logo col-xs-2">' + settings['app_title'] + '<div></div></div><div data-id="miniclock" class="miniclock col-xs-8 text-center"><span class="weekday"></span> <span class="date"></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span class="clock"></span></div><div data-id="settings" class="settings settingsicon text-right" data-toggle="modal" data-target="#settingspopup"><em class="fa fa-cog" /></div></div></div>');
                        if (typeof(settings['default_columns']) == 'undefined' || parseFloat(settings['default_columns']) == 3) {
                            $('body .row').append('<div class="col-xs-5 sortable col1" data-colindex="1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
                            $('body .row').append('<div class="col-xs-5 sortable col2" data-colindex="2"><div class="block_weather containsweatherfull"></div><div class="auto_media"></div><div class="auto_states"></div></div>');
                            $('body .row').append('<div class="col-xs-2 sortable col3" data-colindex="3"><div class="auto_clock"></div><div class="auto_sunrise"></div><div class="auto_buttons"></div></div>');

                            if (typeof(settings['wu_api']) !== 'undefined' && settings['wu_api'] !== "" && settings['wu_api'] !== 0 && typeof(settings['wu_city']) !== 'undefined' && settings['wu_city'] !== "") {
                                $('.col2').prepend('<div class="mh transbg big block_currentweather_big col-xs-12 containsweather"><div class="col-xs-1"><div class="weather" id="weather"></div></div><div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div></div>');
                                if (typeof(loadWeatherFull) !== 'function') $.ajax({
                                    url: 'js/weather.js',
                                    async: false,
                                    dataType: 'script'
                                });

                                loadWeatherFull(settings['wu_city'], settings['wu_country'], $('#weatherfull'));
                                loadWeather(settings['wu_city'], settings['wu_country']);

                                setInterval(function () {
                                    loadWeatherFull(settings['wu_city'], settings['wu_country'], $('#weatherfull'));
                                    loadWeather(settings['wu_city'], settings['wu_country']);
                                }, (60000 * 30));
                            }

                            $('.col3 .auto_clock').html('<div class="transbg block_clock col-xs-12 text-center"><h1 id="clock" class="clock"></h1><h4 id="weekday" class="weekday"></h4><h4 id="date" class="date"></h4></div>');
                            $('.col3 .auto_sunrise').html('<div class="block_sunrise col-xs-12 transbg text-center sunriseholder"><em class="wi wi-sunrise"></em><span id="sunrise" class="sunrise"></span><em class="wi wi-sunset"></em><span id="sunset" class="sunset"></span></div>');
                            if (typeof(buttons) !== 'undefined') {
                                for (b in buttons) {
                                    if (buttons[b].isimage) $('.col3 .auto_buttons').append(loadImage(b, buttons[b]));
                                    else $('.col3 .auto_buttons').append(loadButton(b, buttons[b]));
                                }
                            }
                        }
                        else if (parseFloat(settings['default_columns']) == 1) {
                            $('body .row').append('<div class="col-xs-12 sortable col1" data-colindex="1"><div class="auto_switches"></div><div class="auto_dimmers"></div></div>');
                        }
                        else if (parseFloat(settings['default_columns']) == 2) {
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

    if (typeof(settings['edit_mode']) !== 'undefined' && settings['edit_mode'] == 1) {
        $('.swiper-container').addClass('edit');
        setTimeout(function () {
            startSortable();
        }, 2000);
    }

    startSwiper();
}

function startSwiper() {
    if (md.mobile() == null || md.tablet() !== null) {
        if ($('.swiper-container .screen').length > 1) {
            $.ajax({url: 'vendor/swiper/js/swiper.min.js', async: false, dataType: 'script'}).done(function () {
                $('<link href="vendor/swiper/css/swiper.min.css" rel="stylesheet">').appendTo("head");
                setTimeout(function () {
                    myswiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: false,
                        effect: settings['slide_effect'],
                        keyboardControl: true
                    });
					
                }, 2000);
            });
        }
    }
}

function initMap() {
    if ($('#trafficm').length > 0) {
        showMap('trafficm');
        setInterval(function () {
            showMap('trafficm');
        }, (60000 * 5));
    }
}

function showMap(mapid, map) {
    if (typeof(settings['gm_api']) == 'undefined'
        || settings['gm_api'] == ""
        || settings['gm_api'] == 0) {
        console.log('Please, set Google Maps API KEY!');
	infoMessage('Info:', 'Please, set Google Maps API KEY!', 8000);
        return
    }
    if (typeof(map) !== 'undefined') {
        var map = new google.maps.Map(document.getElementById(mapid), {
            zoom: map.zoom,
            center: {lat: map.latitude, lng: map.longitude}
        });
    } else {
        var map = new google.maps.Map(document.getElementById(mapid), {
            zoom: parseFloat(settings['gm_zoomlevel']),
            center: {lat: parseFloat(settings['gm_latitude']), lng: parseFloat(settings['gm_longitude'])}
        });
    }

    var transitLayer = new google.maps.TrafficLayer();
    transitLayer.setMap(map);
}

function setClassByTime() {
    var d = new Date();
    var n = d.getHours();

    if (n >= 20 || n <= 5) {
        newClass = 'night';
    }
    else if (n >= 6 && n <= 10) {
        newClass = 'morning';
    }
    else if (n >= 11 && n <= 15) {
        newClass = 'noon';
    }
    else if (n >= 16 && n <= 19) {
        newClass = 'afternoon';
    }

    for (t in screens) {
        for (s in screens[t]) {
            if (typeof(screens[t][s]['background_' + newClass]) !== 'undefined') {
                if (screens[t][s]['background_' + newClass].indexOf("/") > 0) $('.screen.screen' + s).css('background-image', 'url(\'' + screens[t][s]['background_' + newClass] + '\')');
                else $('.screen.screen' + s).css('background-image', 'url(\'img/' + screens[t][s]['background_' + newClass] + '\')');
            }
        }
    }

    $('body').removeClass('morning noon afternoon night').addClass(newClass);
}

function infoMessage(sub, msg, timeOut){
	if (timeOut == null){
		timeOut = 8000;
	}
	if (timeOut == 0) {
		$('body').append('<div class="update">' + sub + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg + '&nbsp;&nbsp;</div>');
	}
	else {
	$('body').append('<div class="update">' + sub + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg + '&nbsp;&nbsp;</div>');
		setTimeout(function(){
			$(".update").fadeOut();
		}, timeOut);
	}
}
function infoDevicsSwitch(msg){
	$('body').append('<div class="update">&nbsp;&nbsp;' + msg + '&nbsp;&nbsp;</div>');
		setTimeout(function(){
			$(".update").fadeOut();
		}, 10000);
}

function speak(textToSpeak) {
    var newUtterance = new SpeechSynthesisUtterance();
    newUtterance.text = textToSpeak;
    newUtterance.lang = settings['speak_lang'];
    window.speechSynthesis.speak(newUtterance);
}

function playAudio(file) {
    var key = $.md5(file);
    file = file.split('/');

    filename = file[(file.length - 1)].split('.');
    filename = filename[0];
    delete file[(file.length - 1)];

    if (!gettingDevices) {
        ion.sound({
            sounds: [
                {name: filename}
            ],

            path: file.join('/') + "/",
            preload: true,
            multiplay: false
        });

        ion.sound.play(filename);
    }
}

function triggerStatus(idx, value, device) {
    try {
        eval('getStatus_' + idx + '(idx,value,device)');
    }
    catch (err) {
    }
    if (typeof(onOffstates[idx]) !== 'undefined' && value !== onOffstates[idx]) {
        if (device['Status'] == 'On' || device['Status'] == 'Open') {
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['playsoundOn']) !== 'undefined') {
                playAudio(blocks[idx]['playsoundOn']);
            }
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['speakOn']) !== 'undefined') {
                speak(blocks[idx]['speakOn']);
            }
	    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['messageOn']) !== 'undefined') {
                infoDevicsSwitch(blocks[idx]['messageOn']);
	    }
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['gotoslideOn']) !== 'undefined') {
                toSlide((blocks[idx]['gotoslideOn'] - 1));
                standbyTime=0;
			    disableStandby();
            }
        }
        if (device['Status'] == 'Off' || device['Status'] == 'Closed') {
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['playsoundOff']) !== 'undefined') {
                playAudio(blocks[idx]['playsoundOff']);
            }
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['speakOff']) !== 'undefined') {
                speak(blocks[idx]['speakOff']);
            }
	    if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['messageOff']) !== 'undefined') {
                infoDevicsSwitch(blocks[idx]['messageOff']);
	    }
            if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['gotoslideOff']) !== 'undefined') {
                toSlide((blocks[idx]['gotoslideOff'] - 1));
                standbyTime=0;
			    disableStandby();
            }
        }
    }
    onOffstates[idx] = value;
}

function triggerChange(idx, value, device) {
    if (typeof(oldstates[idx]) !== 'undefined' && value !== oldstates[idx]) {
        //disableStandby();
        try {
            eval('getChange_' + idx + '(idx,value,device)');
        }
        catch (err) {
        }

        if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['playsound']) !== 'undefined') {
            playAudio(blocks[idx]['playsound']);
        }
        if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['speak']) !== 'undefined') {
            speak(blocks[idx]['speak']);
        }
        if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['gotoslide']) !== 'undefined') {
            toSlide((blocks[idx]['gotoslide'] - 1));
        }
        if (typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['openpopup']) !== 'undefined') {
            var random = getRandomInt(1, 100000);
            $('.modal.openpopup,.modal-backdrop').remove();

            var html = '<div class="modal fade openpopup" id="popup_' + random + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<iframe src="' + blocks[idx]['openpopup']['url'] + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
            $('#popup_' + random).modal('show');

            if (typeof(blocks[idx]['openpopup']['auto_close']) !== 'undefined') {
                setTimeout(function () {
                    $('.modal.openpopup,.modal-backdrop').remove();
                }, (parseFloat(blocks[idx]['openpopup']['auto_close']) * 1000));
            }
        }
    }
    oldstates[idx] = value;
}

function disableStandby() {

    if (standbyActive == true) {
        standbyTime = 0;
        if (typeof(_END_STANDBY_CALL_URL) !== 'undefined' && _END_STANDBY_CALL_URL !== '') {
            $.get(_END_STANDBY_CALL_URL);
        }
    }

    if (objectlength(columns_standby) > 0) {
        $('div.screen').show();
    }
    $('.screenstandby').remove();
    $('body').removeClass('standby');
    $('.swiper-container').show();
    standbyActive = false;

}

//END OF STANDBY FUNCTION

function loadMaps(b, map) {
    var random = getRandomInt(1, 100000);

    if (typeof(map.link) !== 'undefined') {
        var html = '<div class="modal fade" id="trafficmap_frame_' + b + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<iframe data-popup="' + map.link + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);
    }

    var key = 'UNKNOWN';
    if (typeof(map.key) !== 'undefined') key = map.key;

    var width = 12;
    if (typeof(map.width) !== 'undefined') width = map.width;
    if (typeof(map.link) !== 'undefined') var html = '<div class="col-xs-' + width + ' mh hover swiper-no-swiping transbg block_trafficmap" data-toggle="modal" data-target="#trafficmap_frame_' + b + '" onclick="setSrc(this);" ';
    else var html = '<div class="col-xs-' + width + ' mh swiper-no-swiping transbg block_trafficmap" ';
    if (typeof(map.height) !== 'undefined') html += ' style="height:' + map.height + 'px !important;"';
    html += '>';
    html += '<div id="trafficmap_' + b + '" data-id="maps.' + key + '" class="trafficmap"></div>';
    html += '</div>';
    setTimeout(function () {
        showMap('trafficmap_' + b, map);
    }, 1000)
    return html;
}

function loadButton(b, button) {
    var random = getRandomInt(1, 100000);
    if ($('#button_' + b).length == 0) {
        var html = '<div class="modal fade" id="button_' + b + '_' + random + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<iframe data-popup="' + button.url + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);

        if (button.log == true) {
            if (typeof(getLog) !== 'function') $.ajax({url: 'js/log.js', async: false, dataType: 'script'});
            $('#button_' + b + '_' + random + ' .modal-body').html('');
            getLog($('#button_' + b + '_' + random + ' .modal-body'), button.level, true);
        }

    }
    var width = 12;
    if (typeof(button.width) !== 'undefined') width = button.width;

    var key = 'UNKNOWN';
    if (typeof(button.key) !== 'undefined') key = button.key;

    if (typeof(button.newwindow) !== 'undefined') {
        var html = '<div class="col-xs-' + width + ' hover transbg buttons-' + key + '" data-id="buttons.' + key + '" onclick="window.open(\'' + button.url + '\')">';
    }
    else if (typeof(button.slide) !== 'undefined') {
        var html = '<div class="col-xs-' + width + ' hover transbg buttons-' + key + '" data-id="buttons.' + key + '" onclick="toSlide(' + (parseFloat(button.slide) - 1) + ')">';
    }
    else {
        var html = '<div class="col-xs-' + width + ' hover transbg buttons-' + key + '" data-id="buttons.' + key + '" data-toggle="modal" data-target="#button_' + b + '_' + random + '" onclick="setSrc(this);">';
    }

    if (typeof(button.title) !== 'undefined') {
        html += '<div class="col-xs-4 col-icon">';
    }
    else {
        html += '<div class="col-xs-12 col-icon">';
    }
    if (typeof(button.image) !== 'undefined') html += '<img class="buttonimg" src="' + button.image + '" />';
    else html += '<em class="fa ' + button.icon + ' fa-small"></em>';
    html += '</div>';
    if (typeof(button.title) !== 'undefined') {
        html += '<div class="col-xs-8 col-data">';
        html += '<strong class="title">' + button.title + '</strong><br>';
        html += '<span class="state"></span>';
        html += '</div>';
    }
    html += '</div>';
    return html;
}

function loadFrame(f, frame) {

    var key = 'UNKNOWN';
    if (typeof(frame.key) !== 'undefined') key = frame.key;

    var width = 12;
    if (typeof(frame.width) !== 'undefined') width = frame.width;
    var html = '<div data-id="frames.' + key + '" class="col-xs-' + width + ' hover transbg swiper-no-swiping imgblock imgblock' + f + '" style="height:' + frame.height + 'px;padding:0px !important;">';
    html += '<div class="col-xs-12 col-data" style="padding:0px !important;">';
    html += '<iframe src="' + frame.frameurl + '" style="width:100%;border:0px;height:' + (frame.height - 14) + 'px;"></iframe>';
    html += '</div>';
    html += '</div>';

    var refreshtime = 60000;
    if (typeof(frame.refreshiframe) !== 'undefined') refreshtime = frame.refreshiframe;
    setInterval(function () {
        reloadFrame(f, frame);
    }, refreshtime);

    return html;
}

function reloadFrame(i, frame) {
    var sep = '?';

    if (typeof(frame.frameurl) !== 'undefined') {
        var img = frame.frameurl;
        if (img.indexOf("?") != -1) var sep = '&';

        if (img.indexOf("?") != -1) {
            var newimg = img.split(sep + 't=');
            img = newimg;
        }
        img += sep + 't=' + (new Date()).getTime();
    }

    $('.imgblock' + i).find('iframe').attr('src', img);
}

function loadImage(i, image) {
    if (typeof(image.image) !== 'undefined') {
        var img = image.image;
    }

    if ($('.imgblockopens' + i).length == 0 && typeof(image.url) !== 'undefined') {
        var html = '<div class="modal fade imgblockopens' + i + '" id="' + i + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<iframe data-popup="' + image.url + '" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> ';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);
    }

    var key = 'UNKNOWN';
    if (typeof(image.key) !== 'undefined') key = image.key;

    var width = 12;
    if (typeof(image.width) !== 'undefined') width = image.width;
    var html = '';

    if (typeof(image.url) !== 'undefined') html += '<div data-id="buttons.' + key + '" class="col-xs-' + width + ' hover transbg imgblock imgblock' + i + '" data-toggle="modal" data-target="#' + i + '" onclick="setSrc(this);">';
    else html += '<div class="col-xs-' + width + ' transbg imgblock imgblock' + i + '" data-id="buttons.' + key + '">';
    html += '<div class="col-xs-12">';

    if (img == 'moon') {
        html += '<div class="moon">';
        img = getMoonInfo(image);
        html += '</div>';
    } else {
        html += '<img src="' + img + '" style="max-width:100%;" />';
    }
    html += '</div>';
    html += '</div>';

    var refreshtime = 60000;
    if (typeof(image.refresh) !== 'undefined') refreshtime = image.refresh;
    if (typeof(image.refreshimage) !== 'undefined') refreshtime = image.refreshimage;
    setInterval(function () {
        reloadImage(i, image, true);
    }, refreshtime);

    var refreshtime = 60000;
    if (typeof(image.refreshiframe) !== 'undefined') refreshtime = image.refreshiframe;
    setInterval(function () {
        reloadIframe(i, image, true);
    }, refreshtime);

    return html;
}

function reloadImage(i, image) {
    var sep = '?';

    if (typeof(image.image) !== 'undefined') {
        var img = image.image;
        if (img.indexOf("?") != -1) var sep = '&';

        if (img.indexOf("?") != -1) {
            var newimg = img.split(sep + 't=');
            img = newimg;
        }
        img += sep + 't=' + (new Date()).getTime();
    }

    $('.imgblock' + i).find('img').attr('src', img);
}

function reloadIframe(i, image) {
    var sep = '?';

    if (typeof(image.url) !== 'undefined') {
        var url = image.url;
        if (url.indexOf("?") != -1) var sep = '&';

        if (url.indexOf("?") != -1) {
            var newurl = url.split(sep + 't=');
            url = newurl;
        }
        url += sep + 't=' + (new Date()).getTime();
    }

    if (typeof($('.imgblockopens' + i + ' iframe').attr('src') !== 'undefined')) {
        $('.imgblockopens' + i + ' iframe').attr('src', url);
    }
}

function getMoonInfo(image) {
    req = $.getJSONP({
        url: settings['domoticz_ip'] + "/json.htm?username=" + usrEnc + "&password=" + pwdEnc + "&type=command&param=getuservariable&idx=" + settings['idx_moonpicture'] + "&jsoncallback=?",
        type: 'GET', async: true, contentType: "application/json", dataType: 'jsonp',
        format: "json",
        success: function (data) {
            for (r in data.result) {
                var src = '';
                var device = data.result[r];
                var value = device['Value'];
                src = 'img/moon/' + value;
                image.image = 'img/moon/' + value;
                $("div.moon").replaceWith('<div class="moon"><img src="' + src + '" style="width:100%;" /></div>');
            }
        }
    });
}

function appendHorizon(columndiv) {
    var html = '<div data-id="horizon" class="containshorizon">';
    html += '<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x07\')">';
    html += '<em class="fa fa-chevron-left fa-small"></em>';
    html += '</div>';
    html += '<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E4x00\')">';
    html += '<em class="fa fa-pause fa-small"></em>';
    html += '</div>';
    html += '<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x06\')">';
    html += '<em class="fa fa-chevron-right fa-small"></em>';
    html += '</div>';
    html += '</div>';
    $(columndiv).append(html);
}

function appendStationClock(columndiv, col, width) {
    $(columndiv).append(
        '<div data-id="clock" class="transbg block_' + col + ' col-xs-' + width + ' text-center">' +
        '<canvas id="clock" width="150" height="150">Your browser is unfortunately not supported.</canvas>' +
        '</div>'
    );
    if (typeof(StationClock) !== 'function') $.ajax({url: 'vendor/stationclock.js', async: false, dataType: 'script'});

    var clock = new StationClock("clock");
    clock.body = StationClock.RoundBody;
    clock.dial = StationClock.GermanStrokeDial;
    clock.hourHand = StationClock.PointedHourHand;
    clock.minuteHand = StationClock.PointedMinuteHand;
    if (settings['hide_seconds_stationclock']) {
        clock.secondHand = false;
    } else {
        clock.secondHand = StationClock.HoleShapedSecondHand;
        if (typeof(settings['boss_stationclock']) == 'undefined') clock.boss = StationClock.NoBoss;
        else if (settings['boss_stationclock'] == 'RedBoss') clock.boss = StationClock.RedBoss;
    }

    clock.minuteHandBehavoir = StationClock.BouncingMinuteHand;
    clock.secondHandBehavoir = StationClock.OverhastySecondHand;

    window.setInterval(function () {
        clock.draw()
    }, 50);
}

function appendStreamPlayer(columndiv) {
    this.random = getRandomInt(1, 100000);
    this.html = '<div data-id="streamplayer" class="transbg containsstreamplayer' + this.random + '">'
        + '<div class="col-xs-12 transbg smalltitle"><h3></h3></div>'
        + '<audio class="audio1" preload="none"></audio>'
        + '<div class="col-xs-4 transbg hover text-center btnPrev">'
        + '<em class="fa fa-chevron-left fa-small"></em>'
        + '</div>'
        + '<div class="col-xs-4 transbg hover text-center playStream">'
        + '<em class="fa fa-play fa-small stateicon"></em>'
        + '</div>'
        + '<div class="col-xs-4 transbg hover text-center btnNext">'
        + '<em class="fa fa-chevron-right fa-small"></em>'
        + '</div>'
        + '</div>';
    $(columndiv).append(this.html);

    var streamelement = '.containsstreamplayer' + random;

    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            tracks = _STREAMPLAYER_TRACKS,
            trackCount = tracks.length,
            npTitle = $(streamelement + ' h3'),
            audio = $(streamelement + ' .audio1').bind('play', function () {
                $(streamelement + ' .stateicon').removeClass('fa fa-play');
                $(streamelement + ' .stateicon').addClass('fa fa-pause');
                playing = true;
            }).bind('pause', function () {

                $(streamelement + ' .stateicon').removeClass('fa fa-pause');
                $(streamelement + ' .stateicon').addClass('fa fa-play');
                playing = false;
            }).get(0),
            btnPrev = $(streamelement + ' .btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                } else {
                    index = 0
                    loadTrack(trackCount - 1);
                }
                if (playing) {
                    audio.play();
                }
                audio.pause();
            }),
            btnNext = $(streamelement + ' .btnNext').click(function () {
                if ((index + 1) < trackCount) index++;
                else index = 0;

                loadTrack(index);

                if (playing) {
                    audio.play();
                }
                audio.pause();
            }),
            loadTrack = function (id) {
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = tracks[id].file;
            };
        loadTrack(index);
    }

    $(streamelement + ' .playStream').click(function () {
        var myAudio = $(streamelement + ' .audio1').get(0);
        if (myAudio.paused) {
            $(streamelement + ' .stateicon').removeClass('fa fa-play');
            $(streamelement + ' .stateicon').addClass('fa fa-pause');
            myAudio.play();
        } else {
            $(streamelement + ' .stateicon').removeClass('fa fa-pause');
            $(streamelement + ' .stateicon').addClass('fa fa-play');
            myAudio.pause();
        }
    });
}

function getDevices(override) {
    if (typeof(override) == 'undefined') override = false;
    if (!sliding || override) {
        if (typeof(req) !== 'undefined') req.abort();
        gettingDevices = true;
		
		var usrinfo ='';
		if(typeof(usrEnc)!=='undefined' && usrEnc!=='') usrinfo = 'username=' + usrEnc + '&password=' + pwdEnc + '&';
        req = $.get({
            url: settings['domoticz_ip'] + '/json.htm?'+usrinfo+'type=devices&plan=' + settings['room_plan'] + '&filter=all&used=true&order=Name',
            type: 'GET', async: true, contentType: "application/json",
            error: function (jqXHR, textStatus) {
                console.error("Domoticz error!\nPlease, double check the path to Domoticz in Settings!");
				infoMessage('<font color="red">Domoticz error!', 'double check the path to Domoticz in Settings!</font>', 0);
            },
            success: function (data) {
                
				/*
				data = `{
   "ActTime" : 1515443638,
   "ServerTime" : "2018-01-08 21:33:58",
   "Sunrise" : "08:42",
   "Sunset" : "16:46",
   "result" : [
      {
         "AddjMulti" : 1.0,
         "AddjMulti2" : 1.0,
         "AddjValue" : 0.0,
         "AddjValue2" : 0.0,
         "BatteryLevel" : 255,
         "CustomImage" : 0,
         "Data" : "20.9 C",
         "Description" : "",
         "Favorite" : 1,
         "HardwareID" : 68,
         "HardwareName" : "ToonDummy",
         "HardwareType" : "Dummy (Does nothing, use for virtual switches only)",
         "HardwareTypeVal" : 15,
         "HaveTimeout" : false,
         "ID" : "141CB",
         "LastUpdate" : "2018-01-08 21:32:14",
         "Name" : "Woonkamer",
         "Notifications" : "false",
         "PlanID" : "0",
         "PlanIDs" : [ 0 ],
         "Protected" : false,
         "ShowNotifications" : true,
         "SignalLevel" : "-",
         "SubType" : "LaCrosse TX3",
         "Temp" : 20.949999999999999,
         "Timers" : "false",
         "Type" : "Temp",
         "TypeImg" : "temperature",
         "Unit" : 1,
         "Used" : 1,
         "XOffset" : "0",
         "YOffset" : "0",
         "idx" : "379"
      },{
         "AddjMulti" : 1.0,
		"AddjMulti2" : 1.0,
		"AddjValue" : 0.0,
		"AddjValue2" : 0.0,
		"BatteryLevel" : 255,
		"CustomImage" : 0,
		"Data" : "Humidity 64 %",
		"Description" : "",
		"Favorite" : 1,
		"HardwareID" : 7,
		"HardwareName" : "Xiaomi Gateway",
		"HardwareType" : "Xiaomi Gateway",
		"HardwareTypeVal" : 95,
		"HaveTimeout" : false,
		"Humidity" : 64,
		"HumidityStatus" : "Wet",
		"ID" : "2AFE",
		"LastUpdate" : "2018-01-04 12:29:42",
		"Name" : "Badkamer Vochtigheid",
		"Notifications" : "false",
		"PlanID" : "0",
		"PlanIDs" : [ 0 ],
		"Protected" : false,
		"ShowNotifications" : true,
		"SignalLevel" : "-",
		"SubType" : "LaCrosse TX3",
		"Timers" : "false",
		"Type" : "Humidity",
		"TypeImg" : "temperature",
		"Unit" : 1,
		"Used" : 1,
		"XOffset" : "0",
		"YOffset" : "0",
		"idx" : "51"
      }
   ],
   "status" : "OK",
   "title" : "Devices"
}`
				data=$.parseJSON(data);*/
				gettingDevices = false;
                if (!sliding || override) {
                    $('.solar').remove();
                    if ($('.sunrise').length > 0) $('.sunrise').html(data.Sunrise);
                    if ($('.sunset').length > 0) $('.sunset').html(data.Sunset);

                    $('div.newblocks.plugins').html('');
                    $('div.newblocks.domoticz').html('');
                    if (settings['edit_mode']) {
                        $('div.newblocks.plugins').append('<div data-id="clock"><span class="title">' + language.editmode.clock + '</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="currentweather_big"><span class="title">' + language.editmode.currentweather_big + '</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="garbage"><span class="title">' + language.settings.garbage.title + '</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="streamplayer"><span class="title">Radio</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="nzbget"><span class="title">NZBget</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="sunrise"><span class="title">' + language.editmode.sunrise + '</set</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="weather"><span class="title">' + language.settings.weather.title + '</span></div>');
                        $('div.newblocks.plugins').append('<div data-id="news"><span class="title">' + language.editmode.news + '</span></div>');
                    }

                    for (r in data.result) {
                        var device = data.result[r];
                        var idx = device['idx'];

                        if (device['Type'] === 'Group' || device['Type'] === 'Scene') idx = 's' + device['idx'];

                        if (typeof(blocks) !== 'undefined' && typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['title']) !== 'undefined') {
                            device['Name'] = blocks[idx]['title'];
                        }

                        if (settings['edit_mode']) $('div.newblocks.domoticz').append('<div data-id="' + idx + '"><span class="title">' + device['Name'] + '</span></div>');
                        alldevices[idx] = device;

                        if (
                            (
                                settings['auto_positioning'] == 1 &&
                                (
                                    (settings['use_favorites'] == 1 && device['Favorite'] == 1) ||
                                    settings['use_favorites'] == 0
                                )
                            ) ||
                            (
                                settings['auto_positioning'] == 0 &&
                                (

                                    $('.block_' + idx).length > 0 ||
                                    $('.block_' + idx + '_1').length > 0 ||
                                    $('.block_' + idx + '_2').length > 0 ||
                                    $('.block_' + idx + '_3').length > 0 ||
                                    $('.block_graph_' + idx).length > 0
                                )
                            )
                        ) {
                            if (settings['edit_mode']) $('div.newblocks > div[data-id="' + idx + '"]').remove();

                            var width = 4;
                            switch (device['SwitchType']) {
                                case 'Selector':
                                    width = 8;
                                    break;
                                case 'Media Player':
                                case 'Dimmer':
                                    width = 12;
                            }
							
                            if (typeof(blocks) !== 'undefined' && typeof(blocks[idx]) !== 'undefined'){
								if ($(window).width()<768 && typeof(blocks[idx]['width_smartphone']) !== 'undefined'){
									width = blocks[idx]['width_smartphone'];
								}
								else if (typeof(blocks[idx]['width']) !== 'undefined'){
									width = blocks[idx]['width'];
								}
							}

                            if ($('.block_' + idx).length <= 0) {
                                $(getAutoAppendSelector(device)).append('<div class="mh transbg block_' + idx + '"></div>');
                            }

                            $('div.block_' + idx).data('light', idx);
                            if (typeof(settings['default_columns']) == 'undefined' || parseFloat(settings['default_columns']) == 3) $('div.block_' + idx).addClass('col-xs-' + width);
                            else if (parseFloat(settings['default_columns']) == 1) $('div.block_' + idx).addClass('col-xs-3');
                            else if (parseFloat(settings['default_columns']) == 2) $('div.block_' + idx).addClass('col-xs-4');

                            for (var i = 1; i <= 5; i++) {
                                if ($('div.block_' + idx + '_' + i).length > 0) {
                                    $('div.block_' + idx + '_' + i).data('light', idx);
                                    $('div.block_' + idx + '_' + i).addClass('col-xs-' + width);
                                    $('div.block_' + idx + '_' + i).html('');
                                }
                            }

                            var addHTML = true;
                            var html = '';

                            if ($('div.block_graph_' + idx).length > 0) {
                                getGraphs(device, false);
                            }

                            triggerStatus(idx, device['LastUpdate'], device);
                            triggerChange(idx, device['LastUpdate'], device);

                            try {
                                html += eval('getBlock_' + idx + '(device,idx,data.result)');
                            }
                            catch (err) {
                                var response = handleDevice(device, idx);
                                html = response[0];
                                addHTML = response[1];
                            }

                            if (typeof($('.block_' + idx).attr('onclick')) !== 'undefined') {
                                $('div.block_' + idx).addClass('hover');
                            }
                            if (addHTML) {
                                $('div.block_' + idx).html(html);
                            }

                            if ($('div.block_' + idx).hasClass('hover')) {
                                $('.block_' + idx + '.transbg.hover').on('touchstart', function () {
                                    $(this).addClass('hovered');
                                    setTimeout(function () {
                                        $('.transbg.hover').removeClass('hovered');
                                    }, 200);
                                });
                            }
                        }
                    }
                    if (typeof(afterGetDevices) === 'function') afterGetDevices();
                }

                enableRefresh();
            }
        });
    } else {
        enableRefresh();
    }
}

function enableRefresh() {
    if (!settings['edit_mode']) {
        setTimeout(function () {
            getDevices();
        }, (settings['domoticz_refresh'] * 1000));
    }
}

function getAutoAppendSelector(device) {
    switch (device['Type']) {
        case 'Thermostat':
        case 'Temp + Humidity':
        case 'Temp + Humidity + Baro':
        case 'Usage':
        case 'Temp':
        case 'Humidity':
        case 'Heating':
        case 'General':
        case 'Wind':
        case 'Rain':
        case 'RFXMeter':
        case 'Security':
        case 'P1 Smart Meter':
        case 'P1 Smart Meter USB':
        case 'Group':
        case 'Scene':
            return '.col2 .auto_states';
    }
    switch (device['SwitchType']) {
        case 'Motion Sensor':
        case 'Smoke Detector':
        case 'Contact':
            return '.col2 .auto_states';
        case 'Dimmer':
            return '.col1 .auto_dimmers';
        case 'Media Player':
            return '.col2 .auto_media';
    }
    return '.col1 .auto_switches';
}

function handleDevice(device, idx) {
    var buttonimg = '';
    if (device['Image'] === 'Fan') buttonimg = 'fan.png';
    if (device['Image'] === 'Heating') buttonimg = 'heating.png';
    var html = '';
    var addHTML = true;
    if (device.hasOwnProperty('SubType') && device['SubType'] in blocktypes['SubType']) {
        html += getStatusBlock(idx, device, blocktypes['SubType'][device['SubType']]);
        return [html, addHTML];
    }
    if (device.hasOwnProperty('HardwareType') && device['HardwareType'] in blocktypes['HardwareType']) {
        if (typeof(blocktypes['HardwareType'][device['HardwareType']]['icon']) !== 'undefined') {
            html += getStatusBlock(idx, device, blocktypes['HardwareType'][device['HardwareType']]);
        }
        else {
            var c = 1;
            for (de in blocktypes['HardwareType'][device['HardwareType']]) {
                html = getStatusBlock(idx, device, blocktypes['HardwareType'][device['HardwareType']][de], c);

                triggerStatus(idx + '_' + c, device['LastUpdate'], device);
                triggerChange(idx + '_' + c, device['LastUpdate'], device);

                $('div.block_' + idx + '_' + c).html(html);
                addHTML = false;
                c++;
            }
        }
        return [html, addHTML];
    }
    if (device.hasOwnProperty('HardwareName') && device['HardwareName'] in blocktypes['HardwareName']) {
        html += getStatusBlock(idx, device, blocktypes['HardwareName'][device['HardwareName']]);
        return [html, addHTML];
    }
    if (device.hasOwnProperty('SensorUnit') && device['SensorUnit'] in blocktypes['SensorUnit']) {
        html += getStatusBlock(idx, device, blocktypes['SensorUnit'][device['SensorUnit']]);
        return [html, addHTML];
    }
    if (device.hasOwnProperty('Type') && device['Type'] in blocktypes['Type']) {
        html += getStatusBlock(idx, device, blocktypes['Type'][device['Type']]);
        return [html, addHTML];
    }
    if (device.hasOwnProperty('Name') && device['Name'] in blocktypes['Name']) {
        html += getStatusBlock(idx, device, blocktypes['Name'][device['Name']]);
        return [html, addHTML];
    }

    switch (device['Type']) {
        case 'P1 Smart Meter':
            return getSmartMeterBlock(device, idx);
        case 'RFXMeter':
            if (device['SubType'] == 'RFXMeter counter') {
                return getRFXMeterCounterBlock(device, idx);
            }
            break;
        case 'YouLess Meter':
            return getYouLessBlock(device, idx);
        case 'General':
            if (device['SubType'] === 'kWh') {
                return getGeneralKwhBlock(device, idx);
            }
            break;
        case 'Temp + Humidity + Baro':
        case 'Temp + Humidity':
        case 'Humidity':
        case 'Heating':
        case 'Radiator 1':
            return getTempHumBarBlock(device, idx);
        case 'Thermostat':
            return getThermostatBlock(device, idx);
        case 'Group':
        case 'Scene':
            if (device['Type'] == 'Group') $('.block_' + idx).attr('onclick', 'switchDevice(this)');
            if (device['Type'] == 'Scene') $('.block_' + idx).attr('onclick', 'switchGroup(this)');

            html += iconORimage(idx, 'fa-lightbulb-o', buttonimg, getIconStatusClass(device['Status']) + ' icon');
            html += getBlockData(device, idx, language.switches.state_on, language.switches.state_off);
            return [html, addHTML];
    }

    switch (device['HardwareType']) {
        case 'Toon Thermostat':
            if (device['SubType'] !== 'SetPoint'
                && device['SubType'] !== 'AC'
            ) {
                return getSmartMeterBlock(device, idx);
            }
            if (device['SubType'] === 'SetPoint') {
                return getThermostatBlock(device, idx);
            }
            break;
        case 'Logitech Media Server':
            html = getLogitechControls(device);
            $('div.block_' + idx).addClass('with_controls');
            return [html, addHTML];
    }

    switch (device['SwitchType']) {
        case 'Dimmer':
            return getDimmerBlock(device, idx, buttonimg);
        case 'Door Contact':
        case 'Contact':
            if(device['Status'] === 'Closed') html += iconORimage(idx, '', 'door_closed.png', 'off icon', '', 2);
            else html += iconORimage(idx, '', 'door_open.png', 'on icon', '', 2);
            html += getBlockData(device, idx, language.switches.state_open, language.switches.state_closed);
            return [html, addHTML];
	case 'Door Lock':
	    if(device['Status'] === 'Unlocked') html += iconORimage(idx, 'fa-unlock', buttonimg, 'on icon', '', 2);
            else html += iconORimage(idx, 'fa-lock', buttonimg, 'off icon', '', 2);
            html += getBlockData(device, idx, language.switches.state_unlocked, language.switches.state_locked);
            return [html, addHTML];
        case 'Venetian Blinds EU':
        case 'Venetian Blinds US':
        case 'Venetian Blinds EU Inverted':
        case 'Venetian Blinds US Inverted':
        case 'Blinds':
        case 'Blinds Inverted':
            return getBlindsBlock(device, idx, false);
        case 'Blinds Percentage':
        case 'Blinds Percentage Inverted':
        case 'Venetian Blinds EU Percentage':
        case 'Venetian Blinds EU Inverted Percentage':
        case 'Venetian Blinds EU Percentage Inverted':
            return getBlindsBlock(device, idx, true);
        case 'Motion Sensor':
            html += '<div class="col-xs-4 col-icon">';
            html += '<img src="img/motion_' + getIconStatusClass(device['Status']) + '.png" class="' + getIconStatusClass(device['Status']) + ' icon" style="max-height:35px;" />';
            html += '</div>';
            html += getBlockData(device, idx, language.switches.state_movement, language.switches.state_nomovement);
            return [html, addHTML];
        case 'Smoke Detector':
            if (device['Status'] == 'Off' || device['Status'] == 'Normal') html += iconORimage(idx, '', 'heating.png', 'off icon', 'style="max-height:35px;"');
            else html += iconORimage(idx, '', 'heating.png', 'on icon', 'style="max-height:35px;border: 5px solid #F05F40;"');
            html += getBlockData(device, idx, language.switches.state_smoke, language.switches.state_nosmoke);
            return [html, addHTML];
        case 'Doorbell':
            html += iconORimage(idx, 'fa-bell-o', buttonimg, getIconStatusClass(device['Status']) + ' icon');
            html += getBlockData(device, idx, '', '');
            return [html, addHTML];
        case 'Media Player':
            if (device['HardwareType'] == 'Kodi Media Server') html += iconORimage(idx, '', 'kodi.png', 'on icon', '', 2);
            else html += iconORimage(idx, 'fa-film', '', 'on icon', '', 2);
            html += '<div class="col-xs-10 col-data">';
            html += '<strong class="title">' + device['Name'] + '</strong><br />';
            if (device['Data'] === '') {
                device['Data'] = language.misc.mediaplayer_nothing_playing;
                if (settings['hide_mediaplayer'] == 1) $('div.block_' + idx).hide();
            } else {
                $('div.block_' + idx).show();
            }
            html += '<span class="h4">' + device['Data'] + '</span>';
            return [html, addHTML];
    }

    if (typeof(device['LevelActions']) !== 'undefined' && device['LevelNames'] !== "") {
        var names = device['LevelNames'].split('|');

        html += iconORimage(idx, 'fa-lightbulb-o', buttonimg, getIconStatusClass(device['Status']) + ' icon');

        if ((typeof(device['SelectorStyle']) !== 'undefined' && device['SelectorStyle'] == 1)) {
            html += '<div class="col-xs-8 col-data">';
            html += '<strong class="title">' + device['Name'] + '</strong><br />';
            html += '<select onchange="slideDevice(' + device['idx'] + ',this.value);">';
            html += '<option value="">' + language.misc.select + '</option>';
            for (a in names) {
                if (parseFloat(a) > 0 || (a == 0 && (typeof(device['LevelOffHidden']) == 'undefined' || device['LevelOffHidden'] === false))) {

                    var s = '';
                    if ((a * 10) == parseFloat(device['Level'])) s = 'selected';
                    html += '<option value="' + (a * 10) + '" ' + s + '>' + names[a] + '</option>';
                }
            }
            html += '</select>';
            html += '</div>';
        }
        else {
            html += '<div class="col-xs-8 col-data" style="width: calc(100% - 50px);">';
            html += '<strong class="title">' + device['Name'] + '</strong><br />';
            html += '<div class="btn-group" data-toggle="buttons">';
            for (a in names) {
                if (parseFloat(a) > 0 || (a == 0 && (typeof(device['LevelOffHidden']) == 'undefined' || device['LevelOffHidden'] === false))) {
                    var s = '';
                    if ((a * 10) == parseFloat(device['Level'])) s = 'active';
                    html += '<label class="btn btn-default ' + s + '" onclick="slideDevice(' + device['idx'] + ',$(this).children(\'input\').val());">';
                    html += '<input type="radio" name="options" autocomplete="off" value="' + (a * 10) + '" checked>' + names[a];
                    html += '</label>';
                }
            }
            html += '</select>';
            html += '</div>';
            html += '</div>';
        }

    }
    else if (device['SubType'] == 'Custom Sensor') {
        this.icon = 'fa-question';
        if (device['Image'] === 'Water') this.icon = 'fa-tint';
        else if (device['Image'] === 'Heating') this.icon = 'fa-cutlery';

        html += iconORimage(idx, this.icon, '', 'on icon');
        html += '<div class="col-xs-8 col-data">';
        this.title = device['Name'];
        this.value = device['Data'];
        if (titleAndValueSwitch(idx)) {
            this.title = device['Data'];
            this.value = device['Name'];
        }
        html += '<strong class="title">' + this.title + '</strong><br />';
        html += '<span class="state">' + this.value + '</span>';

        if (showUpdateInformation(idx)) {
            html += '<br /><span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
        }
        html += '</div>';
    }
    else if (device['HardwareName'] == 'Dummy') {
        if (!isProtected(device, idx)) {
            $('.block_' + idx).attr('onclick', 'switchDevice(this)');
        }
        html += iconORimage(idx, 'fa-toggle-' + getIconStatusClass(device['Status']), '', getIconStatusClass(device['Status']) + ' icon');
        html += getBlockData(device, idx, language.switches.state_on, language.switches.state_off);
    }
    else if (device['Image'] == 'Alarm') {
        if (device['Status'] == 'Off') html += iconORimage(idx, 'fa-warning', '', 'off icon');
        else html += iconORimage(idx, 'fa-warning', '', 'on icon', 'style="color:#F05F40;"');

        html += getBlockData(device, idx, language.switches.state_on, language.switches.state_off);
    } else {
        if (!isProtected(device, idx)) {
            if (device['SwitchType'] == 'Push On Button') $('.block_' + idx).attr('onclick', 'switchOnOff(this,\'on\')');
            else if (device['SwitchType'] == 'Push Off Button') $('.block_' + idx).attr('onclick', 'switchOnOff(this,\'off\')');
            else $('.block_' + idx).attr('onclick', 'switchDevice(this)');
        }
        html += iconORimage(idx, 'fa-lightbulb-o', buttonimg, getIconStatusClass(device['Status']) + ' icon');
        html += getBlockData(device, idx, language.switches.state_on, language.switches.state_off);
    }

    return [html, addHTML];
}

function isProtected(device, idx) {
    return ((typeof(blocks[idx]) !== 'undefined' && typeof(blocks[idx]['protected']) !== 'undefined' && blocks[idx]['protected'] === true)
        || device['Protected'] === true);
}

function getIconStatusClass(deviceStatus) {
	if (deviceStatus != undefined)
	{
		switch (deviceStatus.toLowerCase()) {
			case 'off':
			case 'closed':
			case 'normal':
			case 'unlocked':
			return 'off';
		}
		return 'on';
	}
	else
	{
		return "off";
	}
}

function getLogitechControls(device) {
    this.html = '';
    this.html += iconORimage(device['idx'], 'fa-music', '', 'on icon', '', 2);
    this.html += '<div class="col-xs-10 col-data">';
    this.html += '<strong class="title">' + device['Name'] + '</strong><br />';
    this.html += '<span class="h4">' + device['Data'] + '</span>';
    this.html += '<div>';
    this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'Rewind\');"><em class="fa fa-arrow-circle-left fa-small"></em></a> ';
    this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'Stop\');"><em class="fa fa-stop-circle fa-small"></em></a> ';
    if (device['Status'] === 'Playing') {
        this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'Pause\');"><em class="fa fa-pause-circle fa-small"></em></a> ';
    } else {
        this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'Play\');"><em class="fa fa-play-circle fa-small"></em></a> ';
    }
    this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'Forward\');"><em class="fa fa-arrow-circle-right fa-small"></em></a>';
    this.html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'VolumeDown\');"><em class="fa fa-minus-circle fa-small"></em></a>';
    this.html += '&nbsp;';
    this.html += '<a href="javascript:controlLogitech(' + device['idx'] + ',\'VolumeUp\');"><em class="fa fa-plus-circle fa-small"></em></a>';
    this.html += '</div>';
    this.html += '</div>';

    return this.html;
}

function getSmartMeterBlock(device, idx) {
    if (device['SubType'] === 'Energy') {
        if ($('div.block_' + idx).length > 0) {
            allblocks[idx] = true;
        }
        this.usage = device['Usage'];
        if (typeof(device['UsageDeliv']) !== 'undefined' && (parseFloat(device['UsageDeliv']) > 0 || parseFloat(device['UsageDeliv']) < 0)) {
            this.usage = device['UsageDeliv'];
        }
		
		var data = device['Data'].split(';');
        var blockValues = [
            {
                icon: 'fa-plug',
                idx: idx + '_1',
                title: language.energy.energy_usage,
                value: this.usage,
                unit: ''
            },
            {
                icon: 'fa-plug',
                idx: idx + '_2',
                title: language.energy.energy_usagetoday,
                value: number_format(device['CounterToday'], settings['units'].decimals.kwh),
                unit: settings['units'].names.kwh
            },
            {
                icon: 'fa-plug',
                idx: idx + '_3',
                title: language.energy.energy_totals,
                value: number_format(device['Counter'], 0),
                unit: settings['units'].names.kwh
            }
        ];
		
        if (parseFloat(device['CounterDeliv']) > 0) {
            blockValues.push({
                icon: 'fa-plug',
                idx: idx + '_4',
                title: language.energy.energy_delivered,
                value: number_format(device['CounterDeliv'], 0),
                unit: settings['units'].names.kwh
            });
            blockValues.push({
                icon: 'fa-plug',
                idx: idx + '_5',
                title: language.energy.energy_deliveredtoday,
                value: number_format(device['CounterDelivToday'], settings['units'].decimals.kwh),
                unit: settings['units'].names.kwh
            });
        }
			
		if(typeof(data[1])!=='undefined'){
			data[0] = data[0]/1000;
			data[1] = data[1]/1000;
			blockValues.push({
				icon: 'fa-plug',
				idx: idx + '_6',
				title: language.energy.energy_totals,
				value: 'P1: '+number_format(data[0], 3,'.','')+' '+settings['units'].names.kwh+'<br />P2: '+number_format(data[1], 3,'.','')+' '+settings['units'].names.kwh,
				unit: ''
			});

			blockValues.push({
				icon: 'fa-plug',
				idx: idx + '_7',
				title: language.energy.energy_totals+' P1',
				value: number_format(data[0], 3,'.',''),
				unit: settings['units'].names.kwh
			});

			blockValues.push({
				icon: 'fa-plug',
				idx: idx + '_8',
				title: language.energy.energy_totals+' P2',
				value: number_format(data[1], 3,'.',''),
				unit: settings['units'].names.kwh
			});
		}
        createBlocks(blockValues, device);
        return ['', false];
    }
    if (device['SubType'] === 'Gas') {
        if ($('div.block_' + idx).length > 0) {
            allblocks[idx] = true;
        }
        var blockValues = [
            {
                icon: 'fa-fire',
                idx: idx + '_1',
                title: language.energy.gas_usagetoday,
                value: device['CounterToday'],
                unit: ''
            },
            {
                icon: 'fa-fire',
                idx: idx + '_2',
                title: language.energy.energy_totals + ' ' + device['Name'],
                value: device['Counter'],
                unit: 'm3'
            }
        ];
        createBlocks(blockValues, device);
        return ['', false];
    }
    return ['', false];
}

function getRFXMeterCounterBlock(device, idx) {
    if ($('div.block_' + idx).length > 0) {
        allblocks[idx] = true;
    }
    var unit = '';
    var decimals = 2;
    var icon = 'fa-fire';

    switch (device['SwitchTypeVal']) {
        case 0:
            unit = settings['units'].names.kwh;
            decimals = settings['units'].decimals.kwh;
            icon = 'fa-bolt';
            break;

        case 1:
            unit = settings['units'].names.gas;
            decimals = settings['units'].decimals.gas;
            icon = 'fa-fire';
            break;

        case 2:
            unit = settings['units'].names.water;
            decimals = settings['units'].decimals.water;
            icon = 'fa-tint';
            break;

        case 3:
            unit = device['ValueUnits'];
            break;

        case 4:
            unit = settings['units'].names.kwh;
            decimals = settings['units'].decimals.kwh;
            icon = 'fa-sun-o';
            break;

        case 5:
            unit = settings['units'].names.time;
            decimals = settings['units'].decimals.time;
            icon = 'fa-clock-o';
            break;
    }

    var blockValues = [
        {
            icon: icon,
            idx: idx + '_1',
            title: device['Name'],
            value: number_format(device['CounterToday'].split(' ')[0], decimals),
            unit: unit
        },
        {
            icon: icon,
            idx: idx + '_2',
            title: language.energy.energy_totals + ' ' + device['Name'],
            value: number_format(device['Counter'].split(' ')[0], decimals),
            unit: unit
        }
    ];
    if (typeof(device['Usage']) !== 'undefined') {
        blockValues.push({
            icon: icon,
            idx: idx + '_3',
            title: device['Name'],
            value: number_format(device['Usage'].split(' ')[0], decimals),
            unit: unit
        })
    }
    createBlocks(blockValues, device);
    return ['', false];
}

function getYouLessBlock(device, idx) {
    this.html = '';
    if ($('div.block_' + idx).length > 0) {
        allblocks[idx] = true;
    }
    var blockValues = [
        {
            icon: 'fa-fire',
            idx: idx + '_1',
            title: device['Name'],
            value: number_format(device['CounterToday'].split(' ')[0], settings['units'].decimals.kwh),
            unit: settings['units'].names.kwh
        },
        {
            icon: 'fa-fire',
            idx: idx + '_2',
            title: language.energy.energy_totals + ' ' + device['Name'],
            value: number_format(device['Counter'], settings['units'].decimals.kwh),
            unit: settings['units'].names.kwh
        }
    ];
    if (typeof(device['Usage']) !== 'undefined') {
        blockValues.push({
            icon: 'fa-fire',
            idx: idx + '_3',
            title: device['Name'],
            value: number_format(device['Usage'], settings['units'].decimals.watt),
            unit: settings['units'].names.watt
        })
    }
    createBlocks(blockValues, device);
    return ['', false];
}

function createBlocks(blockValues, device) {
    blockValues.forEach(function(blockValue, index, arr) {

        if (typeof(blocks[blockValue.idx]) !== 'undefined' && typeof(blocks[blockValue.idx]['icon']) !== 'undefined') blockValue.icon = blocks[blockValue.idx]['icon'];

        triggerStatus(blockValue.idx, device['LastUpdate'], device);
        triggerChange(blockValue.idx, device['LastUpdate'], device);

        if (typeof(blocks[blockValue.idx]) !== 'undefined' && typeof(blocks[blockValue.idx]['title']) !== 'undefined') blockValue.title = blocks[blockValue.idx]['title'];
        this.html = getStateBlock(blockValue.idx, blockValue.icon, blockValue.title, blockValue.value + ' ' + blockValue.unit, device);
        if (!index) {
            if (!$('div.block_' + device['idx']).hasClass('block_' + blockValue.idx)) $('div.block_' + device['idx']).addClass('block_' + blockValue.idx);
        } else {
			if (typeof(allblocks[device['idx']]) !== 'undefined'
                && $('div.block_' + blockValue.idx).length == 0
            ) {
				
				//sometimes there is a block_IDX_3 and block_IDX_6, but no block_IDX_4, therefor, loop to remove classes
				//(e.g. with smart P1 meters, when there's no CounterDeliv value)
				var newblock = $('div.block_' + device['idx']).last().clone();
				for(i=1;i<=10;i++){
					newblock.removeClass('block_' + device['idx'] + '_' + i);
				}
				newblock.addClass('block_' + blockValue.idx).insertAfter($('div.block_' + device['idx']).last());
            }
        }
        $('div.block_' + blockValue.idx).html(this.html);
    });
}

function getGeneralKwhBlock(device, idx) {
    this.html = '';
    if ($('div.block_' + idx).length > 0) {
        allblocks[idx] = true;
    }
    var blockValues = [
        {
            icon: 'fa-fire',
            idx: idx + '_1',
            title: device['Name'] + ' ' + language.energy.energy_now,
            value: number_format(device['Usage'], settings['units'].decimals.watt),
            unit: settings['units'].names.watt
        },
        {
            icon: 'fa-fire',
            idx: idx + '_2',
            title: device['Name'] + ' ' + language.energy.energy_today,
            value: number_format(device['CounterToday'], settings['units'].decimals.kwh),
            unit: settings['units'].names.kwh
        },
        {
            icon: 'fa-fire',
            idx: idx + '_3',
            title: device['Name'] + ' ' + language.energy.energy_total,
            value: number_format(device['Data'], 2),
            unit: settings['units'].names.kwh
        }
    ];
    createBlocks(blockValues, device);
    return ['', false];
}

function getTempHumBarBlock(device, idx) {
    this.html = '';
    if ($('div.block_' + idx).length > 0) {
        allblocks[idx] = true;
    }
    var single_block = (typeof(blocks[idx]) !== 'undefined'
        && typeof(blocks[idx]['single_block']) !== 'undefined'
        && blocks[idx]['single_block']
    );

    var blockValues = [
        {
            icon: 'fa-thermometer-half',
            idx: idx + '_1',
            title: device['Name'],
            value: number_format((typeof(device['Temp']) !== 'undefined') ? device['Temp'] : device['Data'], 1),
            unit: _TEMP_SYMBOL
        },
    ];
    if (typeof(device['Humidity']) !== 'undefined') {
        if (single_block) {
            blockValues[0].value += ' ' + blockValues[0].unit + ' / ' + number_format(device['Humidity'], 0) + ' %';
            blockValues[0].unit = '';
        } else {
            blockValues.push({
                icon: 'wi wi-humidity',
                idx: idx + '_2',
                title: device['Name'],
                value: number_format(device['Humidity'], 0),
                unit: '%'
            });
        }
    }
    if (typeof(device['Barometer']) !== 'undefined') {
        if (single_block) {
            blockValues[0].value += ' / ' + device['Barometer'] + ' hPa';
        } else {
            blockValues.push({
                icon: 'wi wi-barometer',
                idx: idx + '_3',
                title: device['Name'],
                value: device['Barometer'],
                unit: 'hPa'
            });
        }
    }

    createBlocks(blockValues, device);
    return ['', false];
}

function getThermostatBlock(device, idx) {
    this.html = '';
    this.html += iconORimage(idx + '_1', '', 'heating.png', 'on icon', 'style="max-height:35px;"');
    this.html += '<div class="col-xs-8 col-data">';

    this.title = device['Data'] + _TEMP_SYMBOL;
    this.value = device['Name'];
    if (titleAndValueSwitch(idx + '_1')) {
        this.title = device['Name'];
        this.value = device['Data'] + _TEMP_SYMBOL;
    }
    this.html += '<strong class="title">' + this.title + '</strong><br />';
    this.html += '<span class="state">' + this.value + '</span>';
    if (showUpdateInformation(idx)) {
        this.html += '<br /><span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
    }
    this.html += '</div>';

    $('div.block_' + idx + '_1').html(this.html);

    this.html = '';
    this.html += '<ul class="col-thermostat input-groupBtn">';
    this.html += '<li class="up"><a href="javascript:void(0)" class="btn btn-number plus" data-type="plus" data-field="quant[' + device['idx'] + ']" onclick="this.blur();">';
    this.html += '<em class="fa fa-plus fa-small fa-thermostat"></em>';
    this.html += '</a></li>';
    this.html += '<li class="down"><a href="javascript:void(0)" class="btn btn-number min" data-type="minus" data-field="quant[' + device['idx'] + ']" onclick="this.blur();">';
    this.html += '<em class="fa fa-minus fa-small fa-thermostat"></em>';
    this.html += '</a></li>';
    this.html += '</ul>';

    this.html += iconORimage(idx + '_2', '', 'heating.png', 'on icon iconheating', '', '2');
    this.html += '<div class="col-xs-8 col-data">';

    this.title = number_format(device['Data'], 1) + _TEMP_SYMBOL;
    this.value = device['Name'];
    if (titleAndValueSwitch(idx) || titleAndValueSwitch(idx + '_2')) {
        this.title = device['Name'];
        this.value = number_format(device['Data'], 1) + _TEMP_SYMBOL;
    }
    this.html += '<strong class="title input-number title-input" min="12" max="25" data-light="' + device['idx'] + '">' + this.title + '</strong>';
    this.html += '<div class="state stateheating">' + this.value + '</div>';
    this.html += '</div>';

    $('div.block_' + idx + '_2').html(this.html);
    $('div.block_' + idx).html(this.html);

    if (typeof(addedThermostat[idx]) === 'undefined') {
        addThermostatFunctions('.block_' + idx);
        addedThermostat[idx] = true;
    }
    if (typeof(addedThermostat[idx + '_2']) === 'undefined') {
        addThermostatFunctions('.block_' + idx + '_2');
        addedThermostat[idx + '_2'] = true;
    }
    return [this.html, false];
}

function getDimmerBlock(device, idx, buttonimg) {
    this.html = '';

    this.html += iconORimage(idx, 'fa-lightbulb-o', buttonimg, getIconStatusClass(device['Status']) + ' icon iconslider', '', 2, 'data-light="' + device['idx'] + '" onclick="switchDevice(this);"');
    html += '<div class="col-xs-10 swiper-no-swiping col-data">';
    html += '<strong class="title">' + device['Name'];
    if (typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['hide_data']) == 'undefined' || blocks[idx]['hide_data'] == false) {
        this.html += ' ' + device['Level'] + '%';
    }
    this.html += '</strong>';
    if (showUpdateInformation(idx)) {
        this.html += ' / <span class="lastupdate">' + moment(device['LastUpdate']).format(settings['timeformat']) + '</span>';
    }
    this.html += '<br />';
    if (isRGBDeviceAndEnabled(device)) {
        this.html += '<input type="text" class="rgbw" data-light="' + device['idx'] + '" />';
        this.html += '<div class="slider slider' + device['idx'] + '" style="margin-left:55px;" data-light="' + device['idx'] + '"></div>';
    }
    else {
        this.html += '<div class="slider slider' + device['idx'] + '" data-light="' + device['idx'] + '"></div>';
    }

    this.html += '</div>';

    $('div.block_' + idx).html(this.html);

    if (isRGBDeviceAndEnabled(device)) {
        $(".rgbw").spectrum({
            color: Cookies.get('rgbw_' + idx)
        });

        $(".rgbw").on("dragstop.spectrum", function (e, color) {
            curidx = $(this).data('light');
            color = color.toHexString();
            Cookies.set('rgbw_' + curidx, color);
            hue = hexToHsb(color);
            var bIsWhite = (hue.s < 20);

            sliding = true;
            
			var usrinfo ='';
			if(typeof(usrEnc)!=='undefined' && usrEnc!=='') usrinfo = 'username=' + usrEnc + '&password=' + pwdEnc + '&';
        
			var url = settings['domoticz_ip'] + '/json.htm?'+usrinfo+'type=command&param=setcolbrightnessvalue&idx=' + curidx + '&hue=' + hue.h + '&brightness=' + hue.b + '&iswhite=' + bIsWhite;
            $.ajax({
                url: url + '&jsoncallback=?',
                type: 'GET', async: false, contentType: "application/json", dataType: 'jsonp'
            });
        });

        $(".rgbw").on('hide.spectrum', function (e, tinycolor) {
            sliding = false;
            getDevices(true);
        });
    }

    var slider = {};
    switch (parseFloat(device['MaxDimLevel'])) {
        case 100:
            slider = {
                value: device['Level'],
                step: 1,
                min: 1,
                max: 100,
            };
            break;
        case 32:
            slider = {
                value: Math.ceil((device['Level'] / 100) * 32),
                step: 1,
                min: 2,
                max: 32,
            };
            break;
        default:
            slider = {
                value: Math.ceil((device['Level'] / 100) * 16),
                step: 1,
                min: 2,
                max: 15,
            };
            break;
    }
    addSlider(device['idx'], slider);

    return [this.html, false];
}

function getBlindsBlock(device, idx, withPercentage) {
    if (typeof(withPercentage) === 'undefined') withPercentage = false;
    this.html = '';
    this.html += '<div class="col-xs-4 col-icon">';
    if(device['Status'] === 'Closed') this.html += iconORimage(idx, '', 'blinds_closed.png', 'off icon', '', 2);
    else this.html += iconORimage(idx, '', 'blinds_open.png', 'on icon', '', 2);
    this.html += '</div>';
    this.html += '<div class="col-xs-8 col-data">';
    this.title = device['Name'];
    if (withPercentage) {
        if (typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['hide_data']) == 'undefined' || blocks[idx]['hide_data'] == false) {
            this.title += ' ' + device['Level'] + '%';
        }
        this.value = '<div class="slider slider' + device['idx'] + '" data-light="' + device['idx'] + '"></div>';
    } else {
        if (device['Status'] === 'Closed') this.value = '<span class="state">' + language.switches.state_closed + '</span>';
        else this.value = '<span class="state">' + language.switches.state_open + '</span>';
    }
    if (!withPercentage) {
	if (typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['hide_data']) == 'undefined' || blocks[idx]['hide_data'] == false) {
	    if (device['Status'] === 'Closed') this.value = '<span class="state">' + language.switches.state_closed + '</span>';
	    else this.value = '<span class="state">' + language.switches.state_open + '</span>';
	} else {
	   this.value = '<span class="state"></span>'
	}
    }
    this.html += '<strong class="title">' + this.title + '</strong><br />';
    this.html += this.value;
    this.html += '</div>';

    if (typeof(blocks[idx]) == 'undefined' || typeof(blocks[idx]['hide_stop']) == 'undefined' || blocks[idx]['hide_stop'] === false) {
        var hidestop = false;
        this.html += '<ul class="input-groupBtn input-chevron">';
    } else {
        var hidestop = true;
        this.html += '<ul class="input-groupBtn input-chevron hidestop">';
    }

    this.upAction = 'Off';
    this.downAction = 'On';
    if (device['SwitchType'].toLowerCase().indexOf('inverted') >= 0) {
        this.upAction = 'On';
        this.downAction = 'Off';
    }
    this.html += '<li class="up"><a href="javascript:void(0)" class="btn btn-number plus" onclick="switchBlinds(' + device['idx'] + ',\'' + this.upAction + '\');">';
    this.html += '<em class="fa fa-chevron-up fa-small"></em>';
    this.html += '</a></li>';

    this.html += '<li class="down"><a href="javascript:void(0)" class="btn btn-number min" onclick="switchBlinds(' + device['idx'] + ',\'' + this.downAction + '\');">';
    this.html += '<em class="fa fa-chevron-down fa-small"></em>';
    this.html += '</a></li>';

    if (!hidestop) {
        this.html += '<li class="stop"><a href="javascript:void(0)" class="btn btn-number stop" onclick="switchBlinds(' + device['idx'] + ',\'Stop\');">';
        this.html += 'STOP';
        this.html += '</a></li>';
    }

    this.html += '</ul>';

    $('div.block_' + idx).html(this.html);

    if (withPercentage) {
        addSlider(idx, {
            value: device['Level'],
            step: 1,
            min: 1,
            max: 100
        });
    }
    return [this.html, false];
}

function addSlider(idx, sliderValues) {
    $(".slider" + idx).slider({
        value: sliderValues.value,
        step: sliderValues.step,
        min: sliderValues.min,
        max: sliderValues.max,
        slide: function (event, ui) {
            sliding = true;
            slideDevice($(this).data('light'), ui.value);
        },
        change: function (event, ui) {
            sliding = true;
            slideDevice($(this).data('light'), ui.value);
        },
        stop: function (event, ui) {
            sliding = false;
        }
    });
}

function isRGBDeviceAndEnabled(device) {
    return (typeof(settings['no_rgb']) === 'undefined'
            || (typeof(settings['no_rgb']) !== 'undefined'
                && parseFloat(settings['no_rgb']) === 0))
        && (device['SubType'] === 'RGBW' || device['SubType'] === 'RGBWW');
}
