function loadPublicTransport(random,transportobject,key){
	var width = 12;
	if(typeof(transportobject.width)!=='undefined') width=transportobject.width;
	var html='<div data-id="publictransport.'+key+'" class="col-xs-'+width+'" style="padding-left:0px !important;padding-right:0px !important;">';
	if(typeof(transportobject.title)!=='undefined') html+='<div class="col-xs-12 mh titlegroups transbg"><h3>'+transportobject.title+'</h3></div>';
					
	html+='<div class="publictransport publictransport'+random+' col-xs-12 transbg">';
		if(typeof(transportobject.icon)!=='undefined' && transportobject.icon!==''){
			if(transportobject.icon.substr(0,2)!=='fas') transportobject.icon = 'fa-'+transportobject.icon;
			html+='<div class="col-xs-2 col-icon">';
				html+='<em class="fas '+transportobject.icon+'"></em>';
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
	setTimeout(function(){
		$('.publictransport'+random+' .state').html(language.misc.loading);
		getData(random,transportobject);
	},100);
	
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
		dataURL = _CORS_PATH + 'http://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt&duration=1439&maxJourneys='+transportobject.results+'&format=json&id=A=1@O='+transportobject.station;
	}
	else if(provider.slice(0,4) == '9292'){
		dataURL = _CORS_PATH + 'http://api.9292.nl/0.1/locations/'+transportobject.station+'/departure-times?lang=nl-NL';
	}
	else if(provider == 'irailbe'){
		var date = new Date($.now());
		var todayDate = moment(date).format('DDMMYY');
		var todayTime = moment(date).format('HHmm');
		dataURL ='https://api.irail.be/liveboard/?station='+transportobject.station+'&date='+todayDate+'&time='+todayTime+'&arrdep=departure&lang=nl&format=json&fast=false&alerts=false';
	}
	else if(provider == 'delijnbe'){
		dataURL ='https://www.delijn.be/rise-api-core/haltes/Multivertrekken/'+transportobject.station+'/'+transportobject.results;
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
				var l_id= data[d][t]['id'];
				if(provider == '9292' || 
					(l_id=='bus' && provider == '9292-bus') || 
					(l_id=='tram' && provider == '9292-tram')  ||
					(l_id=='bus' && provider == '9292-tram-bus')  ||
					(l_id=='tram' && provider == '9292-tram-bus')  ||
					(l_id=='tram-bus' && provider == '9292-tram-bus') || 
					(l_id=='bus-tram' && provider == '9292-tram-bus') || 
					(l_id=='tram-metro' && provider == '9292-tram-bus') || 
					(l_id=='metro' && provider == '9292-metro') || 
					(l_id=='trein' && provider == '9292-train') || 
					(l_id=='veerboot' && provider == '9292-boat')
				){
					deps = data[d][t]['departures'];
					for(de in deps){
						key = deps[de]['time'];
						if(typeof(transportobject.destination)!='undefined'){
							var destinationArray = [];
							if(transportobject.destination.indexOf(',')){
							   destinationArray = transportobject.destination.split(/, |,/);
							} else {
							   destinationArray.push(transportobject.destination);
							}
						}
						if(typeof(transportobject.service)!='undefined'){
							var serviceArray = [];
							if(transportobject.service.indexOf(',')){
							   serviceArray = transportobject.service.split(/, |,/);
							} else {
							   serviceArray.push(transportobject.service);
							}
						}
						if(typeof(transportobject.destination)=='undefined' && typeof(transportobject.service)=='undefined' ||
							((typeof(transportobject.destination)!='undefined' && destinationArray.indexOf(deps[de]['destinationName']) > -1) && typeof(transportobject.service)=='undefined') ||
							((typeof(transportobject.service)!='undefined' && serviceArray.indexOf(deps[de]['service']) > -1) && typeof(transportobject.destination)=='undefined') ||
							((typeof(transportobject.destination)!='undefined' && destinationArray.indexOf(deps[de]['destinationName']) > -1) && (typeof(transportobject.service)!='undefined' && serviceArray.indexOf(deps[de]['service']) > -1))
							)
						{
							if(typeof(dataPart[key])=='undefined') {
								dataPart[key]=[];
							}
							dataPart[key][i]='';
							dataPart[key][i]+='<div><b>'+deps[de]['time']+'</b> ';
							if(deps[de]['realtimeText']!=null) {
								dataPart[key][i]+='<span id="latetrain">'+deps[de]['realtimeText'].replace(' min.','')+'</span> ';
							}	
							if(deps[de]['platform']!=null) {
								dataPart[key][i]+='- Spoor '+deps[de]['platform'];
							} else {
								dataPart[key][i]+='- Lijn '+deps[de]['service'];
							}
							dest = deps[de]['destinationName'].split(' via ');
							dataPart[key][i]+=' - '+dest[0];
							if(typeof(transportobject.show_via)=='undefined' || transportobject.show_via==true){
								if(typeof(dest[1])!=='undefined') {
									dataPart[key][i]+=' via '+dest[1];
								} else if(typeof(deps[de]['RouteTekst'])!=='undefined') {
									dataPart[key][i]+=' via '+deps[de]['viaNames'];
								}	
							}
							dataPart[key][i]+=' </div>';
							i++;
						}
					}
				}
			}
		}
		else if(provider == 'mobiliteit') {
			for(t in data[d]) {
				if(data[d][t]['time']==null){
					continue;
				}
				key = data[d][t]['time'] + data[d][t]['trainNumber'];
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
				dataPart[key][i]+='<div><div class="trainTime">'+ arrivalTime.format('HH:mm');
			
				if (delay <= 0) {
					dataPart[key][i]+='<span id="notlatetrain"> '+delay+'</span>';
				} 
				else if (delay > 0) {
					dataPart[key][i]+='<span id="latetrain"> '+delay+'</span>';
				}
				dataPart[key][i]+='</div><span class="trainSeparator"> - </span>'
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
	
	if(provider == 'irailbe'){
		for(var j=0;j<data.departures.departure.length;j++) {
			key = data.departures.departure[j].time + data.departures.departure[j].vehicle;
			if(typeof(dataPart[key])=='undefined') dataPart[key]=[];
			var fullDepartureDate = data.departures.departure[j].time;
			var delay = data.departures.departure[j].delay/60;
			dataPart[key][i]='';
			dataPart[key][i]+='<div><div class="trainTime">'+ moment.unix(fullDepartureDate).format('HH:mm');
		
			if (delay <= 0) {
				dataPart[key][i]+='<span id="notlatetrain"> '+delay+' Min.</span>';
			} 
			else if (delay > 0) {
				dataPart[key][i]+='<span id="latetrain"> '+delay+' Min.</span>';
			}
			dataPart[key][i]+='</div>'
			dataPart[key][i]+='<span class="trainLine">Spoor '+data.departures.departure[j].platform+'</span>';
			dataPart[key][i]+='<span class="trainSeparator"> - </span>'
			dataPart[key][i]+='<span class="trainDestination">'+data.departures.departure[j].station+'</span>';
			dataPart[key][i]+='<span class="trainSeparator"> - </span>'
			dataPart[key][i]+='<span class="trainNumber">'+data.departures.departure[j].vehicle+'</span>';
			dataPart[key][i]+='</div>';
			i++;
		}
	}
	else if(provider == 'delijnbe'){
		for(var j=0;j<data.lijnen.length;j++) {
			key = data.lijnen[j].vertrekCalendar + data.lijnen[j].voertuigNummer;
			if(typeof(dataPart[key])=='undefined') dataPart[key]=[];
			var fullDepartureDate = data.lijnen[j].vertrekCalendar;
			var delay = data.lijnen[j].vertrekTijd;
			dataPart[key][i]='';
			dataPart[key][i]+='<div><div class="trainTime">'+ delay;
			dataPart[key][i]+='</div>'
			dataPart[key][i]+='<div><span class="trainLine" style="border-color:'+data.lijnen[j].kleurAchterGrondRand+'; background-color:'+data.lijnen[j].kleurAchterGrond+';color:'+data.lijnen[j].kleurVoorGrond+';">&nbsp;'+data.lijnen[j].lijnNummerPubliek+'&nbsp;</span>';
			dataPart[key][i]+='<span class="trainSeparator">&nbsp;&nbsp;</span>'
			dataPart[key][i]+='<span class="trainDestination">'+data.lijnen[j].omschrijving+'</span></div>';
			dataPart[key][i]+='<div><span class="trainSeparator">Bestemming </span>'
			dataPart[key][i]+='<span class="trainDestination">'+data.lijnen[j].bestemming+'</span></div>';
			dataPart[key][i]+='</div>';
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
