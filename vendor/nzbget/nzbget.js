
var column;
function loadNZBGET(columndiv){
	column = columndiv;
	if(typeof(settings['host_nzbget']) !=='undefined' && settings['host_nzbget']!==""){
		if($('.containsnzbget').length==0){
			var width = 12;
			if(typeof(blocks['nzbget'])!=='undefined' && typeof(blocks['nzbget']['width'])!=='undefined'){
				width = blocks['nzbget']['width'];
			}
			var html='<div class="containsnzbget clear col-xs-'+width+'" style="display:none;">';
				html+='<div id="downloads"></div>';
			html+='</div>';
			$(column).append(html);
		}
		
		//$('.containsnzbget #downloads').html('');

		_data = {"method": "listgroups", "nocache": new Date().getTime(), "params": [100] };
		NZBGET.rpcUrl = settings['host_nzbget']+'/jsonrpc';
		NZBGET.call(_data,'returnNZBGET');
	}
}

function returnNZBGET(data){
	var width = 6;
	if(typeof(blocks['nzbget'])!=='undefined' && typeof(blocks['nzbget']['downloads_width'])!=='undefined'){
		width = blocks['nzbget']['downloads_width'];
	}

	var t=1;
	for(d in data){
		var html = '<div class="mh transbg col-xs-'+width+' nzbget'+data[d]['FirstID']+'">';
			html+='<div class="col-xs-12">';
				html+='<strong class="title">'+data[d]['NZBName']+'</strong><br />'+data[d]['DownloadedSizeMB']+'MB / '+data[d]['FileSizeMB']+'MB';
			html+='</div>';
		html+='</div>';
		if($('.containsnzbget #downloads .nzbget'+data[d]['FirstID']).length>0){
			$('.containsnzbget #downloads .nzbget'+data[d]['FirstID']).replaceWith(html);
		}
		else {
			$('.containsnzbget #downloads').append(html);
		}
		$('.containsnzbget').show();
		
		t++;
		if(t==2) t=1;							
	}
	
	setTimeout(function(){ loadNZBGET(column); },5000);
}

function resumepauseNZBget(id,func){
	_data = {"method": "editqueue", "nocache": new Date().getTime(), "params": [func, 0, "", [id]] };
	NZBGET.rpcUrl = settings['host_nzbget']+'/jsonrpc';
	NZBGET.call(_data,'');
	$('#nzbget-'+id+' .details.pause,#nzbget-'+id+' .details.play').toggle();
}

var NZBGET = (new function($)
{
	'use strict';
	
	// Properties
	this.rpcUrl;
	this.defaultFailureCallback;
	this.connectErrorMessage = 'Cannot establish connection';

	this.call = function(request, completed_callback, failure_callback, timeout)
	{
		request = JSON.stringify(request);
		var _this = this;
		
		//var request = JSON.stringify({nocache: new Date().getTime(), method: method, params: params});
		var xhr = new XMLHttpRequest();

		xhr.open('post', this.rpcUrl);
		
		if (timeout)
		{
			xhr.timeout = timeout;
		}

		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === 4)
			{
				var res = 'Unknown error';
				var result;
				if (xhr.status === 200)
				{
					if (xhr.responseText != '')
					{
						try
						{
							result = JSON.parse(xhr.responseText);
						}
						catch (e)
						{
							res = e;
						}
						if (result)
						{
							if (result.error == null)
							{
								res = result.result;
								eval(completed_callback+'(res)');;
								return;
							}
							else
							{
								res = result.error.message + '<br><br>Request: ' + request;
							}
						}
					}
					else
					{
						res = 'No response received.';
					}
				}
				else if (xhr.status === 0)
				{
					res = _this.connectErrorMessage;
				}
				else
				{
					res = 'Invalid Status: ' + xhr.status;
				}

				if (failure_callback)
				{
					failure_callback(res, result);
				}
				else
				{
					_this.defaultFailureCallback(res, result);
				}
			}
		};
		xhr.send(request);
	}
}(jQuery));