// JavaScript Document
function startSortable(){
	$('.newblocks').slideDown();
	$( ".sortable" ).sortable({
		connectWith: ".sortable",
		helper: "clone",
		tolerance: "pointer",
		start: function (event, ui) {
		 if( ui.helper !== undefined )
		  ui.helper.css('position','absolute').css('margin-top', $(window).scrollTop() );
		},
		beforeStop: function (event, ui) {
		 if( ui.offset !== undefined )
		  ui.helper.css('margin-top', 0);
		}
	}).disableSelection();
}

function saveBlocks(){
	var conf = "var columns = {}\n\n";
		$( ".sortable" ).each(function(){
			var curcol = $(this);
			if(!curcol.hasClass('newblocks')){
				var key = curcol.data('colindex');
				if(key=='bar') key = "'bar'";
				conf+= "columns["+key+"] = {};\n";
				conf+= "columns["+key+"]['blocks'] = [";

				curcol.find('> div').each(function(){
					var curdiv = $(this).data('id');

					if(typeof(curdiv)=='number' || (parseFloat(curdiv) && curdiv.toLowerCase().indexOf("s") <= 0 && curdiv.toLowerCase().indexOf("_") <= 0)){
						conf+=curdiv+',';
					}
					else if(curdiv.indexOf(".") > 0){
						conf+=curdiv+',';
					}
					else {
						conf+='\''+curdiv+'\',';
					}

				});
				conf=conf.substr(0,(conf.length-1))+"];";

				if(typeof(columns[curcol.data('colindex')]['width'])!=='undefined'){
					conf+= "\ncolumns["+curcol.data('colindex')+"]['width'] = "+columns[curcol.data('colindex')]['width']+";";
				}
				conf+="\n\n";
			}
		});

		var html = '<div class="modal fade" id="blocksoutput" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog modal-dialog-settings">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-body" style="padding:20px;font-size:14px;"><br>';
				html+='<strong>'+language.settings.blocksave+'</strong><br>If you like my work, you can buy me a beer at: <a href="https://www.paypal.me/robgeerts" target="_blank">https://www.paypal.me/robgeerts</a><br><br><textarea style="width:100%;height:500px;" id="codeToCopy">';

				 html+=conf;

				html+='</textarea>';
			  html+='</div><div class="modal-footer"><button onClick="document.location.href=document.location.href;" type="button" class="btn btn-primary" data-dismiss="modal">'+language.settings.close_reload+'</button></div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
	
	$('#blocksoutput').remove();
	$('body').append(html);
}