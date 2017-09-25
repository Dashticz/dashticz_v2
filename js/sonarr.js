function loadSonarr(){
	
	// Default value for user settings
	var html = '';
	var width = 12;
	var sonarrColSize = 12;
	var sonarrTitlePosition = 'left';
	var sonarrTitleObject = 'Upcoming&nbsp;shows';
	
	// lets get all the user settings if they exist
	if(typeof(blocks['sonarr'])!=='undefined' && typeof(blocks['sonarr']['width'])!=='undefined'){
		width = blocks['sonarr']['width'];
	}
    var html = '<div class="sonarrMain block_sonarr col-xs-'+width+' transbg">';
	html += '<div class="col-xs-2 col-icon"><em class="fa fa-tv"></em>';
	var SonarrTitleObject = 'Upcoming&nbsp;shows';
	
	if(typeof(blocks['sonarr'])!=='undefined' && typeof(blocks['sonarr']['title_position'])!=='undefined'){
		sonarrTitlePosition = blocks['sonarr']['title_position'];
	}

	if(typeof(blocks['sonarr'])!=='undefined' && typeof(blocks['sonarr']['title'])!=='undefined'){
		sonarrTitleObject = blocks['sonarr']['title'];
		sonarrTitleObject = sonarrTitleObject .replace(/ /g, '&nbsp;');
	}
	
	// create the static html part
	if (sonarrTitlePosition == 'top'){
		html +='<div class="col-xs-12 mh titlegroups transbg"><h3><em class="fa fa-tv"></em> '+sonarrTitleObject+'</h3></div>';
	}
	html += '<div class="sonarrMain col-xs-'+width+' transbg">';
	
	if (sonarrTitlePosition == 'left') {
		html += '<div class="col-xs-2 col-icon"><em class="fa fa-tv"></em><div class="SonarrBigTitle">'+ sonarrTitleObject +'</div></div>';
		var sonarrColSize = 10;
	}
	html += '<div class="col-xs-'+sonarrColSize+' col-data"><span class="state">' +language.misc.loading+ '</span></div>';
    html += '</div>';

	getSonarrCalendar();
		
    return html;

}

function getSonarrCalendar() {
	var maxItems = 5;
	if(typeof(settings['sonarr_maxitems'])!=='undefined' && parseFloat(settings['sonarr_maxitems'])>0) maxItems=settings['sonarr_maxitems'];

	var view = 'Poster';
	if(typeof(blocks['sonarr'])!=='undefined' && typeof(blocks['sonarr']['view'])!=='undefined'){
		view = blocks['sonarr']['view'];
	}

	// generate Url
	var url = settings['sonarr_url'];
	var apiKey = settings['sonarr_apikey'];
	var startDate = moment().format('YYYY-MM-DD'); 
	var endDate = moment(Date.now() + 32 * 24 * 3600 * 1000).format('YYYY-MM-DD');
	generatedUrl = url + '/api/calendar?apikey=' + apiKey + '&start=' + startDate + '&end=' + endDate ;

	$.getJSON(generatedUrl , function(result){
		var data = '';
		var lastdate;
	    $.each(result, function(i, field){
			if (i >= maxItems) {
				return;
			}

			// get all the images incase we need them later
			var imgBannerUrl = imgPosterUrl = imgFanartUrl = 'unkown';
			$.each( field.series.images, function( key, value ) {
				
				switch (value.coverType) {
					case "banner" :
						imgBannerUrl = value.url;
						break;
					case 'poster' :
						imgPosterUrl = value.url;
						break;
					case 'fanart' :
						imgFanartUrl = value.url;
						break;
				}
					
			})
				
			// transform utc time to local and if within next 6 days show day name instead of date
			var local = moment(field.airDateUtc).local().format('DD-MM-YYYY HH:mm');
			var localDayOnly = moment(field.airDateUtc).local().format('DD-MM-YYYY');
			var nextWeek = moment(startDate).add(6,'days');
			if (moment(field.airDateUtc).isBefore(nextWeek)){
				local = moment(field.airDateUtc).local().format('dddd HH:mm');
				localDayOnly = moment(field.airDateUtc).local().format('dddd');
			}
			
			if (view == 'banner') {
				// Banner View
				if (!(moment(field.airDateUtc).isSame(moment(lastdate), "day")) || lastdate == null ){
					data += '<div class="sonarrDateTitle">'+localDayOnly+'</div>'
				} 
				lastdate = field.airDateUtc;

				data += '<div class="SonarrItem"><img src="'+ imgBannerUrl + '" class="SonarrBanner">';
				if(field.hasFile == true){
					data += '<div class="ribbon"><span>&#x2714;</span></div>'
				} else {
					data += '<div class="ribbonDate">'+ moment(field.airDateUtc).local().format('HH:mm') +'</div>';
				}
			} else {
				// Poster View
				data += '<div class="SonarrItem"><img src="'+ imgPosterUrl + '" class="SonarrPoster">';
				data += '<div class="SonarrData">';
				data += '<span class="SonarrTitleShow">'+ field.series.title +'</span>';
				data += '<span class="SonarrEpisode">'+ field.title +'</span>';
				

				if(field.hasFile == true){
					data += '<span class="SonarrDownloaded">downloaded</span>';
				} else {
					data += '<span class="SonarrAirDate">'+ local +'</span>';
				}
				
				data += '</div>';//SonarrData
			}
	        data += '</div>';//SonarrItem

        });
		
		
		$('.sonarrMain .state').replaceWith(data);

		// Every 15 min recheck
		setTimeout(function(){
			var data = getSonarrCalendar();
			$('.sonarrMain .state').replaceWith(data);
		},(60000*15));
		

	});

}
