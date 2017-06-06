function loadTrash (random,trashobject) {
	
	var service = trashobject.trashapp;
	var postcode = trashobject.zipcode;
	var homenumber = trashobject.housenumber;
	if(typeof(trashobject.country)!=='undefined') var country = trashobject.country;
	if(typeof(trashobject.street)!=='undefined') var street = trashobject.street;
	
	var key = 'UNKNOWN';
	if(typeof(trashobject.key)!=='undefined') key=trashobject.key;
				
				
	
	var dates = {};
    var curr = '';
    var data = '';
	var teller=0;
	
	var width = 12;
	if(typeof(trashobject.width)!=='undefined') width=trashobject.width;
	
	var maxitems = 5;
	if(typeof(trashobject.maxitems)!=='undefined') maxitems=trashobject.maxitems;
	
	var hide_icon = false;
	if(typeof(trashobject.hide_icon)!=='undefined') hide_icon=trashobject.hide_icon;
	
	var html='<div class="trash trash'+random+' col-xs-'+width+' transbg" data-id="trash.'+key+'">';
		if(!hide_icon){
			html+='<div class="col-xs-4 col-icon">';
				html+='<img class="trashcan" src="img/kliko.png" style="opacity:0.1" />';
			html+='</div>';
			html+='<div class="col-xs-8 col-data">';
				html+='<span class="state">Loading...</span>';
			html+='</div>';
		}
		else {
			html+='<div class="col-xs-12 col-data">';
				html+='<span class="state">Loading...</span>';
			html+='</div>';
		}
	html+='</div>';
	
	var returnDates={};
	
	var startDate = moment();
	var endDate = moment(Date.now() + 32 * 24 * 3600 * 1000);
	
	if(service=='ical'){
		var url = 'https://cors-anywhere.herokuapp.com/http://ical-to-json.herokuapp.com/convert.json?url='+trashobject.icalurl;
		$.getJSON(url,function(data,textstatus,jqXHR){
			respArray = data.calendars[0].events;
			for (var i in respArray) {
				var curr = respArray[i]['summary'];
				curr = capitalizeFirstLetter(curr.toLowerCase());
				
				var testDate = moment(respArray[i].dtstart[0]);
				if(testDate.isBetween(startDate, endDate, 'days', true)){
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}
					returnDates[curr][testDate.format("YYYY-MM-DD")+teller]=getTrashRow(curr,testDate,respArray[i]['description']);
					teller++;
				}
			}
			addToContainer(random,returnDates,maxitems);
			
		});
		//alert(1);
	}
	
	if(service=='deafvalapp'){
		$.get('https://cors-anywhere.herokuapp.com/http://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=' +
			country + '&postcode=' + postcode + '&straatId=0&huisnr=' + homenumber + '&huisnrtoev=',function(data){
			var respArray = data.toString().split('\n').join('').split(";");
			respArray.pop();
			for (var i in respArray) {
				if (isNaN(parseInt(respArray[i]))) {
					dates[respArray[i]] = [];
					curr = respArray[i];
					curr = capitalizeFirstLetter(curr.toLowerCase());
						
				}
				else {
					
					var testDate = moment(respArray[i],"DD-MM-YYYY");
					if(testDate.isBetween(startDate, endDate, 'days', true)){
						if(typeof(returnDates[curr])=='undefined'){
							returnDates[curr] = {}
						}
						returnDates[curr][testDate.format("YYYY-MM-DD")+teller]=getTrashRow(curr,testDate);
						teller++;
					}
				}
			}
			addToContainer(random,returnDates,maxitems);
		});
	}
	
	if(service=='cure' || service=='cyclusnv' || service=='sudwestfryslan' || service=='alphenaandenrijn' || service=='rmn' || service=='circulusberkel' || service=='gemeenteberkelland' || service=='meerlanden' || service=='venray'){
		$('.trash'+random+' .state').html('');
	
		var baseURL = '';
		if(service=='cure') baseURL = 'https://afvalkalender.cure-afvalbeheer.nl';
		if(service=='cyclusnv') baseURL = 'https://afvalkalender.cyclusnv.nl';
		if(service=='gemeenteberkelland') baseURL = 'https://afvalkalender.gemeenteberkelland.nl';
		if(service=='meerlanden') baseURL = 'https://afvalkalender.meerlanden.nl';
		if(service=='venray') baseURL = 'https://afvalkalender.venray.nl';
		if(service=='circulusberkel') baseURL = 'https://afvalkalender.circulus-berkel.nl';
		if(service=='rmn') baseURL = 'https://inzamelschema.rmn.nl';
		if(service=='alphenaandenrijn') baseURL = 'http://afvalkalender.alphenaandenrijn.nl';
		if(service=='sudwestfryslan') baseURL = 'http://afvalkalender.sudwestfryslan.nl';
		
		$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/rest/adressen/' + postcode + '-' + homenumber,function(data){
			$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/rest/adressen/'+data[0].bagId+'/afvalstromen',function(data){
				
				for(d in data){
					if(data[d]['ophaaldatum']!==null){
						var curr = data[d]['menu_title'];
						curr = capitalizeFirstLetter(curr.toLowerCase());
						if(typeof(returnDates[curr])=='undefined'){
							returnDates[curr] = {}
						}
						var testDate = moment(moment(data[d]['ophaaldatum']));
						returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+teller]=getTrashRow(curr,testDate);
						teller++;
					}
				}
				
				addToContainer(random,returnDates,maxitems);
			});
		});
	}
	if(service=='ophaalkalender'){
		$('.trash'+random+' .state').html('');
	
		var baseURL = '';
		if(service=='ophaalkalender') baseURL = 'http://www.ophaalkalender.be';
		
		$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/calendar/findstreets/?query=' + street + '&zipcode=' + postcode,function(data){
			$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/api/rides?id='+data[0].Id+'&housenumber=0&zipcode='+postcode,function(data){
				
				for(d in data){
					
					var curr = data[d]['title'];
					curr = capitalizeFirstLetter(curr.toLowerCase());
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}
					var testDate = moment(moment(data[d]['start']));
					if(testDate.isBetween(startDate, endDate, 'days', true)){
						returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+teller]=getTrashRow(curr,testDate,data[d]['color']);
						teller++;
					}
				}
				
				addToContainer(random,returnDates,maxitems);
			});
		});
	}
	if(service=='mijnafvalwijzer'){
		$.getJSON('https://cors-anywhere.herokuapp.com/http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + postcode + '&street=&huisnummer=' + homenumber + '&toevoeging=',function(data){
			data = data.data.ophaaldagen.data;
			for(d in data){
				if(typeof(returnDates[curr])=='undefined'){
					returnDates[curr] = {}
				}
				
				var curr = data[d]['nameType'];
				curr = capitalizeFirstLetter(curr.toLowerCase());
				
				var testDate = moment(data[d]['date']);
				if(testDate.isBetween(startDate, endDate, 'days', true)){
					returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+teller]=getTrashRow(curr,testDate);
					teller++;
				}
			}
			
			addToContainer(random,returnDates,maxitems);

		});
	}
	
	if(service=='hvc'){
		$.getJSON('https://cors-anywhere.herokuapp.com/http://inzamelkalender.hvcgroep.nl/push/calendar?postcode=' + postcode + '&huisnummer=' + homenumber,function(data){
			for(d in data){
				var curr = data[d].naam;
				curr = capitalizeFirstLetter(curr.toLowerCase());
				if(typeof(returnDates[curr])=='undefined'){
					returnDates[curr] = {}
				}

				for(dt in data[d].dateTime){
					
					var testDate = moment(data[d].dateTime[dt].date);
					if(testDate.isBetween(startDate, endDate, 'days', true)){
						returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+curr]=getTrashRow(curr,testDate);
					}
				}
			}
			addToContainer(random,returnDates,maxitems);
		});
	}
	if(service=='recyclemanager'){
		$.getJSON('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + postcode + '&number=' + homenumber,function(data){
			for(d in data.data){
				for(o in data.data[d].occurrences){
					var curr = data.data[d].occurrences[o].title;
					curr = capitalizeFirstLetter(curr.toLowerCase());
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}

					var testDate = moment(data.data[d].occurrences[o].from.date);
					if(testDate.isBetween(startDate, endDate, 'days', true)){
						returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+teller]=getTrashRow(curr,testDate);
						teller++;
					}
				}
			}
			
			addToContainer(random,returnDates,maxitems);

		});
	}
	if (service=='edg'){
 		$.getJSON('https://cors-anywhere.herokuapp.com/https://www.edg.de/JsonHandler.ashx?dates=1&street=' + street + '&nr=' + homenumber + '&cmd=findtrash&tbio=0&tpapier=1&trest=1&twert=1&feiertag=0',function(data){
 			data = data.data;
 
 			for(d in data){
 				if(typeof(returnDates[curr])=='undefined'){
 					returnDates[curr] = {}
 				}
 				
 				var testDate = moment(data[d]['date']);
 				if(testDate.isBetween(startDate, endDate, 'days', true)){
 					for (e in data[d].fraktion){
 						returnDates[curr][moment(data[d]['date']).format("YYYY-MM-DD")]=getTrashRow(data[d].fraktion[e],testDate);
						teller++;
 					}
 				
 				}
 			}
 			addToContainer(random,returnDates,maxitems);
 
 		});		
 	}
	return html;
			
}

