function loadTrafficInfo(random,trafficobject,key){
	var width = 12;
	if(typeof(trafficobject.width)!=='undefined') width=trafficobject.width;
	var html='<div data-id="trafficinfo.'+key+'" class="col-xs-'+width+'" style="padding-left:0px !important;padding-right:0px !important;">';
	if(typeof(trafficobject.title)!=='undefined') html+='<div class="col-xs-12 mh titlegroups transbg"><h3>'+trafficobject.title+'</h3></div>';
					
	html+='<div class="trafficinfo trafficinfo'+random+' col-xs-12 transbg">';
		if(typeof(trafficobject.icon)!=='undefined' && trafficobject.icon!==''){
			if(trafficobject.icon.substr(0,2)!=='fas') trafficobject.icon = 'fa-'+trafficobject.icon;
			html+='<div class="col-xs-2 col-icon">';
				html+='<em class="fas '+trafficobject.icon+'"></em>';
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
	if(typeof(trafficobject.interval)!=='undefined') interval = trafficobject.interval;
	setTimeout(function(){
		$('.trafficinfo'+random+' .state').html(language.misc.loading);
		getProviderData(random,trafficobject);
	},100);
	
	if(trafficobject.provider.toLowerCase() == 'ns'){
		if(parseFloat(interval)<60) interval=60; // limit request because of limitations in NS api for my private key ;)
	}
	
	setInterval(function(){
		getProviderData(random,trafficobject)
	},(interval * 1000));
	return html;
}

function getProviderData(random,trafficobject){
	var provider = trafficobject.provider.toLowerCase();
	var dataURL = '';
	if(provider == 'anwb'){
		dataURL = 'https://www.anwb.nl/feeds/gethf';
	}
	// To do:
	//else if(provider == 'flitsmeister'){
	//	dataURL = _CORS_PATH + 'http://tesla.flitsmeister.nl/teslaFeed.json';
	//}
	
	$.getJSON(dataURL,function(data){
		dataTrafficInfo(random,data,trafficobject);
	});
	
}
function dataTrafficInfo(random,data,trafficobject){
	var provider = trafficobject.provider.toLowerCase();
	var dataPart = {}
	var i = 0;
	for(d in data){
		if(provider == 'anwb'){
			if(d == 'roadEntries'){
				// still a bug to fix if you define multiple roads in one block and for one of the roads no traffic info is found. Something with 'i'.
				if (typeof(trafficobject.road)!='undefined'){
					var roadArray = [];
					if (trafficobject.road.indexOf(',')){
					   roadArray = trafficobject.road.split(/, |,/);
					} else {
					   roadArray.push(trafficobject.road);
					}
					roadArray.sort();
 					for (var x = 0; x < roadArray.length; x++){
						key = roadArray[x];
						if (typeof(dataPart[key])=='undefined') {
							dataPart[key]=[];
						}
						dataPart[key][i]='';
						dataPart[key][i]+='<div><b>'+roadArray[x]+'</b><br>';
						dataPart[key][i]+='Geen verkeersinformatie';
						dataPart[key][i]+='<br></div>';
						//i++;
					}
				}		
				for(t in data[d]){
					
					var roadId = data[d][t]['road'];
			
					if (typeof(trafficobject.road)=='undefined' || (typeof(trafficobject.road)!='undefined' && roadArray.indexOf(roadId) > -1)) { //&& typeof(trafficobject.segStart)=='undefined' && typeof(trafficobject.segEnd)=='undefined'){
						events = data[d][t]['events'];
						var header = '';
						for(ev in events){
							if ((typeof(trafficobject.trafficJams)=='undefined' || (trafficobject.trafficJams==true && ev=='trafficJams')) || 
								(typeof(trafficobject.roadWorks)=='undefined' || (trafficobject.roadWorks==true && ev=='roadWorks')) ||
								(typeof(trafficobject.radars)=='undefined' || (trafficobject.radars==true && ev=='radars'))) {
								i = 0;	
								for(e in events[ev]){
									key = roadId;
									if(typeof(dataPart[key])=='undefined') {
										dataPart[key]=[];
									}
									dataPart[key][i]='';
									if(key != header) {
										//dataPart[key][i]+='<div><h4><b>'+data[d][t]['road']+'</b></h4><br>';
										dataPart[key][i]+='<div><b>'+data[d][t]['road']+'</b><br>';
										header = key;
									}
									if(events[ev][e]['location']!=null) {
										dataPart[key][i]+=events[ev][e]['location'];	
									}
									if(events[ev][e]['distance']!=null){
										var distance = events[ev][e]['distance']/1000;
										//dataPart[key][i]+=', '+distance+'km';
										//dataPart[key][i]+=', '+Math.round(distance)+'km';
										dataPart[key][i]+=', '+distance.toFixed(1)+'km';
									}
									if(events[ev][e]['delay']!=null){
										var delay = events[ev][e]['delay']/60;
										dataPart[key][i]+=' - '+Math.round(delay)+'min';
									}
									dataPart[key][i]+=':<br>';
									if(events[ev][e]['description']!=null) {
										dataPart[key][i]+=events[ev][e]['description'];
									}
									dataPart[key][i]+='<br></div>';
									i++;
								}
							}
						}
					}
				}				
			} 	
		}
	}
	console.log(dataPart);
	$('.trafficinfo'+random+' .state').html('');
	var c = 1;
	Object.keys(dataPart).forEach(function(d) {
	//Object.keys(dataPart).sort().forEach(function(d) {
		for(p in dataPart[d]){
			if(c <= trafficobject.results) $('.trafficinfo'+random+' .state').append(dataPart[d][p]);
			c++;
		}
	});
	
	if(typeof(trafficobject.show_lastupdate)!=='undefined' && trafficobject.show_lastupdate==true){
		var dt = new Date();
		$('.trafficinfo'+random+' .state').append('<em>'+language.misc.last_update+': '+addZero(dt.getHours()) + ":"+addZero(dt.getMinutes())+":"+addZero(dt.getSeconds())+'</em>')
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

/* 							key = deps[de]['time'];
							if(typeof(trafficobject.destination)!='undefined'){
								var destinationArray = [];
								if(trafficobject.destination.indexOf(',')){
								   destinationArray = trafficobject.destination.split(/, |,/);
								} else {
								   destinationArray.push(trafficobject.destination);
								}
							}
							if(typeof(trafficobject.service)!='undefined'){
								var serviceArray = [];
								if(trafficobject.service.indexOf(',')){
								   serviceArray = trafficobject.service.split(/, |,/);
								} else {
								   serviceArray.push(trafficobject.service);
								}
							}
							if(typeof(trafficobject.destination)=='undefined' && typeof(trafficobject.service)=='undefined' ||
								((typeof(trafficobject.destination)!='undefined' && destinationArray.indexOf(deps[de]['destinationName']) > -1) && typeof(trafficobject.service)=='undefined') ||
								((typeof(trafficobject.service)!='undefined' && serviceArray.indexOf(deps[de]['service']) > -1) && typeof(trafficobject.destination)=='undefined') ||
								((typeof(trafficobject.destination)!='undefined' && destinationArray.indexOf(deps[de]['destinationName']) > -1) && (typeof(trafficobject.service)!='undefined' && serviceArray.indexOf(deps[de]['service']) > -1))
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
								if(typeof(trafficobject.show_via)=='undefined' || trafficobject.show_via==true){
									if(typeof(dest[1])!=='undefined') {
										dataPart[key][i]+=' via '+dest[1];
									} else if(typeof(deps[de]['RouteTekst'])!=='undefined') {
										dataPart[key][i]+=' via '+deps[de]['viaNames'];
									}	
								}
								dataPart[key][i]+=' </div>';
								i++;
							} */
