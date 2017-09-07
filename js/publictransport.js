function loadPublicTransport(random,transportobject,key){
	var width = 12;
	if(typeof(transportobject.width)!=='undefined') width=transportobject.width;
	var html='<div data-id="publictransport.'+key+'" class="col-xs-'+width+'" style="padding-left:0px !important;padding-right:0px !important;">';
	if(typeof(transportobject.title)!=='undefined') html+='<div class="col-xs-12 mh titlegroups transbg"><h3>'+transportobject.title+'</h3></div>';
					
	html+='<div class="publictransport publictransport'+random+' col-xs-12 transbg">';
		if(typeof(transportobject.icon)!=='undefined' && transportobject.icon!==''){
			if(transportobject.icon.substr(0,2)!=='fa') transportobject.icon = 'fa-'+transportobject.icon;
			html+='<div class="col-xs-2 col-icon">';
				html+='<em class="fa '+transportobject.icon+'"></em>';
			html+='</div>';
			html+='<div class="col-xs-10 col-data">';
				html+='<span class="state"></span>';
			html+='</div>';
		}
		else {
				html+='<div class="col-xs-12 col-data">';
					html+='<span class="state"></span>';
				html+='</div>';
		}
		html+='</div>';	
	
	html+='</div>';	
	
	//Get data every interval and call function to create block
	var interval = 60;
	if(typeof(transportobject.interval)!=='undefined') interval = transportobject.interval;
	getData(random,transportobject);
	setTimeout(function(){$('.publictransport'+random+' .state').html(language.misc.loading);},100);
	
	if(transportobject.provider.toLowerCase() == 'ns'){
		if(parseFloat(interval)<60) interval=60; // limit request because of limitations in NS api for my private key ;)
	}
	
	setInterval(function(){
		getData(random,transportobject)
	},(interval * 1000));
	return html;
}