function getTrashRow(c,d,orgcolor){
	color='';
	if(typeof(trashcolors)!=='undefined' && typeof(trashcolors[c])!=='undefined') color=' style="color:'+trashcolors[c]+'"';
	if(typeof(trashnames)!=='undefined' && typeof(trashnames[c])!=='undefined') c = trashnames[c];
	
	orgcolor_attr=' data-color="'+color+'";';
	if(typeof(orgcolor)!=='undefined') orgcolor_attr=' data-color="'+orgcolor+'"';
	
	return '<div class="trashrow"'+color+orgcolor_attr+'>'+c+': '+d.format("DD-MM-YYYY")+'</div>';
}

function addToContainer(random,returnDates,maxitems){
	var returnDatesSimple={}
	var done = {};
	for(c in returnDates){
		for(cr in returnDates[c]){
			returnDatesSimple[cr] = returnDates[c][cr];
			done[c]=true;
		}
	}

	$('.trash'+random+' .state').html('');
	var c=1;
	
	if(typeof(_DO_NOT_USE_COLORED_TRASHCAN)=='undefined' || _DO_NOT_USE_COLORED_TRASHCAN===false){	
		$('.trash'+random).find('img.trashcan').css('opacity','0.7');
	}
	else {
		$('.trash'+random).find('img.trashcan').css('opacity','1');
	}
	Object.keys(returnDatesSimple).sort().forEach(function(key) {

		var skey = key.split('_');
		skey = skey[0];
		var date = moment(skey).format("DD-MM-YYYY");
		var currentdate = moment();
		var tomorrow = moment().add(1,'days');
		var nextweek = moment().add(6,'days');
	
		if(typeof(_DO_NOT_USE_COLORED_TRASHCAN)=='undefined' || _DO_NOT_USE_COLORED_TRASHCAN===false){
			if (c==1 && (
				returnDatesSimple[key].toLowerCase().indexOf("gft") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("tuin") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("refuse bin") >= 0
			)
			   ){
				$('.trash'+random).find('img.trashcan').attr('src','img/kliko_green.png');
			}
			else if (c==1 && (
				returnDatesSimple[key].toLowerCase().indexOf("plastic") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("pmd") >= 0
			)
			){
				$('.trash'+random).find('img.trashcan').attr('src','img/kliko_orange.png');
			}
			else if (c==1 && (
				returnDatesSimple[key].toLowerCase().indexOf("rest") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("grof") >= 0
			)
			){
				$('.trash'+random).find('img.trashcan').attr('src','img/kliko_grey.png');
			}
			else if (c==1 && (
				returnDatesSimple[key].toLowerCase().indexOf("papier") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("blauw") >= 0 || 
				returnDatesSimple[key].toLowerCase().indexOf("recycling bin collection") >= 0
			)){
				$('.trash'+random).find('img.trashcan').attr('src','img/kliko_blue.png');
			}
			else if (c==1 && returnDatesSimple[key].toLowerCase().indexOf("chemisch") >= 0){
				$('.trash'+random).find('img.trashcan').attr('src','img/kliko_red.png');
			}
		}
		
		if(date == currentdate.format("DD-MM-YYYY")){
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, lang['today']);
			returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtoday');
		}   
		else if(date == tomorrow.format("DD-MM-YYYY")){
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, lang['tomorrow']);
			returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtomorrow');
		}
		else if(moment(skey).isBetween(currentdate, nextweek, 'days', true)){
			var datename = moment(date,"DD-MM-YYYY").locale(_ICALENDAR_LOCALE).format("dddd");
			datename = datename.charAt(0).toUpperCase() + datename.slice(1);
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, datename);
		}  

		if(c<=maxitems) $('.trash'+random+' .state').append(returnDatesSimple[key]);
		c++;
		
	});
}