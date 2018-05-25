var CUR_URI = document.location.href.split('#');
var REDIRECT_URI = CUR_URI[0];
var userdata;
var accessToken;
var currentPlaying=false;
var isPlaying = false;
var myrandom;
var tmpcolumndiv;
var currentVolume=0;

function getSpotify(columndiv){
	tmpcolumndiv = columndiv;
	if(typeof(Cookies.get('spotifyToken'))!=='undefined' || typeof(CUR_URI[1])!=='undefined'){
		if(typeof(CUR_URI[1])!=='undefined'){
			var hash = URLToArray(CUR_URI[1]);
			Cookies.set('spotifyToken',hash.access_token);
			document.location.href=CUR_URI[0];
		}
		accessToken = Cookies.get('spotifyToken');
		myrandom = getRandomInt(1,100000);
		var html ='<div data-id="spotify" class="col-xs-12 transbg containsspotify containsspotify'+myrandom+'" style="padding:0px !important;">';
			html+='<div id="current"></div><button type="button" class="select devices btn-playlist"  onclick="constructPlaylistModal();">'+language.misc.spotify_select_playlist+' &raquo;</button><select id="selectdevices" class="select devices" onclick="onSelectDevicesClick();" onchange="changeDevice();"></select>';
		$(columndiv).append(html);
		getUserData();
		setInterval(function(){ getSpotifyData(); },5000);
		setInterval(function(){ getUserData(); },60*60*1000); // to be sure the token gets refreshed within an hour (if needed)
	}
	else if(!settings['spot_clientid']){
		console.log('Enter your Spotify ClientID in CONFIG.JS');
	}
	else {
		var url = getLoginURL([
			'user-read-email',
			'user-read-currently-playing',
			'user-read-playback-state',
			'user-read-recently-played',
			'playlist-read-private',
			'user-modify-playback-state'
		]);

		document.location.href=url;
	}

}

function onSelectDevicesClick() {
//	console.log("onSelectDevicesClick");
//	createDeviceOptions();
}

function onPlaylistClick() {
//	console.log("OnPlaylistClick");
	$("#spotify1").modal();	
}

function constructPlaylistModal() {
				getPlaylists()
				.then(function(playlists) {
					var html = '<div class="modal fade" id="spotify1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
					html+='<div class="modal-dialog">';
						html+='<div class="modal-content">';
						 html+='<div class="modal-header">';
							html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
						html+='</div>';
						html+='<div class="modal-body" style="padding-left:15px;"><div class="row list">';

							for(p in playlists.items){
								if(typeof(playlists.items[p])!=='undefined' && typeof(playlists.items[p]['uri'])!=='undefined' && typeof(playlists.items[p]['images'][0])!=='undefined'){		
									//console.log(playlists.items[p]);
									html+='<div class="col-md-3 col-sm-6">';
										html+='<div class="spotlist">';
											html+='<div class="col-lg-4 col-md-5 col-sm-4" style="padding:0px;"><a href="javascript:void(0);" onclick="getPlayList(\''+playlists.items[p]['uri']+'\');"><img style="height:75px;width:75px;" src="'+playlists.items[p]['images'][0]['url']+'" /></a></div>';
											html+='<div class="col-lg-8 col-md-7 col-sm-8" style="padding:0px;padding-top:5px;padding-right:10px;">';
											html+='<a href="javascript:void(0);" onclick="getPlayList(\''+playlists.items[p]['uri']+'\');">'+playlists.items[p]['name']+'</a><br />';
											html+='<a href="javascript:void(0);" onclick="getTrackList(\''+playlists.items[p]['tracks']['href']+'\',\''+tmpcolumndiv+'\');"><em>Tracks: '+playlists.items[p]['tracks']['total']+'</em></a></div>';
										html+='</div>';
									html+='</div>';
								}
							}

						html+='</div><div class="row tracks" style="display:none;"></div><br /><br /></div>';
						html+='</div>';
					  html+='</div>';
					html+='</div>';

					$('body').append(html);
					$("#spotify1").on('hidden.bs.modal', function () {
				    		$(this).data('bs.modal', null);
						console.log("destroyed spotframe");
					});

					$("#spotify1").modal();

				});
}


