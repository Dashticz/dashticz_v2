var SpotifyModule = function() {

	var CUR_URI = window.location.href.split('#');
	REDIRECT_URI = CUR_URI[0];

	var accessToken;
	var userinfo;
	var spotifyApi = new SpotifyWebApi();
	var random;
	var columndiv;
	var spotVolume;

	function _getSpotify(columndiv){
		var random = getRandomInt(1,100000);
		if(typeof(Cookies.get('spotifyToken'))!=='undefined' || typeof(CUR_URI[1])!=='undefined'){
			if(typeof(CUR_URI[1])!=='undefined'){
				var hash = URLToArray(CUR_URI[1]);
				Cookies.set('spotifyToken',hash.access_token);
				window.location.href=CUR_URI[0];
			}
			accessToken = Cookies.get('spotifyToken');
			spotifyApi.setAccessToken(accessToken);

			var html ='<div data-id="spotify" class="col-xs-12 transbg containsspotify containsspotify'+random+'" style="padding:0px !important;">';
			    html+='<div id="current"></div>';

				html+='<a class="change" style="display:none;" onclick="SpotifyModule.createPlaylistsDlg('+random+');">'+language.misc.spotify_select_playlist+' &raquo;</a>';
				html+='<select class="devices" style="display:none;" onchange="SpotifyModule.changeDevice(this.value);"></select>';

			html+='</div>';
			$(columndiv).append(html);

			_getData(columndiv,random);
			setInterval(function(){
				_getData(columndiv,random);
			},2000);
		}
		else if(!settings['spot_clientid']){
			console.log('Enter your Spotify ClientID in CONFIG.JS');
			infoMessage('Spotify:', 'Enter your Spotify ClientID in settings or delete spotify block in your CONFIG.js',10000);
		}
		else {
			var url = _getLoginURL();
			window.location.href=url;
		}

	}

	function _getData(columndiv,rand){
		if($('select.devices option').length === 0) $('select.devices').html('<option>'+language.misc.spotify_select_device+'</option>');

		spotifyApi.getMe(function(err, user) {
			userinfo = user;
			spotifyApi.getMyDevices(function(err, data) {
				if (err){
					var url = _getLoginURL();
					window.location.href=url;

				}
				else{
					devices = data.devices;
					var sel='';
					for(d in devices){

						$('select.devices').show();
						$('a.change').show();

						sel='';
						if(devices[d]['is_active']){
							sel='selected';
						}
						if(!devices[d]['is_restricted']) {
							if($('select.devices option[value="' + devices[d]['id'] + '"]').length === 0) {
								$('select.devices').append('<option value="'+devices[d]['id']+'" '+sel+'>'+devices[d]['name']+'</option>');
							}
						}
					}

					_getCurrentTrack();


				}
			});
		});
	}

  function _createPlaylistsDlg(rand) {
		spotifyApi.getUserPlaylists(function(err, playlists) {
			var html = '<div class="modal fade" id="spotify_'+rand+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
				html+='<div class="modal-dialog">';
				html+='<div class="modal-content">';
				html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
				html+='</div>';
				html+='<div class="modal-body" style="padding-left:15px;"><div class="row list">';

			for(p in playlists.items){
				if(typeof(playlists.items[p])!=='undefined' && typeof(playlists.items[p]['uri'])!=='undefined' && typeof(playlists.items[p]['images'][0])!=='undefined'){
					html+='<div class="col-md-3 col-sm-6">';
					html+='<div class="spotlist">';
					html+='<div class="col-lg-4 col-md-5 col-sm-4" style="padding:0px;"><a onclick="SpotifyModule.getPlayList(\''+playlists.items[p]['href']+'\');"><img style="height:75px;width:75px;" src="'+playlists.items[p]['images'][0]['url']+'" /></a></div>';
					html+='<div class="col-lg-8 col-md-7 col-sm-8" style="padding:0px;padding-top:5px;padding-right:10px;">';
					html+='<a onclick="SpotifyModule.getPlayList(\''+playlists.items[p]['owner']['id']+'\',\''+playlists.items[p]['id']+'\');">'+playlists.items[p]['name']+'</a><br />';
					html+='<a onclick="SpotifyModule.getTrackList(\''+playlists.items[p]['owner']['id']+'\',\''+playlists.items[p]['id']+'\',\''+columndiv+'\');"><em>Tracks: '+playlists.items[p]['tracks']['total']+'</em></a></div>';
					html+='</div>';
					html+='</div>';
				}
			}

			html+='</div><div class="row tracks" style="display:none;"></div><br /><br /></div>';
			html+='</div>';
			html+='</div>';
			html+='</div>';

			$('body').append(html);
			$("#spotify_"+rand).on('hidden.bs.modal', function () {
						$(this).data('bs.modal', null);
				console.log("destroyed spotframe");
			});

			$("#spotify_"+rand).modal();

		});
	}

	function _getCurrentTrack(){
//		spotifyApi.getMyCurrentPlayingTrack(function(err, currently) {
		spotifyApi.getMyCurrentPlaybackState(function(err, currently) {
			if(currently.item!==null && typeof(currently.item)!=='undefined'){
				_getCurrentHTML(currently, 'currentlyPlaying');
			}
		});
	}

	function _changeDevice(deviceID){
		var deviceIDs = [];
		deviceIDs.push(deviceID);
		spotifyApi.transferMyPlayback(deviceIDs,{},function(err, result) {

		});
	}
	function _getCurrentHTML(currently, typeAction){
		item = currently.item;
		spotVolume = Number(currently.device.volume_percent);
		if(typeof typeAction === 'undefined') typeAction = false;

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

		if(typeof(item.name)!=='undefined'){
			html+='<div class="current_track">';
			html+=item.name;
			html+='</div>';
		}

		if(typeof(item.album)!=='undefined'){
			html+='<div class="current_album">';
			html+='<em>'+item.album.name+'</em>';
			html+='</div>';
		}



		html += '<div>';
		if(userinfo.product!=='premium'){
			html += '<em>Playback functions of Spotify are only working when you have a premium subscription!</em>';
		}
		else {

			$('a.change').show();
			$('select.devices').show();

			html += '<a href="javascript:SpotifyModule.trackAction(\'Rewind\');"><em class="fas fa-arrow-circle-left fa-small"></em></a> ';
			//html += '<a href="javascript:SpotifyModule.trackAction(\'Stop\');"><em class="fa fa-stop-circle fa-small"></em></a> ';
			if (currently.is_playing) {
				html += '<a class="spotpause" href="javascript:SpotifyModule.trackAction(\'Pause\');"><em class="fas fa-pause-circle fa-small"></em></a> ';
				html += '<a class="spotplay" style="display:none;" href="javascript:SpotifyModule.trackAction(\'Play\');"><em class="fas fa-play-circle fa-small"></em></a> ';
			} else {
				html += '<a class="spotpause" style="display:none;" href="javascript:SpotifyModule.trackAction(\'Pause\');"><em class="fas fa-pause-circle fa-small"></em></a> ';
				html += '<a class="spotplay" href="javascript:SpotifyModule.trackAction(\'Play\');"><em class="fas fa-play-circle fa-small"></em></a> ';
			}
			html += '<a href="javascript:SpotifyModule.trackAction(\'Forward\');"><em class="fas fa-arrow-circle-right fa-small"></em></a>';

			html += '&nbsp;&nbsp;';

			if(currently.shuffle_state) {
				html += '<a id="shuffle" href="javascript:SpotifyModule.trackAction(\'ShuffleOff\');"><em class="fas fa-random fa-small"></em></a> ';			
			}
			else {
				html += '<a id="shuffle" class="shuffleoff" href="javascript:SpotifyModule.trackAction(\'ShuffleOn\');"><em class="fas fa-random fa-small"></em></a> ';			
			}
			html += '&nbsp;&nbsp;';
			html += '<a href="javascript:SpotifyModule.trackAction(\'VolumeDown\');"><em class="fas fa-minus-circle fa-small"></em></a>';
			html += '&nbsp;';
			html += '<a href="javascript:SpotifyModule.trackAction(\'VolumeUp\');"><em class="fas fa-plus-circle fa-small"></em></a>';

			html += '</div>';
		}

		html+='</div>';

		$('.containsspotify #current').html(html);
	}

	function _trackAction(action){
		if(action=='Play'){
			spotifyApi.play(function(err, result) {

				$('.spotpause').show();
				$('.spotplay').hide();

			});
		}
		if(action=='Pause'){
			spotifyApi.pause(function(err, result) {

				$('.spotpause').hide();
				$('.spotplay').show();

			});
		}
		if(action=='Forward'){
			spotifyApi.skipToNext(function(err, result) {
				_getCurrentTrack();
			});
		}
		if(action=='Rewind'){
			spotifyApi.skipToPrevious(function(err, result) {
				_getCurrentTrack();
			});
		}
		if(action=='VolumeDown'){
			spotVolume = Math.max(0, spotVolume-10);
			spotifyApi.setVolume(spotVolume,{});
		}
		if(action=='VolumeUp'){
			spotVolume = Math.min(100, spotVolume+10);
			spotifyApi.setVolume(spotVolume,{});
		}
		if(action=='ShuffleOn'){
			spotifyApi.setShuffle(true,{});
				$("#shuffle").removeClass("shuffleoff");
		}
		if(action=='ShuffleOff'){
			spotifyApi.setShuffle(false,{});
				$("#shuffle").addClass("shuffleoff");
		}
	}

	function _getPlayList(owner,id){
		spotifyApi.getPlaylist(owner,id,function(err, playlist) {
			spotifyApi.play({
				context_uri: playlist.uri
			},function(err, result) {
				$('.modal,.modal-backdrop').remove();
			});
		});
	}

	function _getTrack(track){
		spotifyApi.play({"uris": [track]},function(err, result) {
			$('.modal,.modal-backdrop').remove();
		});
	}

	function _getLoginURL(scopes) {
		if(typeof scopes === 'undefined') {
			scopes = [
		            'user-read-email',
		            'user-read-currently-playing',
		            'user-read-playback-state',
		            'user-read-recently-played',
		            'user-modify-playback-state',
		            'playlist-read-private',
					'user-read-private',
					'streaming'
		        ];
		}

		return 'https://accounts.spotify.com/authorize?client_id=' + settings['spot_clientid'] +
		  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
		  '&scope=' + encodeURIComponent(scopes.join(' ')) +
		  '&response_type=token';
	}

	function _showPlaylists(){
		$('div.modal-body .row.list').show();
		$('div.modal-body .row.tracks').html('').hide();
	}

	function _getTrackList(owner,id,back){

		spotifyApi.getPlaylist(owner,id,function(err, tracks) {
			tracks=tracks.tracks;

			var html='<div class="col-md-12"><div class="spotback"><a onclick="SpotifyModule.showPlaylists();">&laquo; '+language.misc.spotify_back_to_playlist+'</a></div></div>';
			for(t in tracks.items){
				if(typeof(tracks.items[t]['track'])!=='undefined' && typeof(tracks.items[t]['track']['uri'])!=='undefined'){
					html+='<div class="col-md-3 col-sm-6">';
					html+='<div class="spottrack">';
					html+='<div style="margin:10px;"><a onclick="SpotifyModule.getTrack(\''+tracks.items[t]['track']['uri']+'\');"><strong>'+tracks.items[t]['track']['artists'][0]['name']+'</strong><br />'+tracks.items[t]['track']['name']+'</a></div>';
					html+='</div>';
					html+='</div>';
				}
			}
			$('div.modal-body .row.list').hide();
			$('div.modal-body .row.tracks').html(html).show();
		});
	}

	//Expose public functions
	return {
		getSpotify: _getSpotify,
		changeDevice: _changeDevice,
		getPlayList: _getPlayList,
		getTrackList: _getTrackList,
		showPlaylists: _showPlaylists,
		trackAction: _trackAction,
		getTrack: _getTrack,
		createPlaylistsDlg: _createPlaylistsDlg
	}

}();

//Wrapper function to stay compatible with current module system
function getSpotify(columndiv)
{
	return SpotifyModule.getSpotify(columndiv);
}
