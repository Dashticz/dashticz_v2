
var columndiv;
function loadNZBGET(columndiv){
	if(_HOST_NZBGET!==""){
		_data = {"method": "listgroups", "nocache": new Date().getTime(), "params": [100] };
		NZBGET.rpcUrl = _HOST_NZBGET+'/jsonrpc';
		NZBGET.call(_data,'returnNZBGET');
	}
}

function returnNZBGET(data){
	$('.containsnzbget').remove();
	
	$(columndiv).append('<div class="containsnzbget clear" style="display:none;"><div class="titledownloads col-md-12 transbg"><h3></h3></div><div id="downloads"></div></div>');
	$('.titledownloads').find('h3').html('Downloads');
	
	var t=1;
	for(d in data){
		var html = '<div class="col-md-6 transbg">';
			html+='<div class="col-md-12">';
				html+='<strong class="title">'+data[d]['NZBName']+'</strong><br />'+data[d]['DownloadedSizeMB']+'MB / '+data[d]['FileSizeMB']+'MB';
			html+='</div>';
		html+='</div>';
		$('#downloads').append(html);
		$('.containsnzbget').show();
		
		t++;
		if(t==2) t=1;							
	}
	
	setTimeout(function(){ loadNZBGET(); },5000);
}

function resumepauseNZBget(id,func){
	_data = {"method": "editqueue", "nocache": new Date().getTime(), "params": [func, 0, "", [id]] };
	NZBGET.rpcUrl = _HOST_NZBGET+'/jsonrpc';
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