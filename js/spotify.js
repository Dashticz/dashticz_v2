var CUR_URI = document.location.href.split('#');
REDIRECT_URI = CUR_URI[0];
var userdata;
var accessToken;

function getSpotify(columndiv){
	if(typeof(Cookies.get('spotifyToken'))!=='undefined' || typeof(CUR_URI[1])!=='undefined'){
		if(typeof(CUR_URI[1])!=='undefined'){
			var hash = URLToArray(CUR_URI[1]);
			Cookies.set('spotifyToken',hash.access_token);
			document.location.href=CUR_URI[0];
		}
		accessToken = Cookies.get('spotifyToken');
	
		var random = getRandomInt(1,100000);
		var html ='<div data-id="spotify" class="col-xs-12 transbg containsspotify containsspotify'+random+'" style="padding:0px !important;">';
			html+='<div id="current"></div><a href="javascript:void(0);" class="change">'+language.misc.spotify_select_playlist+' &raquo;</a><select class="devices"><option>'+language.misc.spotify_select_device+'</option></select>';
		html+='</div>';
		$(columndiv).append(html);
				
		getUserData()
		.then(function(userdata) {
			getDevices()
			.then(function(devices) {
				if(typeof(devices['devices'])!=='undefined'){
					devices = devices['devices'];
					var sel='';
					for(d in devices){
						sel='';
						if(devices[d]['is_active']){ 
							sel='selected';
						}
						if(!devices[d]['is_restricted']) $('select.devices').append('<option value="'+devices[d]['id']+'" '+sel+'>'+devices[d]['name']+'</option>');					
					}
				}
				
				getCurrentlyPlaying().then(function(currently) {
					
					if(currently.item!==null && typeof(currently.item)!=='undefined'){
						getCurrentHTML(currently.item);
					}
					
					getPlaylists()
					.then(function(playlists) {
						var html = '<div class="modal fade" id="spotify_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
						html+='<div class="modal-dialog">';
							html+='<div class="modal-content">';
							 html+='<div class="modal-header">';
								html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
							html+='</div>';
							html+='<div class="modal-body" style="padding-left:15px;"><div class="row list">';

								for(p in playlists.items){
									if(typeof(playlists.items[p])!=='undefined' && typeof(playlists.items[p]['uri'])!=='undefined' && typeof(playlists.items[p]['images'][0])!=='undefined'){		
										console.log(playlists.items[p]);
										html+='<div class="col-md-3 col-sm-6">';
											html+='<div class="spotlist">';
												html+='<div class="col-lg-4 col-md-5 col-sm-4" style="padding:0px;"><a href="javascript:void(0);" onclick="getPlayList(\''+playlists.items[p]['href']+'\');"><img style="height:75px;width:75px;" src="'+playlists.items[p]['images'][0]['url']+'" /></a></div>';
												html+='<div class="col-lg-8 col-md-7 col-sm-8" style="padding:0px;padding-top:5px;padding-right:10px;">';
												html+='<a href="javascript:void(0);" onclick="getPlayList(\''+playlists.items[p]['href']+'\');">'+playlists.items[p]['name']+'</a><br />';
												html+='<a href="javascript:void(0);" onclick="getTrackList(\''+playlists.items[p]['tracks']['href']+'\',\''+columndiv+'\');"><em>Tracks: '+playlists.items[p]['tracks']['total']+'</em></a></div>';
											html+='</div>';
										html+='</div>';
									}
								}

							html+='</div><div class="row tracks" style="display:none;"></div><br /><br /></div>';
							html+='</div>';
						  html+='</div>';
						html+='</div>';

						$('body').append(html);
					});

					var calobject = $('.containsspotify'+random+' a.change');
					calobject.attr('data-toggle','modal');
					calobject.attr('data-id','');
					calobject.attr('data-target','#spotify_'+random);
					calobject.attr('onclick','setSrc(this);');
				});
			});
		});
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
			'playlist-read-private'
		]);

		document.location.href=url;
	}

}

function getCurrentHTML(item){
						
	console.log('{"uris":["'+item.uri+'"]}');
	
	$.ajax({
		type: 'PUT',
		//data: "device_id="+$('select.devices').find('option:selected').val(),
		//data: "uris="+item.uri,
		data: '{"uris":["'+item.uri+'"]}',
		url: 'https://api.spotify.com/v1/me/player/play',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
	
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

	$('.containsspotify #current').html(html);


}

function getPlayList(url){
	$.ajax({
		url: url,
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success:function(item){
			console.log(item);
			getCurrentHTML(item);
			$('.modal.fade.in .close').trigger('click');
		}
	});
}

function getLoginURL(scopes) {

	return 'https://accounts.spotify.com/authorize?client_id=' + settings['spot_clientid'] +
	  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
	  '&scope=' + encodeURIComponent(scopes.join(' ')) +
	  '&response_type=token';
}

function getPlaylists() {
	return $.ajax({
		url: 'https://api.spotify.com/v1/me/playlists?offset=0&limit=50',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
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
		console.log(tracks);
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
function getDevices() {
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
		url: 'https://api.spotify.com/v1/me/player/currently-playing',
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		}
	});
}