function getSpotifyData(){
	currentPlaying=false;
	createDeviceOptions();
	getCurrentlyPlaying().then(function(currently) {

		if(currently && currently.is_playing!==null && typeof(currently.is_playing)!=='undefined'){
			isPlaying = currently.is_playing==false ? false: true;
		}
						
		if(currently && currently.item!==null && typeof(currently.item)!=='undefined'){
			getCurrentHTML(currently.item);
			currentPlaying=currently.item;
		}
		if (currently.device!==null && typeof(currently.device)!=='undefined'){
			currentVolume=Number(currently.device.volume_percent);
		}
				
	});
}

function createDeviceOptions () {
	var html='<option>'+language.misc.spotify_select_device+'</option>';
		getSpotDevices()
		.then(function(devices) {
			//console.log(devices);
			if(typeof(devices['devices'])!=='undefined'){
				devices = devices['devices'];
				var sel='';
				for(d in devices){
					sel='';
					if(devices[d]['is_active']){ 
						sel='selected';
					}
					if(!devices[d]['is_restricted'])
						html+='<option value="'+devices[d]['id']+'" '+sel+'>'+devices[d]['name']+'</option>';
				}
			}
			$('select.devices').html(html);
	});
}
	
function changeDevice(){
	var spotSelDev = $('select.devices').find('option:selected').val();
	$.ajax({
		type: 'PUT',
		data: '{"device_ids":["'+spotSelDev+'"]}',
		url: 'https://api.spotify.com/v1/me/player',		
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});

	getCurrentHTML(currentPlaying);
}

function getCurrentHTML(item){
						
	var html= '';
	
	if(typeof(item.album)!=='undefined'){
		html+='<div class="current_image">';
		html+='<img src="'+item.album.images[0].url+'" />';
		html+='</div>';
	}
	else {
		html+='<div class="current_image">';
		html+='<img src="'+item.images[0].url+'" />';
		html+='</div>';
	}

	html+='<div class="current_info">';

		if(typeof(item.artists)!=='undefined'){
			html+='<div class="current_artist">';
			html+=item.artists[0].name;
			html+='</div>';
		}
		else if(typeof(item.name)!=='undefined'){
			html+='<div class="current_artist">';
			html+=item.name;
			html+='</div>';
		}

		if(typeof(item.album)!=='undefined'){
			html+='<div class="current_album">';
			html+=item.album.name;
			html+='</div>';
		}
		else if(typeof(item.description)!=='undefined' && item.description!==null){
			html+='<div class="current_album">';
			html+=item.description;
			html+='</div>';
		}
	
	html+='</div>';
	html+='<div class="spot_player btn-group btn-group-lg">';
	if(isPlaying) {
		html += '<button id = "btnSpotPlay" type="button" class="btn btn-secondary" onclick="onPlayPauseClick();"><em class="fa fa-pause"></em></button>';
	}
	else {
		html += '<button id = "btnSpotPlay" type="button" class="btn btn-secondary" onclick="onPlayPauseClick();"><em class="fa fa-play"></em></button>';
	}
	html += '<button id="btnSpotVolDown" type="button" class="btn btn-secondary" onclick="onVolumeDownClick();"><em class="fa fa-volume-down"></em></button>';
	html += '<button type="button" class="btn btn-secondary" onclick="onVolumeUpClick();"><em class="fa fa-volume-up"></em></button>';
	html += '<button type="button" class="btn btn-secondary" onclick="onNextClick();"><em class="fa fa-chevron-right"></em></button>';
	html += '</div>';

	$('.containsspotify #current').html(html);
}

function getPlayList(uri){
	console.log(uri);
	spotifyPlay(uri);
	$('.modal.fade.in .close').trigger('click');

}

function getLoginURL(scopes) {

	return 'https://accounts.spotify.com/authorize?client_id=' + settings['spot_clientid'] +
	  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
	  '&scope=' + encodeURIComponent(scopes.join(' ')) +
	  '&response_type=token';
}

