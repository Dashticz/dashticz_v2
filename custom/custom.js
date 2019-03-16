 //add custom javascript in here
function afterGetDevices(){
	$('.buttons-first .state').html(alldevices["691"].Data);
	$('.block_691_1').click(function() {
		toSlide(2);
	})
//	mydiv = 	$('.items > div');
//	console.log(mydiv);
//	$('.items > div:contains("Hele")').addClass('.selectedbutton');
}

function getExtendedBlockTypes(blocktypes){
	//blocktypes.Type['Lighting 2'] = { icon: 'fa fa-lightbulb-o', title: '<Name>', value: 'ds' }
	return blocktypes;
} 
