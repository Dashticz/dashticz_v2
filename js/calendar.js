function addCalendar(calobject,icsUrlorg){
	icsUrl = icsUrlorg;
	
	if(typeof(icsUrl.url)!=='undefined'){
		var random = getRandomInt(1,100000);
		var html = '<div class="modal fade" id="calendar_'+random+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			  html+='</div>';
			  html+='<div class="modal-body">';
				  html+='<iframe data-src="'+icsUrl.url+'" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
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
	
	if(typeof(icsUrl.icalurl)!=='undefined'){
		icsUrl = icsUrl.icalurl.replace(/webcal?\:\/\//i, "https://");
	}
	
	var maxitems = 10;
	if(typeof(icsUrl.maxitems)!=='undefined') maxitems = icsUrl.maxitems;

	calobject.find('.transbg').html('Loading...');
	icsUrl = icsUrl.replace('https://cors-anywhere.herokuapp.com/','');
	
	var calitems = {}
	var counter = 1;
	$.getJSON('https://cors-anywhere.herokuapp.com/http://ical-to-json.herokuapp.com/convert.json?url='+encodeURI(icsUrl),function(data){
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

			calitems[startdateStamp+"_"+counter] = event;
			counter++
		}
		
		var counter = 1;
		Object.keys(calitems).sort().forEach(function(c) {
			if(c > moment().format('X') && counter < maxitems){
				var widget = '<div style="color:'+calitems[c].color+'">' + calitems[c]['startdate'] + calitems[c]['enddate'] + ' - <b>' + calitems[c].summary + '</b></div>';		
				calobject.find('.transbg').append(widget);
				counter++;
			}
		});
		
		setInterval(function(){
			addCalendar(calobject,icsUrlorg)
		},(60000*5));
		
	});
	
}