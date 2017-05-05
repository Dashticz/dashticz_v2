function loadTrash (random,trashobject) {
	
	var service = trashobject.trashapp;
	var postcode = trashobject.zipcode;
	var homenumber = trashobject.housenumber;
	if(typeof(trashobject.country)!=='undefined') var country = trashobject.country;
	
	var dates = {};
    var curr = '';
    var data = '';
	var teller=0;
	
	var width = 12;
	if(typeof(trashobject.width)!=='undefined') width=trashobject.width;
	var html='<div class="trash'+random+' col-xs-'+width+' mh transbg">';
		html+='<div class="col-xs-4 col-icon">';
			html+='<img class="trashcan" src="img/kliko.png" />';
		html+='</div>';
		html+='<div class="col-xs-8 col-data">';
			html+='<span class="state"></span>';
		html+='</div>';
	html+='</div>';
	
	var returnDates={};
	if(service=='deafvalapp'){
		$.get('https://cors-anywhere.herokuapp.com/http://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=' +
			country + '&postcode=' + postcode + '&straatId=0&huisnr=' + homenumber + '&huisnrtoev=',function(data){
			var respArray = data.toString().split('\n').join('').split(";");
			respArray.pop();
			for (var i in respArray) {
				if (isNaN(parseInt(respArray[i]))) {
					dates[respArray[i]] = [];
					curr = respArray[i];
				}
				else {
					
					var startDate = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
					var endDate = moment(moment(Date.now() + 32 * 24 * 3600 * 1000).format("DD-MM-YYYY"), "DD-MM-YYYY");
					var testDate = moment(respArray[i], "DD-MM-YYYY");

					if(testDate.isBetween(startDate, endDate, 'days', true)){
						if(typeof(returnDates[curr])=='undefined'){
							returnDates[curr] = {}
						}
						returnDates[curr][moment(moment(respArray[i], "DD-MM-YYYY")).format("YYYY-MM-DD")+teller]='<div>'+curr+': '+respArray[i]+'</div>';
					}
				}
			}
			
			addToContainer(random,returnDates);
		});
	}
	
	if(service=='cure' || service=='cyclusnv' || service=='alphenaandenrijn' || service=='rmn' || service=='circulusberkel' || service=='gemeenteberkelland' || service=='meerlanden' || service=='venray'){
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
		
		$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/rest/adressen/' + postcode + '-' + homenumber,function(data){
			$.getJSON('https://cors-anywhere.herokuapp.com/'+baseURL + '/rest/adressen/'+data[0].bagId+'/afvalstromen',function(data){
				
				console.log(data);
				for(d in data){
					if(data[d]['ophaaldatum']!==null){
						if(typeof(returnDates[curr])=='undefined'){
							returnDates[curr] = {}
						}
						returnDates[curr][moment(moment(data[d]['ophaaldatum'], "YYYY-MM-DD")).format("YYYY-MM-DD")+teller]='<div>'+data[d]['menu_title']+': '+moment(moment(data[d]['ophaaldatum'], "YYYY-MM-DD")).format("DD-MM-YYYY")+'</div>';
					}
				}
				
				addToContainer(random,returnDates);
				console.log(returnDates);
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
				
				var startDate = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
				var endDate = moment(moment(Date.now() + 32 * 24 * 3600 * 1000).format("DD-MM-YYYY"), "DD-MM-YYYY");
				var testDate = moment(data[d]['date'], "YYYY-MM-DD");

				if(testDate.isBetween(startDate, endDate, 'days', true)){
						
					returnDates[curr][moment(moment(data[d]['date'], "YYYY-MM-DD")).format("YYYY-MM-DD")+teller]='<div>'+data[d]['nameType']+': '+moment(moment(data[d]['date'], "YYYY-MM-DD")).format("DD-MM-YYYY")+'</div>';
					teller++;
				}
			}
			
			addToContainer(random,returnDates);

		});
	}
	if(service=='recyclemanager'){
		$.getJSON('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + postcode + '&number=' + homenumber,function(data){
			for(d in data.data){
				for(o in data.data[d].occurrences){
					curr = data.data[d].occurrences[o].title;
					if(typeof(returnDates[curr])=='undefined'){
						returnDates[curr] = {}
					}

					var startDate = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
					var endDate = moment(moment(Date.now() + 32 * 24 * 3600 * 1000).format("DD-MM-YYYY"), "DD-MM-YYYY");
					var testDate = moment(moment(data.data[d].occurrences[o].from.date), "YYYY-MM-DD");
					if(testDate.isBetween(startDate, endDate, 'days', true)){

						returnDates[curr][moment(moment(data.data[d].occurrences[o].from.date)).format("YYYY-MM-DD")+teller]='<div>'+curr+': '+moment(moment(data.data[d].occurrences[o].from.date)).format("DD-MM-YYYY")+'</div>';
					}
				}
			}
			
			addToContainer(random,returnDates);

		});
	}
	return html;
			
}

function addToContainer(random,returnDates){
   
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
   Object.keys(returnDatesSimple).sort().forEach(function(key) {

      var date = moment(key).format("DD-MM-YYYY");
      var currentdate = moment(Date.now()).format("DD-MM-YYYY");
      if(date == currentdate){
		  returnDatesSimple[key] = (returnDatesSimple[key]).replace(date, "Vandaag");
	  }
         
      if(c<=3) $('.trash'+random+' .state').append(returnDatesSimple[key]);
      c++;
   });
}