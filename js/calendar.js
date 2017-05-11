function addCalendar(calobject,icsUrlorg){
	if(typeof(icsUrlorg.calendars)=='undefined'){
		var icsUrl = {}
		icsUrl.calendars = []
		icsUrl.maxitems = icsUrlorg.maxitems;
		icsUrl.calendars[0] = {}
		icsUrl.calendars[0].calendar = icsUrlorg;
	}
	else icsUrl = icsUrlorg;
	
	var done = 0;
	var amountc = objectlength(icsUrl.calendars);
	var calitems = {}
	var counter = 1;
	var colors = {}
	
	calobject.find('.transbg').html('Loading...');
	
	var maxitems = 10;
	if(typeof(icsUrl.maxitems)!=='undefined') maxitems = icsUrl.maxitems;
	
	for(c in icsUrl.calendars){
		curUrl = icsUrl.calendars[c].calendar;
		if(typeof(curUrl.url)!=='undefined'){
			var random = getRandomInt(1,100000);
			var html = '<div class="modal fade" id="calendar_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
			  html+='<div class="modal-dialog">';
				html+='<div class="modal-content">';
				  html+='<div class="modal-header">';
					html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
				  html+='</div>';
				  html+='<div class="modal-body">';
					  html+='<iframe data-src="'+curUrl.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
				  html+='</div>';
				html+='</div>';
			  html+='</div>';
			html+='</div>';
			$('body').append(html);
			calobject.find('.transbg').addClass('hover');
			calobject.attr('data-toggle','modal');
			calobject.attr('data-id','');
			calobject.attr('data-target','#calendar_'+random);
			calobject.attr('onclick','setSrc(this);');
		}

		if(typeof(curUrl.icalurl)!=='undefined'){
			curUrl = curUrl.icalurl.replace(/webcal?\:\/\//i, "https://");
		}
		
		var color = '';
		if(typeof(icsUrl.calendars[c].color)!=='undefined') color = icsUrl.calendars[c].color;
		
		curUrl = curUrl.replace('https://cors-anywhere.herokuapp.com/','');
		
		colors[$.md5(curUrl)] = color;
		if(curUrl.indexOf("192.168") <= 0 ){
			curUrl = 'https://cors-anywhere.herokuapp.com/http://ical-to-json.herokuapp.com/convert.json?url='+curUrl;
		}
		$.getJSON(curUrl,function(data,textstatus,jqXHR){
			
			var url = this.url.replace('https://cors-anywhere.herokuapp.com/http://ical-to-json.herokuapp.com/convert.json?url=','');
			done++;
			calobject.find('.transbg').html('');
			for(e in data.calendars[0].events){
				event = data.calendars[0].events[e];
				var startdate = moment(event.dtstart).format(_ICALENDAR_DATEFORMAT);

				var startdateStamp = moment(event.dtstart).format('X');
				var enddate = moment(event.dtend).format(_ICALENDAR_DATEFORMAT);
				if(startdate=='Invalid date'){
					if(event.dtstart[0].length==8) var startdate = moment(event.dtstart[0]).format(_ICALENDAR_DATEFORMAT).replace('00:00','') + lang['entire_day_event'];
					else var startdate = moment(event.dtstart[0]).format(_ICALENDAR_DATEFORMAT);
					var startdateStamp = moment(event.dtstart[0]).format('X');
				}

				if(enddate=='Invalid date'){
					if(event.dtend[0].length==8) var enddate = '';
					else var enddate = moment(event.dtend[0]).format(_ICALENDAR_DATEFORMAT);
				}

				if(moment(enddate,_ICALENDAR_DATEFORMAT).format('YYYY-MM-DD') == moment(startdate,_ICALENDAR_DATEFORMAT).format('YYYY-MM-DD')){
					enddate = moment(enddate,_ICALENDAR_DATEFORMAT).format('HH:mm');
				}


				if(enddate!=='') enddate =' - ' + enddate;
				event.enddate = enddate;
				event.startdate = startdate;
				event.color = colors[$.md5(url)];
				calitems[startdateStamp+"_"+counter] = event;
				counter++
			}
			
			if(done==amountc){
				var counter = 1;
				Object.keys(calitems).sort().forEach(function(c) {
					if(c > moment().format('X') && counter <= maxitems){
						var widget = '<div style="color:'+calitems[c].color+'">' + calitems[c]['startdate'] + calitems[c]['enddate'] + ' - <b>' + calitems[c].summary + '</b></div>';		
						calobject.find('.transbg').append(widget);
						counter++;
					}
				});				
			}
			
		});
	}
	
	setInterval(function(){
		addCalendar(calobject,icsUrlorg)
	},(60000*5));
	
}

function parseCal(){
	
}