function getData(random,transportobject){
	var provider = transportobject.provider.toLowerCase();
	var dataURL = '';
	if(provider == 'vvs'){
		dataURL = 'https://efa-api.asw.io/api/v1/station/'+transportobject.station+'/departures/';
	}
	else if(provider == 'mobiliteit'){
		dataURL = 'https://cors-anywhere.herokuapp.com/http://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt&format=json&id=A=1@O='+transportobject.station;
	}
	else if(provider == '9292' || provider == '9292-train' || provider == '9292-bus' || provider == '9292-metro' || provider == '9292-tram-bus'){
		dataURL = 'https://cors-anywhere.herokuapp.com/http://api.9292.nl/0.1/locations/'+transportobject.station+'/departure-times?lang=nl-NL&time='+$.now();
	}
	
	$.getJSON(dataURL,function(data){
		dataPublicTransport(random,data,transportobject);
	});
	
}
function dataPublicTransport(random,data,transportobject){
	var provider = transportobject.provider.toLowerCase();
	var dataPart = {}
	var i = 0;
	for(d in data){
		if(provider == '9292' || provider == '9292-train' || provider == '9292-bus' || provider =='9292-metro' || provider == '9292-tram-bus'){
			for(t in data[d]){
				if(provider == '9292' || 
				   (data[d][t]['id']=='bus' && provider == '9292-bus') || 
				   (data[d][t]['id']=='metro' && provider == '9292-metro') || 
				   (data[d][t]['id']=='tram-bus' && provider == '9292-tram-bus') || 
				   (data[d][t]['id']=='trein' && provider == '9292-train')
				){
					deps = data[d][t]['departures'];
					for(de in deps){
						key = deps[de]['time'];
						if(typeof(dataPart[key])=='undefined') dataPart[key]=[];
						dataPart[key][i]='';
						dataPart[key][i]+='<div><b>'+deps[de]['time']+'</b> ';
						if(deps[de]['realtimeText']!=null) dataPart[key][i]+='<span id="latetrain">'+deps[de]['realtimeText'].replace(' min.','')+'</span> ';
						if(deps[de]['platform']!=null) dataPart[key][i]+='- Spoor '+deps[de]['platform'];
						else dataPart[key][i]+='- Lijn '+deps[de]['service'];
						
						dest = deps[de]['destinationName'].split(' via ');
						dataPart[key][i]+=' - '+dest[0];
						if(typeof(transportobject.show_via)=='undefined' || transportobject.show_via==true){
							if(typeof(dest[1])!=='undefined') dataPart[key][i]+=' via '+dest[1];
							else if(typeof(deps[de]['RouteTekst'])!=='undefined') dataPart[key][i]+=' via '+deps[de]['viaNames'];
						}
						dataPart[key][i]+=' </div>';
						i++;
					}
				}
			}
		}
		else if(provider == 'mobiliteit') {
			for(t in data[d]) {
				if(data[d][t]['time']==null){
					continue;
				}
				key = data[d][t]['time'];
				if(typeof(dataPart[key])=='undefined') dataPart[key]=[];
				var fullArrivalDate = data[d][t]['date'] + ' ' + data[d][t]['time'];
				var arrivalTime =  moment(fullArrivalDate);
				var delay = 'Null';
				if (data[d][t]['rtTime']) {
					var fullRealArrivalDate = data[d][t]['rtDate'] + ' ' + data[d][t]['rtTime'];
					var realArrivalTime = moment(fullRealArrivalDate);
					var delay = '+' + realArrivalTime.diff(arrivalTime, 'minutes');
				}
				dataPart[key][i]='';
				dataPart[key][i]+='<div><span class="trainTime">'+ arrivalTime.format('HH:mm') +'</span>';
			
				if (delay <= 0) {
					dataPart[key][i]+='<span id="notlatetrain">'+delay+'</span>';
				} 
				else if (delay > 0) {
					dataPart[key][i]+='<span id="latetrain">'+delay+'</span>';
				}
				dataPart[key][i]+='<span class="trainSeparator"> - </span>'
				dataPart[key][i]+='<span class="trainLine '+(data[d][t]['name']).replace(/ /g,'')+'">'+data[d][t]['name']+'</span>';
				dataPart[key][i]+='<span class="trainSeparator"> - </span>'

				dest = data[d][t]['direction'].split(' via ');
				dataPart[key][i]+='<span class="trainDestination">'+dest[0];
				if(typeof(transportobject.show_via)=='undefined' || transportobject.show_via==true){
					if(typeof(dest[1])!=='undefined') dataPart[key][i]+=' via '+dest[1];
				}

				dataPart[key][i]+='</span></div>';
			}
		}
		else if(provider == 'vvs'){
			arrivalTime = data[d]['departureTime']['year']+':'+data[d]['departureTime']['month']+':'+data[d]['departureTime']['day']+':'+addZero(data[d]['departureTime']['hour'])+':'+addZero(data[d]['departureTime']['minute']);
			arrivalTimeShow = addZero(data[d]['departureTime']['hour'])+':'+addZero(data[d]['departureTime']['minute']);
			if(typeof(dataPart[arrivalTime])=='undefined') dataPart[arrivalTime]=[];
			dataPart[arrivalTime][i] = '';
			arrivalTimeScheduled = addMinutes(arrivalTimeShow, data[d]['delay']*-1);
			dataPart[arrivalTime][i]+='<div><b>'+arrivalTimeShow+'</b> ';
			if(data[d]['delay'] == 0) latecolor='notlatetrain';	
			if(data[d]['delay'] > 0) latecolor='latetrain';
			dataPart[arrivalTime][i]+='<span id="'+latecolor+'">+'+data[d]['delay']+' Min.</span> ';
			dataPart[arrivalTime][i]+='<span id="departureScheduled">('+language.misc.scheduled+': '+arrivalTimeScheduled+')</span> ';
			dataPart[arrivalTime][i]+='- '+data[d]['number']+' ';
			
			dest = data[d]['direction'].split(' via ');
			dataPart[arrivalTime][i]+=dest[0];
			if(typeof(transportobject.show_via)=='undefined' || transportobject.show_via==true){
				if(typeof(dest[1])!=='undefined') dataPart[arrivalTime][i]+=' via '+dest[1];
			}
			
			dataPart[arrivalTime][i]+='</div>';
			i++;
		}
	}
	
	$('.publictransport'+random+' .state').html('');
	var c = 1;
	Object.keys(dataPart).forEach(function(d) {
	//Object.keys(dataPart).sort().forEach(function(d) {
		for(p in dataPart[d]){
			if(c<=transportobject.results) $('.publictransport'+random+' .state').append(dataPart[d][p]);
			c++;
		}
	});
	
	if(typeof(transportobject.show_lastupdate)!=='undefined' && transportobject.show_lastupdate==true){
		var dt = new Date();
		$('.publictransport'+random+' .state').append('<em>'+language.misc.last_update+': '+addZero(dt.getHours()) + ":"+addZero(dt.getMinutes())+":"+addZero(dt.getSeconds())+'</em>')
	}
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
