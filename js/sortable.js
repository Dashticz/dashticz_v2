// JavaScript Document
function startSortable(){
	$( ".sortable" ).sortable({
		connectWith: ".sortable",
		helper: "clone",
		tolerance: "pointer",
		update: function( ) {
            var postData2 = $(this).sortable('toArray', {
				attribute: 'data-id'
			});
			conf = "columns["+($(this).index()+1)+"] = {}\n";
			conf+= "columns["+($(this).index()+1)+"]['blocks'] = [";
			for(p in postData2){
				if(parseInt(postData2[p]) && postData2[p].toLowerCase().indexOf("s") <= 0 && postData2[p].toLowerCase().indexOf("_") <= 0){
					conf+=postData2[p]+',';
				}
				else {
					conf+='"'+postData2[p]+'",';
				}
			}
			conf=conf.substr(0,(conf.length-1))+']';
			alert(conf);
        }
	}).disableSelection();
}