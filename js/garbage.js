function loadGarbage () {
	var startDate = moment();
	var endDate = moment(Date.now() + 32 * 24 * 3600 * 1000);

	var random = getRandomInt(1,100000);
	
	var service = settings['garbage_company'];
	var postcode = settings['garbage_zipcode'];
	var homenumber = settings['garbage_housenumber'];
	var street = settings['garbage_street'];
	
	var key = 'garbage';	
	
	var dates = {};
    var curr = '';
    var data = '';
	var teller=0;
	
	var width = 12;
	if(typeof(settings['garbage_width'])!=='undefined' && parseFloat(settings['garbage_width'])>0) width=settings['garbage_width'];

	var maxitems = 5;
	if(typeof(settings['garbage_maxitems'])!=='undefined' && parseFloat(settings['garbage_maxitems'])>0) maxitems=settings['garbage_maxitems'];
	
	var hide_icon = false;
	if(typeof(settings['garbage_hideicon'])!=='undefined' && parseFloat(settings['garbage_hideicon'])==1) hide_icon=true;
	
	var html='<div class="trash trash'+random+' col-xs-'+width+' transbg" data-id="trash.'+key+'">';
		if(!hide_icon){
			html+='<div class="col-xs-4 col-icon">';
				html+='<img class="trashcan" src="img/kliko.png" style="opacity:0.1" />';
			html+='</div>';
			html+='<div class="col-xs-8 col-data">';
				html+='<span class="state">'+language.misc.loading+'</span>';
			html+='</div>';
		}
		else {
			html+='<div class="col-xs-12 col-data">';
				html+='<span class="state">'+language.misc.loading+'</span>';
			html+='</div>';
		}
	html+='</div>';
	
	var returnDates={};
	
	if(service=='ical' || service=='vianen' || service=='goes' || service=='uden' || service=='deurne' || service=='best' || service=='veldhoven' || service=='gemertbakelmaandag' || service=='gemertbakeldinsdag' || service=='gemertbakelwoensdag'){
		if(service=='ical') var url = 'https://wedevise.nl/dashticz/ical/demo/?url='+settings['garbage_icalurl'];
		if(service=='gemertbakelmaandag') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://calendar.google.com/calendar/ical/o44qrtdhls8saftmesm5rqb85o%40group.calendar.google.com/public/basic.ics';
		if(service=='gemertbakeldinsdag') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://calendar.google.com/calendar/ical/6p8549rssv114ddevingime95o%40group.calendar.google.com/public/basic.ics';
		if(service=='gemertbakelwoensdag') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://calendar.google.com/calendar/ical/cv40f4vaie10v54f72go6ipb78%40group.calendar.google.com/public/basic.ics';
		if(service=='veldhoven') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://www.veldhoven.nl/afvalkalender/2017/' + postcode + '-' + homenumber + '.ics';
		if(service=='best') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://www.gemeentebest.nl/afvalkalender/2017/' + postcode + '-' + homenumber + '.ics';
		if(service=='uden') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://www.uden.nl/inwoners/afval/ophaaldagen-afval/2017/' + postcode + '-' + homenumber + '.ics';
		if(service=='vianen') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=https://www.vianen.nl/afval/afvalkalender/2017/' + postcode + '-' + homenumber + '.ics';
		if(service=='goes') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=http://afvalkalender.goes.nl/2017/' + postcode + '-' + homenumber + '.ics';
		if(service=='deurne') var url = 'https://wedevise.nl/dashticz/ical/demo/?url=http://afvalkalender.deurne.nl/Afvalkalender/download_ical.php?p=&h=&t=&jaar=2017';
		$.getJSON(url,function(data,textstatus,jqXHR){
			respArray = data;
			for (var i in respArray) {
				var curr = respArray[i]['title'];
				curr = capitalizeFirstLetter(curr.toLowerCase());
				
				var testDate = moment(respArray[i].startt);
				if(testDate.isBetween(startDate, endDate, 'days', true)){
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}
					returnDates[curr][testDate.format("YYYY-MM-DD")+teller]=getTrashRow(curr,testDate,respArray[i]['title']);
					teller++;
				}
			}
			addToContainer(random,returnDates,maxitems);
			
		});
	}
	
	if(service=='deafvalapp'){
		$.get('https://cors-anywhere.herokuapp.com/http://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=NL&postcode=' + postcode + '&straatId=0&huisnr=' + homenumber + '&huisnrtoev=',function(data){
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
	
	/*if(service=='omri'){
		$.post('http://www.omrin.nl/bij-mij-thuis/services/afvalkalender/',{
			'zipcode': postcode.substr(0,4),
			'zipcodeend':postcode.substr(4,6),
			'housenumber':homenumber,
			'addition':'',
			'send':'Mijn overzicht'

		},function(data){
			console.log(data);
		});
	}*/
	if(service=='twentemilieu'){
		$.post('https://wasteapi.2go-mobile.com/api/FetchAdress',{
			'companyCode':'8d97bb56-5afd-4cbc-a651-b4f7314264b4',
			'postCode': postcode,
			'houseNumber':homenumber,
			'houseLetter':'',
			'houseNumberAddition':''

		},function(data){
			$.post('https://wasteapi.2go-mobile.com/api/GetCalendar',{
				'companyCode':'8d97bb56-5afd-4cbc-a651-b4f7314264b4',
				'uniqueAddressID':data['dataList'][0]['UniqueId'],
				'startDate':startDate.format("YYYY-MM-DD"),
				'endDate':endDate.format("YYYY-MM-DD")

			},function(data){
				data = data.dataList;
				for(d in data){
					var curr = data[d].description;
					curr = capitalizeFirstLetter(curr.toLowerCase());
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}

					for(dt in data[d].pickupDates){
						var testDate = moment(data[d].pickupDates[dt]);
						if(testDate.isBetween(startDate, endDate, 'days', true)){
							returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+curr]=getTrashRow(curr,testDate);
						}
					}
				}
				addToContainer(random,returnDates,maxitems);
			});
		});
		
	}
	if(service=='cure' || service=='dar' || service=='waalre' || service=='cyclusnv' || service=='sudwestfryslan' || service=='alphenaandenrijn' || service=='rmn' || service=='circulusberkel' || service=='gemeenteberkelland' || service=='meerlanden' || service=='venray'){
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
		if(service=='dar') baseURL = 'https://afvalkalender.dar.nl';
		if(service=='waalre') baseURL = 'https://afvalkalender.waalre.nl';
		
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
	
		var baseURL = 'http://www.ophaalkalender.be';
		
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
	if(service=='afvalwijzerarnhem'){
		$('.trash'+random+' .state').html('');
	
		var baseURL = 'http://www.afvalwijzer-arnhem.nl';
		$.get('https://cors-anywhere.herokuapp.com/'+baseURL + '/applicatie?ZipCode='+postcode+'&HouseNumber='+homenumber+'&HouseNumberAddition=',function(data){
			$(data).find('ul.ulPickupDates li').each(function(){
				var row = $(this).html().split('</div>');
				var curr = row[0].replace('<div>','').trim();
	 			var testDate = moment(row[1].trim(),'DD-MM-YYYY');
				if(testDate.isBetween(startDate, endDate, 'days', true)){

					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}
					returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+curr]=getTrashRow(curr,testDate);
				}
	 
            });
			addToContainer(random,returnDates,maxitems);
		});
	}
	if(service=='mijnafvalwijzer'){
		$.getJSON('https://cors-anywhere.herokuapp.com/http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + postcode + '&street=&huisnummer=' + homenumber + '&toevoeging=',function(data){
			data = data.data.ophaaldagen.data;
			for(d in data){
				var curr = data[d]['nameType'];
				curr = capitalizeFirstLetter(curr.toLowerCase());
				
				var testDate = moment(data[d]['date']);
				if(testDate.isBetween(startDate, endDate, 'days', true)){
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}
					returnDates[curr][testDate.format("YYYY-MM-DD")+'_'+curr]=getTrashRow(curr,testDate);
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
	
	setTimeout(function(){
		var html = loadTrash(random,trashobject);
		$('.trash'+random).replaceWith(html);
	},(60000*15));
	
	return html;
			
}

function getTrashRow(c,d,orgcolor){
	color='';
	if(typeof(trashcolors)!=='undefined' && typeof(trashcolors[c])!=='undefined') color=' style="color:'+trashcolors[c]+'"';
	if(typeof(trashnames)!=='undefined' && typeof(trashnames[c])!=='undefined') c = trashnames[c];
	
	if(c.length == 0) return '';
	if(c.substr(0,7)=='Bo zl12'){
		if(c.toLowerCase().indexOf("gft")>0) c='GFT';
		else if(c.toLowerCase().indexOf("rest")>0) c='Restafval';
		else if(c.toLowerCase().indexOf("vec")>0) c='Verpakkingen';
	}
	orgcolor_attr=' data-color="'+color+'";';
	if(typeof(orgcolor)!=='undefined') orgcolor_attr=' data-color="'+orgcolor+'"';
	
	return '<div class="trashrow"'+color+orgcolor_attr+'>'+c+': '+d.format("DD-MM-YYYY")+'</div>';
}

function addToContainer(random,returnDates,maxitems){
	var returnDatesSimple={}
	var done = {};
	for(c in returnDates){
		for(cr in returnDates[c]){
			if (returnDates[c][cr] == '') continue;
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
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, language.weekdays.today);
			returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtoday');
		}   
		else if(date == tomorrow.format("DD-MM-YYYY")){
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, language.weekdays.tomorrow);
			returnDatesSimple[key] = returnDatesSimple[key].replace('trashrow', 'trashtomorrow');
		}
		else if(moment(skey).isBetween(currentdate, nextweek, 'days', true)){
			var datename = moment(date,"DD-MM-YYYY").locale(settings['calendarlanguage']).format("dddd");
			datename = datename.charAt(0).toUpperCase() + datename.slice(1);
			returnDatesSimple[key] = returnDatesSimple[key].replace(date, datename);
		}  

		if(c<=maxitems) $('.trash'+random+' .state').append(returnDatesSimple[key]);
		c++;
		
	});
}
