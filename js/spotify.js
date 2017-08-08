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
			html+='<iframe src="" style="width:100%;height:80px;border:0px;"></iframe><a href="javascript:void(0);" class="change">'+language.misc.spotify_select_playlist+' &raquo;</a>';
		html+='</div>';
		$(columndiv).append(html);
				
		getUserData()
		.then(function(userdata) {
			getCurrentlyPlaying().then(function(currently) {

				if(currently.item!==null){
					playList = 'https://open.spotify.com/embed?uri=' + currently.item.uri;
					$('.containsspotify iframe').attr('src',playList);
				}
				
				getPlaylists()
				.then(function(playlists) {
					var html = '<div class="modal fade" id="spotify_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
					html+='<div class="modal-dialog">';
						html+='<div class="modal-content">';
						 html+='<div class="modal-header">';
							html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
						html+='</div>';
						html+='<div class="modal-body">';

							for(p in playlists.items){
								if(typeof(playlists.items[p]['images'][0])!=='undefined'){			 
									html+='<a class="playlist" href="javascript:void(0);" onclick="getPlayList(\'https://open.spotify.com/embed?uri='+playlists.items[p]['uri']+'\');">';
									html+='<img style="width:100px;" src="'+playlists.items[p]['images'][0]['url']+'" />';
									html+='</a> ';
								}
							}

						html+='</div>';
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

function getPlayList(purl){
	$('.containsspotify iframe').attr('src',purl);
	$('.modal.fade.in .close').trigger('click');
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
