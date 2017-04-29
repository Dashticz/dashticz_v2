
blocktypes = {}
blocktypes.SubType = {}
blocktypes.SubType['Visibility'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Electric'] = { icon: 'fa fa-plug', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Lux'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Barometer'] = { icon: 'wi wi-barometer', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Gas'] = { icon: 'fa fa-fire', title: lang.gas_usagetoday, value: '<CounterToday>' }
blocktypes.SubType['Sound Level'] = { icon: 'fa fa-volume-up', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Distance'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Alert'] = { icon: 'fa fa-warning', title: '<Data>', value: '<Name>' }
blocktypes.SubType['Percentage'] = { icon: 'fa fa-percent', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Text'] = { icon: 'fa fa-file', title: '<Name>', value: '<Data>' }

blocktypes.SensorUnit = {}
blocktypes.SensorUnit['Fertility'] = { icon: 'fa fa-flask', title: '<Name>', value: '<Data>' }

blocktypes.Type = {}
blocktypes.Type['Rain'] = { icon: 'fa fa-tint', title: '<Name>', value: '<Rain>mm' }
blocktypes.Type['Wind'] = { icon: 'wi wi-wind-direction', title: lang.wind, value: '' }
blocktypes.Type['Temp'] = { icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Temp>'+_TEMP_SYMBOL }
blocktypes.Type['Air Quality'] = { image: 'air.png', title: '<Name>', value: '<Data>' }
blocktypes.Type['UV'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }

blocktypes.HardwareType = {}
blocktypes.HardwareType['Motherboard sensors'] = { icon: 'fa fa-desktop', title: '<Name>', value: '<Data>' }
blocktypes.HardwareType['PVOutput (Input)'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<CounterToday>' }

blocktypes.HardwareName = {}
blocktypes.HardwareName['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name = {}
blocktypes.Name['Rain Expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen mm/uur'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen Verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name['Ping'] = { icon: 'fa fa-arrows-v', title: '<Name>', value: '<Data>' }
blocktypes.Name['Upload'] = { icon: 'fa fa-upload', title: '<Name>', value: '<Data>' }
blocktypes.Name['Download'] = { icon: 'fa fa-download', title: '<Name>', value: '<Data>' }

blocktypes.Name['Maanfase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Moon phase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Mondphase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }


blocktypes = getExtendedBlockTypes(blocktypes);



function getStateBlock(id,icon,title,value,device){
	
	if(device['SubType']=='Percentage' || device['SubType']=='Custom Sensor' || device['TypeImg']=='counter' || device['Type']=='Temp' || device['Type']=='Wind' || device['Type']=='Rain' || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro'){
		getButtonGraphs(device);
		$('.block_'+device['idx']).addClass('hover');
		$('.block_'+device['idx']).attr('data-toggle','modal');
		$('.block_'+device['idx']).attr('data-target','#opengraph'+device['idx']);
	}
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		stateBlock+='<em class="'+icon+'"></em>';
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['switch'])!=='undefined' && blocks[device['idx']]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';

		}
	stateBlock+='</div>';
	return stateBlock;
}


function getStatusBlock(device,block){
	
	var value = block.value;
	var title = block.title;
	
	for(d in device) {
		value = value.replace('<'+d+'>',device[d]);
		title = title.replace('<'+d+'>',device[d]);
	}
						
	if(device['SubType']=='Percentage' || device['SubType']=='Custom Sensor' || device['TypeImg']=='counter' || device['Type']=='Temp' || device['Type']=='Wind' || device['Type']=='Rain' || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro'){
		getButtonGraphs(device);
		$('.block_'+device['idx']).addClass('hover');
		$('.block_'+device['idx']).attr('data-toggle','modal');
		$('.block_'+device['idx']).attr('data-target','#opengraph'+device['idx']);
	}
	
	var attr='';
	if(typeof(device['Direction'])!=='undefined' && typeof(device['DirectionStr'])!=='undefined'){
		attr+=' style="-webkit-transform: rotate('+device['Direction']+'deg);-moz-transform: rotate('+device['Direction']+'deg);-ms-transform: rotate('+device['Direction']+'deg);-o-transform: rotate('+device['Direction']+'deg); transform: rotate('+device['Direction']+'deg);"';
		//start alteration
		if (_USE_BEAUFORT ==true){
			value = Beaufort(device['Speed'])+', '; 
		} else {
			value = device['Speed']+' m/s, '; 
		}
		value+=device['Direction']+'&deg ';
		if (_TRANSLATE_SPEED==true){
			value+=TranslateDirection(device['DirectionStr'])
		} else {
			value+=device['DirectionStr'];
		}
		//end alteration
	}
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['icon'])!=='undefined'){
			stateBlock+='<em class="fa '+blocks[device['idx']]['icon']+'"'+attr+'></em>';
		}
		else if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['image'])!=='undefined'){
			stateBlock+='<img src="img/'+blocks[device['idx']]['image']+'"'+attr+' class="icon" />';
		}
		else {
			if(typeof(block.image)!=='undefined') stateBlock+='<img src="img/'+block.image+'"'+attr+' class="icon" />';
			else stateBlock+='<em class="'+block.icon+'"'+attr+'></em>';
		}
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['switch'])!=='undefined' && blocks[device['idx']]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';
		}
		if(_SHOW_LASTUPDATE && (typeof(blocks[device['idx']])=='undefined' || typeof(blocks[device['idx']]['hide_lastupdate'])=='undefined' || blocks[device['idx']]['hide_lastupdate']===false)){
			stateBlock+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
		}
	stateBlock+='</div>';
	return stateBlock;
}


