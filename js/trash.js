function loadTrash (random,trashobject) {
	
	var service = trashobject.trashapp;
	var postcode = trashobject.zipcode;
	var homenumber = trashobject.housenumber;
	var country = trashobject.country;
	
	var dates = {};
	var done = {};
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
	
	if(service=='deafvalapp'){
		var returnDates={};
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
						returnDates[curr][moment(moment(respArray[i], "DD-MM-YYYY")).format("YYYY-MM-DD")]='<div>'+curr+': '+respArray[i]+'</div>'
					}
				}
			}
			
			var returnDatesSimple={}
			for(c in returnDates){
				for(cr in returnDates[c]){
					//if(typeof(done[c])=='undefined'){
						returnDatesSimple[cr] = returnDates[c][cr];
						done[c]=true;
					//}
				}
			}
			
			$('.trash'+random+' .state').html('');
			var c=1;
			Object.keys(returnDatesSimple).sort().forEach(function(key) {
				if(c<=3) $('.trash'+random+' .state').append(returnDatesSimple[key]);
				c++;
			});
		});
	}
	
	return html;
			
}