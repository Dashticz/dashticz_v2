function getTraffic(){
	
	var rssurl = 'https://cors-anywhere.herokuapp.com/http://www.vid.nl/VI/_rss';
	
	$.ajax(rssurl, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {
			
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
               var el = $(this);
				
				var width=12;
				if(typeof(blocks['traffic'])!=='undefined' && typeof(blocks['traffic']['width'])!=='undefined') width=blocks['traffic']['width'];
				var text = el.find("title").text();
				text = text.split(') [');
				text = text[0]+')';
				$("div.traffic").replaceWith('<div class="traffic"><div class="col-xs-'+width+' hover transbg trafficrow" data-toggle="modal" data-target="#trafficweb" onclick="setSrc(this);"><div class="col-xs-2 col-icon"><em class="fa fa-car"></em></div><div class="col-xs-10"><strong>'+text+'</strong></div></div></div>');

				if($('#trafficweb').length==0){
					var html = '<div class="modal fade" id="trafficweb" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
					  html+='<div class="modal-dialog">';
						html+='<div class="modal-content">';
						  html+='<div class="modal-header">';
							html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
						  html+='</div>';
						  html+='<div class="modal-body">';
							  html+='<iframe data-popup="http://www.vid.nl/VI/overzicht" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
						  html+='</div>';
						html+='</div>';
					  html+='</div>';
					html+='</div>';
					$('body').append(html);
				}
			});
		}
	});	
	
	setTimeout(function(){getTraffic();}, (60000*5));
}