function iconORimage(idx,defaulticon,defaultimage,classnames,attr,colwidth,attrcol){
	if(typeof(colwidth)=='undefined') colwidth=4;
	if(typeof(attrcol)=='undefined') attrcol='';
	var icon = '<div class="col-xs-'+colwidth+' col-icon" '+attrcol+'>';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['icon'])!=='undefined'){
		icon+='<em class="fa '+blocks[idx]['icon']+' '+classnames+'" '+attr+'></em>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['image'])!=='undefined'){
		icon+='<img src="img/'+blocks[idx]['image']+'" class="'+classnames+'" '+attr+' />';
	}
	else if(defaulticon!=='') icon+='<em class="fa '+defaulticon+' '+classnames+'" '+attr+'></em>';
	else if(defaultimage!=='') icon+='<img src="img/'+defaultimage+'" class="'+classnames+'" '+attr+' />';
	
	icon+='</div>';
	return icon;
}

function getBlockData(device,idx,ontxt,offtxt){
	var data='<div class="col-xs-8 col-data">';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['hide_data'])!=='undefined' && blocks[idx]['hide_data']==true){
		data+='<strong class="title">'+device['Name']+'</strong>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<strong class="title">'+offtxt+'</strong><br />';
		else data+='<strong class="title">'+ontxt+'</strong><br />';
		data+='<span class="state">'+device['Name']+'</span>';
	}
	else {
		data+='<strong class="title">'+device['Name']+'</strong><br />';
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<span class="state">'+offtxt+'</span>';
		else data+='<span class="state">'+ontxt+'</span>';
	}
	if(_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)){
		data+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
	}
	data+='</div>';
	return data;
}
function TranslateDirection(directionstr){
   directionstr='direction_'+directionstr;
   return lang[directionstr];
}

function Beaufort(tmp) {
   if (tmp >= 0 && tmp <= 0,2) {
      bft = "0 Bft";
   }
   if (tmp >= 0.3 && tmp <= 1.5) {
      bft = "1 Bft";
   }
   if (tmp >= 1.6 && tmp <= 3.3) {
      bft = "2 Bft";
   }
   if (tmp >= 3.4 && tmp <= 5.4) {
      bft = "3 Bft";
   }
   if (tmp >= 5.5 && tmp <= 7.9) {
      bft = "4 Bft";
   }
   if (tmp >= 8.0 && tmp <= 10.7) {
      bft = "5 Bft";
   }
   if (tmp >= 10.8 && tmp <= 13.8) {
      bft = "6 Bft";
   }
   if (tmp >= 13.9 && tmp <= 17.1) {
      bft = "7 Bft";
   }
   if (tmp >= 17.2 && tmp <= 20.7) {
      bft = "8 Bft";
   }
   if (tmp >= 20.8 && tmp <= 24.4) {
      bft = "9 Bft";
   }
   if (tmp >= 24.5 && tmp <= 28.4) {
      bft = "10 Bft";
   }
   if (tmp >= 28.5 && tmp <= 32.6) {
      bft = "11 Bft";
   }
   if (tmp >= 32.7) {
      bft = "12 Bft";
   }
   return bft
}