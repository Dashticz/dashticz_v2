function getTrainInfo(){
	var rssurl = 'https://cors-anywhere.herokuapp.com/https://www.rijdendetreinen.nl/rss/';

	$.ajax(rssurl, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {
            var count = 0;
			$(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
               if(el.find("title").text().substr(0,8)!=='Opgelost'){
				count++;
			   }
            });

			var width=12;
			if(typeof(blocks['train'])!=='undefined' && typeof(blocks['train']['width'])!=='undefined') width=blocks['train']['width'];
			$("div.train").replaceWith('<div class="train"><div class="col-xs-'+width+' transbg hover trainrow" data-toggle="modal" data-target="#trainweb" onclick="setSrc(this);"><div class="col-xs-2 col-icon"><em class="fa fa-train"></em></div><div class="col-xs-10"><strong>'+count+' '+language.misc.notifications_ns+'</strong></div></div></div>');
	
			if($('#trainweb').length==0){
				var html = '<div class="modal fade" id="trainweb" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
				  html+='<div class="modal-dialog">';
					html+='<div class="modal-content">';
					  html+='<div class="modal-header">';
						html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
					  html+='</div>';
					  html+='<div class="modal-body">';
						  html+='<iframe data-popup="https://www.rijdendetreinen.nl/" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
					  html+='</div>';
					html+='</div>';
				  html+='</div>';
				html+='</div>';
				$('body').append(html);
			}
        }   
    });
	setTimeout(function(){getTrainInfo();}, (60000*5));
	
}
