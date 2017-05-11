//add custom javascript in here
function afterGetDevices(){
	
	
}

function getExtendedBlockTypes(blocktypes){
	//blocktypes.Type['Lighting 2'] = { icon: 'fa fa-lightbulb-o', title: '<Name>', value: 'ds' }
	return blocktypes;
}

function getBlock_233old(device,idx){
	$('.block_'+idx).attr('onclick','switchDevice(this)');
	var html='';
	html+='<div class="col-xs-4 col-icon">';
		if(device['Status']=='Off') html+=iconORimage(idx,'fa-toggle-off','','off icon');
		else html+=iconORimage(idx,'fa-toggle-on','','on icon');
	html+='</div>';
	html+='<div class="col-xs-8 col-data">';
	html+='<strong class="title">'+device['Name']+'</strong><br />';
	if(device['Status']=='Off') html+='<span class="state">AFWEZIG</span>';
	else html+='<span class="state">AANWEZIG</span>';

	if(_SHOW_LASTUPDATE) html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
	html+='</div>';
	return html;
}