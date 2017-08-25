function loadSonarr(){
	
	// create html
    var html = '<div class="sonarrMain col-xs-12 transbg">';
	html += '<div class="col-xs-2 col-icon"><em class="fa fa-tv"></em><div class="SonarrBigTitle">Upcoming&nbsp;shows</div></div>';
	html += '<div class="col-xs-10 col-data"><span class="state">' +language.misc.loading+ '</span></div>';
    html += '</div>';

	getSonarrCalendar();
		
    return html;

}

function getSonarrCalendar() {
	var maxItems = 5;
	
	// generate Url
	var url = settings['sonarr_url'];
	var apiKey = settings['sonarr_apikey'];
	var startDate = moment().format('YYYY-MM-DD'); 
	var endDate = moment(Date.now() + 32 * 24 * 3600 * 1000).format('YYYY-MM-DD');
	generatedUrl = url + '/api/calendar?apikey=' + apiKey + '&start=' + startDate + '&end=' + endDate ;

	$.getJSON(generatedUrl , function(result){
        var data = '';
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
				
			// transform utc time to local
			var stillUtc = moment.utc(field.airDateUtc).toDate();
			var local = moment(stillUtc).local().format('DD-MM-YYYY HH:mm');

        	data += '<div class="SonarrItem"><img src="'+ imgPosterUrl + '" class="SonarrPoster">';
		    data += '<div class="SonarrData">';
        	data += '<span class="SonarrTitleShow">'+ field.series.title +'</span>';
	        data += '<span class="SonarrEpisode">'+ field.title +'</span>';
			
			if(field.hasFile == true){
				data += '<span class="SonarrDownloaded">Downloaded</span>';
			} else {
				data += '<span class="SonarrAirDate">'+ local +'</span>';
			}
			
		    data += '</div>';//SonarrData
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