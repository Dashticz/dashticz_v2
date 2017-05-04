function loadTrash (random,trashobject) {
	
	var service = trashobject.trashapp;
	var postcode = trashobject.zipcode;
	var homenumber = trashobject.housenumber;
	if(typeof(trashobject.country)!=='undefined') var country = trashobject.country;
	
	var dates = {};
    var curr = '';
    var data = '';
	
	var width = 12;
	if(typeof(trashobject.width)!=='undefined') width=trashobject.width;
	var html='<div class="trash'+random+' col-xs-'+width+' mh transbg">';
		html+='<div class="col-xs-4 col-icon">';
			html+='<em class="fa fa-trash fa-small"></em>';
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
						returnDates[curr][moment(moment(respArray[i], "DD-MM-YYYY")).format("YYYY-MM-DD")]='<div>'+curr+': '+respArray[i]+'</div>';
					}
				}
			}
			
			addToContainer(random,returnDates);
		});
	}
	if(service=='cure'){
		$('.trash'+random+' .state').html('');
	
		$.getJSON('https://afvalkalender.cure-afvalbeheer.nl/rest/adressen/' + postcode + '-' + homenumber,function(data){
			$.getJSON('https://afvalkalender.cure-afvalbeheer.nl/rest/adressen/'+data[0].bagId+'/afvalstromen',function(data){
				for(d in data){
					if(data[d]['ophaaldatum']!==null){
						if(typeof(returnDates[curr])=='undefined'){
							returnDates[curr] = {}
						}
						returnDates[curr][moment(moment(data[d]['ophaaldatum'], "YYYY-MM-DD")).format("YYYY-MM-DD")]='<div>'+data[d]['menu_title']+': '+moment(moment(data[d]['ophaaldatum'], "YYYY-MM-DD")).format("DD-MM-YYYY")+'</div>';
					}
				}
				
				addToContainer(random,returnDates);
				
			});
		});
	}
	if(service=='mijnafvalwijzer'){
		$.getJSON('http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + postcode + '&street=&huisnummer=' + homenumber + '&toevoeging=',function(data){
			data = data.data.ophaaldagen.data;
			for(d in data){
				if(typeof(returnDates[curr])=='undefined'){
					returnDates[curr] = {}
				}
				
				var startDate = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
				var endDate = moment(moment(Date.now() + 32 * 24 * 3600 * 1000).format("DD-MM-YYYY"), "DD-MM-YYYY");
				var testDate = moment(data[d]['date'], "YYYY-MM-DD");

				if(testDate.isBetween(startDate, endDate, 'days', true)){
						
					returnDates[curr][moment(moment(data[d]['date'], "YYYY-MM-DD")).format("YYYY-MM-DD")]='<div>'+data[d]['nameType']+': '+moment(moment(data[d]['date'], "YYYY-MM-DD")).format("DD-MM-YYYY")+'</div>';
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
		if(c<=3) $('.trash'+random+' .state').append(returnDatesSimple[key]);
		c++;
	});
}