function getLoginURL2(scopes) {

	return 'https://accounts.spotify.com/authorize?client_id=' + settings['spot_clientid'] +
	  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + 'callback' +
	  '&scope=' + encodeURIComponent(scopes.join(' ')) +
	  '&response_type=token';
}

function getPlaylists() {
	return $.ajax({
		url: 'https://api.spotify.com/v1/me/playlists?offset=0&limit=50',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		 error: function(xhr, error){
			console.log("Error in getPlaylists");

			var url = getLoginURL([
				'user-read-email',
				'user-read-currently-playing',
				'user-read-playback-state',
				'user-read-recently-played',
				'user-modify-playback-state',
				'playlist-read-private'
			]);
		
			document.location.href=url;

		 }
	});
}

function showPlaylists(){
	$('div.modal-body .row.list').show();
	$('div.modal-body .row.tracks').html('').hide();
}

function getTrackList(url,back){
	getTracks(url).then(function(tracks) {
		var html='<div class="col-md-12"><div class="spotback"><a href="javascript:void(0);" onclick="showPlaylists();">&laquo; '+language.misc.spotify_back_to_playlist+'</a></div></div>';
		for(t in tracks.items){	
			if(typeof(tracks.items[t]['track'])!=='undefined' && typeof(tracks.items[t]['track']['uri'])!=='undefined'){
				html+='<div class="col-md-3 col-sm-6">';
				html+='<div class="spottrack">';
					html+='<div style="margin:10px;"><a href="javascript:void(0);" onclick="getPlayList(\''+tracks.items[t]['track']['href']+'\');"><strong>'+tracks.items[t]['track']['artists'][0]['name']+'</strong><br />'+tracks.items[t]['track']['name']+'</a></div>';
				html+='</div>';
			html+='</div>';
			}
		}
		$('div.modal-body .row.list').hide();
		$('div.modal-body .row.tracks').html(html).show();
		//console.log(tracks);
	});
}
function getTracks(url) {
	return $.ajax({
		url: url,
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}


function getSpotDevices() {
	return $.ajax({
		url: 'https://api.spotify.com/v1/me/player/devices',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}

function getUserData() {
	return $.ajax({
		url: 'https://api.spotify.com/v1/me',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		 error: function(xhr, error){
			console.log("Error in getUserData");
			var url = getLoginURL([
				'user-read-email',
				'user-read-currently-playing',
				'user-read-playback-state',
				'user-read-recently-played',
				'user-modify-playback-state',
				'playlist-read-private'
			]);
		
			document.location.href=url;

		 },
	});
}


function getCurrentlyPlaying() {
	return $.ajax({
		url: 'https://api.spotify.com/v1/me/player',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});

}

function onPlayPauseClick() {
	if (isPlaying) {
		spotifyPause();
		isPlaying = false;
		$('.containsspotify #btnSpotPlay').html('<em class="fa fa-play"></em>');
	}
	else {
		spotifyPlay();
		isPlaying = true;
		$('.containsspotify #btnSpotPlay').html('<em class="fa fa-pause"></em>');
	}
}

function setVolume(newvolume) {
	console.log("New volume: " + newvolume);
	currentVolume = newvolume;
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/volume?volume_percent='+newvolume,
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}

function onVolumeDownClick() {
	console.log("Vol Down");
	setVolume(currentVolume <10 ? 0 : currentVolume-10);	
}

function onVolumeUpClick() {
	setVolume(currentVolume >90 ? 100 : currentVolume+10);	
}

function onNextClick() {
	$.ajax({
		type: 'POST',
		url: 'https://api.spotify.com/v1/me/player/next',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});

}

function spotifyPause() {
	$.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player/pause',		
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}

function spotifyPlay(uri) {
	$.ajax({
		type: 'PUT',
		data: typeof(uri)!=='undefined' ? '{"context_uri":"'+uri+'"}':'',
		url: 'https://api.spotify.com/v1/me/player/play',		
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}


