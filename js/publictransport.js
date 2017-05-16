function loadPublicTransport(random,transportobject){
	var width = 12;
	if(typeof(transportobject.width)!=='undefined') width=transportobject.width;
	var html='<div class="publictransport'+random+' col-xs-'+width+' transbg">';
			html+='<div class="col-xs-2 col-icon">';
				html+='<em class="fa fa-'+transportobject.icon+'"></em>';
			html+='</div>';
			html+='<div class="col-xs-10 col-data">';
				html+='<span class="state"></span>';
			html+='</div>';
		html+='</div>';	
	
	//Get data every interval and call function to create block
	var interval = 60;
	if(typeof(transportobject.interval)!=='undefined') interval = transportobject.interval;
	getData(random,transportobject);
	
	if(transportobject.provider.toLowerCase() == 'ns'){
		if(parseFloat(interval)<60) interval=60; // limit request because of limitations in NS api for my private key ;)
	}
	
	setInterval(function(){
		getData(random,transportobject)
	},(interval * 1000));
	return html;
}

function getData(random,transportobject){
	if(transportobject.provider.toLowerCase() == 'vvs'){
		dataURL = 'https://efa-api.asw.io/api/v1/station/'+transportobject.station+'/departures/';
	}
	if(transportobject.provider.toLowerCase() == 'ns'){
		dataURL = 'https://wedevise.nl/dashticz/vertrektijden.php?s='+transportobject.station;
	}
	
	$('.publictransport'+random+' .state').html('Loading...');
	$.getJSON(dataURL,function(data){
		dataPublicTransport(random,data,transportobject);
	});
	
}
function dataPublicTransport(random,data,transportobject){
	var dataPart = '';
	var i = 0;
	for(d in data){
		if(transportobject.provider.toLowerCase() == 'ns'){
			dataPart+='<div><b>'+moment(data[d]['VertrekTijd']).format("HH:mm")+'</b> ';
			if(typeof(data[d]['VertrekVertragingTekst'])!=='undefined') dataPart+='<span id="latetrain">'+data[d]['VertrekVertragingTekst']+'</span> ';
			dataPart+='- Spoor '+data[d]['VertrekSpoor']+' - '+data[d]['EindBestemming'];
			if(typeof(data[d]['RouteTekst'])!=='undefined') dataPart+=' <em> via '+data[d]['RouteTekst']+'</em>';
			dataPart+=' </div>';
		}
		else if(transportobject.provider.toLowerCase() == 'vvs'){
			delayMinutes = data[d]['delay'];
			line = data[d]['number'];
			direction = data[d]['direction'];
			arrivalTime = addZero(data[d]['departureTime']['hour'])+':'+addZero(data[d]['departureTime']['minute']);
			arrivalTimeScheduled = addMinutes(arrivalTime, delayMinutes*-1);
			
			dataPart+='<div><b>'+arrivalTime+'</b> ';
			if(typeof arrivalTimeScheduled != 'undefined'){
				if(delayMinutes == 0){
					latecolor='notlatetrain';
				}	
				else if(delayMinutes > 0){
					latecolor='latetrain';
				}
				dataPart+='<span id="'+latecolor+'">+'+delayMinutes+' Min.</span> ';
				dataPart+='<span id="departureScheduled">('+lang['scheduled']+': '+arrivalTimeScheduled+')</span> ';
			}
			dataPart+='- '+direction+'</div>';
		}
		i = i+1;
		if (i === transportobject.results) { break; }
	}
	
	$('.publictransport'+random+' .state').html(dataPart)
	
	var dt = new Date();
	$('.publictransport'+random+' .state').append('<em>'+lang['last_update']+': '+addZero(dt.getHours()) + ":"+addZero(dt.getMinutes())+":"+addZero(dt.getSeconds())+'</em>')
}

function addZero(input){
	if(input < 10){
		return '0' + input;
	}
	else{
		return input;
	}
}
function addMinutes(time/*"hh:mm"*/, minsToAdd/*"N"*/) {
  function z(n){
    return (n<10? '0':'') + n;
  }
  var bits = time.split(':');
  var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

  return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);  
} 
