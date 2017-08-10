function getGraphs(device,popup){
	var sensor='counter';
	var sensortype = device['SubType'];
	var switchtype = device['SensorUnit'];
	var txtLabelOrg = sensortype;
	var txtUnit = "?";
	
	if(device['Type']=='Rain') sensor='rain';
	if(device['Type']=='Wind') sensor='wind';
	if(device['SubType']=='Percentage' || device['SubType']=='Custom Sensor') {
		sensor='Percentage';
		txtUnit = '%';
	}
	if(device['Type']=='Temp' || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro') {
		sensor = 'temp';
		txtUnit = '°';
	}
	
	if (sensortype == "Gas") {
		txtUnit = "m3";
	}
	else if (sensortype == "Energy") {
		txtUnit = "W";
	}
	else if (sensortype == "Custom Sensor") {
		txtUnit = switchtype;
		sensor = "Percentage";
	}
	else if (sensortype == "Visibility") {
		txtUnit = "km";
	}
	else if (sensortype == "Radiation") {
		txtUnit = "Watt/m2";
	}
	else if (sensortype == "Pressure") {
		txtUnit = "Bar";
	}
	else if (sensortype == "Soil Moisture") {
		txtUnit = "cb";
	}
	else if (sensortype == "Leaf Wetness") {
		txtUnit = "Range";
	}
	else if ((sensortype == "Voltage") || (sensortype == "A/D")) {
		txtUnit = "mV";
	}
	else if (sensortype == "VoltageGeneral") {
		txtLabelOrg = "Voltage";
		txtUnit = "V";
	}
	else if ((sensortype == "DistanceGeneral") || (sensortype == "Distance")) {
		txtLabelOrg = "Distance";
		txtUnit = "cm";
	}
	else if (sensortype == "Sound Level") {
		txtUnit = "dB";
	}
	else if ((sensortype == "CurrentGeneral") || (sensortype == "Current")) {
		txtLabelOrg = "Current";
		txtUnit = "A";
	}
	else if (switchtype == "Weight") {
		txtUnit = "kg";
	}
	else if (sensortype == "Waterflow") {
		txtUnit = "l/min";
		sensor = "Percentage";
	}

	var txtLabel = txtLabelOrg + " (" + txtUnit + ")";
	if (sensortype == "Custom Sensor") {
		txtLabel = txtUnit;
	}
	
	showGraph(device['idx'],device['Name'],txtUnit,'initial',device['CounterToday'],false,sensor,popup);
}

function getGraphByIDX(idx){
	getGraphs(alldevices[idx],true);
}

function getButtonGraphs(device){
	if($( '#opengraph'+device['idx'] ).length==0){
		var html = '<div class="modal fade opengraph'+device['idx']+'" data-idx="'+device['idx']+'" id="opengraph'+device['idx']+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		  html+='<div class="modal-dialog">';
			html+='<div class="modal-content">';
			  html+='<div class="modal-header">';
				html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			  html+='</div>';
			  html+='<div class="modal-body block_graphpopup_'+device['idx']+'">'+language.misc.loading;
			  html+='</div>';
			html+='</div>';
		  html+='</div>';
		html+='</div>';
		$('body').append(html);

		$( '#opengraph'+device['idx'] ).on('shown.bs.modal', function(){
			getGraphByIDX($(this).data('idx'));
		});
	}
}

function showGraph(idx,title,label,range,current,forced,sensor,popup){

	graphColor = '#eee';
	graphColor2 = '#eee';
	if(typeof(popup)=='undefined') forced=false;
	if(typeof(forced)=='undefined') forced=false;
	
	if(typeof(_GRAPHS_LOADED[idx])=='undefined' || _GRAPHS_LOADED[idx]<(time()-(parseFloat(_GRAPHREFRESH)*60))){
		forced = true;
	}
	
	if($('.graphcurrent'+idx).length>0){
		$('.graphcurrent'+idx).html(current);
	}
	
	if(forced || popup){
		_GRAPHS_LOADED[idx] = time();
		//Check settings for standard graph
		if(range=='initial'){
			if(settings['standard_graph']=='hours'){ range='last'}
			else if(settings['standard_graph']=='day'){ range='day'}
			else if(settings['standard_graph']=='month'){ range='month'}
		}
		realrange=range;
		if(range=='last') realrange='day';
		
		$.ajax({
			url: settings['domoticz_ip']+'/json.htm?type=graph&sensor='+sensor+'&idx='+idx+'&range='+realrange+'&time='+new Date().getTime()+'&jsoncallback=?',
			type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				
				var orgtitle = title;
				title = '<h4>'+title;
				if(typeof(current)!=='undefined' && current!=='undefined') title+=': <B class="graphcurrent'+idx+'">'+current+'</B>';
				title+='</h4>';
				
				var buttons ='<button type="button" class="btn btn-default ';
				if(range=='last') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'last\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.last_hours+'</button> ';
				
				buttons+='<button type="button" class="btn btn-default ';
				if(range=='day') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'day\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.today+'</button> ';
				
				buttons+='<button type="button" class="btn btn-default ';
				if(range=='month') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'month\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.last_month+'</button>';
		
				if(popup==true) var html = '<div class="graphpopup" id="graph'+idx+'">';
				else var html = '<div class="graph" id="graph'+idx+'">';
					html+='<div class="transbg col-xs-12">';
						html+=''+title+'<br /><div style="margin-left:15px;">'+buttons+'</div><br /><div id="graphoutput'+idx+'"></div>';
							
					html+='</div>';
				html+='</div>';
				
				if(data.status=="ERR") alert('Could not load graph!');
				else {
				
					if($('#graph'+idx+'.graph').length>0){
						$('#graph'+idx+'.graph').replaceWith(html);
					}
					else if(popup) $('.block_graphpopup_'+idx).html(html);
					else $('.block_graph_'+idx).html(html);
					
					var data_com=new Array();
					var count=0;
					for(r in data.result){
						
						var currentdate = data.result[r].d;
						var currentstamp = strtotime(currentdate);
						var currenttimeLessFour = Math.round((new Date().getTime()) / 1000)-(3600*4);
						
						if(range=='month' || range=='year'){
							currentdate = currentdate.split('-');
							currentdate = currentdate[2]+'/'+currentdate[1];
						}
						else {
							currentdate = currentdate.split(' ');
							currentdate = currentdate[1];
							
							hourmin = currentdate.split(':');
						}
						
						if(range!=='last' || (range=='last' && currentstamp>currenttimeLessFour))
						{
							if(typeof(data.result[r]['uvi'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['uvi']
								}; 
							}
							else if(typeof(data.result[r]['lux'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['lux']
								}; 
							}
							else if(typeof(data.result[r]['gu'])!=='undefined' && typeof(data.result[r]['sp'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['gu'],
									ykey2: data.result[r]['sp']
								}; 
							}
							else if(typeof(data.result[r]['ba'])!=='undefined' && typeof(data.result[r]['hu'])!=='undefined' && typeof(data.result[r]['te'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['ba'],
									ykey2: data.result[r]['hu'],
									ykey3: data.result[r]['te']
								}; 
							}
							else if(typeof(data.result[r]['mm'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['mm']
								}; 
							}
							else if(typeof(data.result[r]['te'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['te']
								}; 
							}
							else if(typeof(data.result[r]['v_max'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['v_max']
								}; 
							}
							else if(typeof(data.result[r]['v2'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: parseFloat(data.result[r]['v2'])+parseFloat(data.result[r]['v'])
								}; 
							}
							else if(typeof(data.result[r]['v'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['v']
								}; 
							}
							else if(typeof(data.result[r]['u'])!=='undefined'){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['u']
								};
							}
							else if(typeof(data.result[r]['u_max'])!=='undefined' ){
								data_com[count] = {
									xkey: currentdate,
									ykey: data.result[r]['u_max'],
									ykey2: data.result[r]['u_min']
								};
							}
							
							count++;
						}
					}
					
					if($('#graphoutput'+idx).length>0 && typeof(data_com[0])!=='undefined'){
						if(typeof(data_com[0]['ykey3'])!=='undefined'){
							
							Morris.Area({
								parseTime:false,
								element: 'graphoutput'+idx,
								data: data_com,
								fillOpacity:0.2,
								gridTextColor:'#fff',
								lineWidth:2,
								xkey: ['xkey'],
								ykeys: ['ykey', 'ykey2', 'ykey3'],
								labels: [label],
								lineColors: [graphColor, graphColor2, graphColor2],
								pointFillColors: ['none'],
								pointSize: 3,
								hideHover: 'auto',
								resize: true,
								hoverCallback: function (index, options, content, row) {
								  row.ykey = parseFloat(row.ykey);
								  row.ykey = row.ykey.toFixed(2);
								  row.ykey = row.ykey.replace('.00','');
								  return row.xkey + ": " + row.ykey+" "+label;
								}
							});
						}
						else if(typeof(data_com[0]['ykey2'])!=='undefined'){
							
							Morris.Area({
								parseTime:false,
								element: 'graphoutput'+idx,
								data: data_com,
								fillOpacity:0.2,
								gridTextColor:'#fff',
								lineWidth:2,
								xkey: ['xkey'],
								ykeys: ['ykey', 'ykey2'],
								labels: [label],
								lineColors: [graphColor, graphColor2],
								pointFillColors: ['none'],
								pointSize: 3,
								hideHover: 'auto',
								resize: true,
								hoverCallback: function (index, options, content, row) {
								  row.ykey = parseFloat(row.ykey);
								  row.ykey = row.ykey.toFixed(2);
								  row.ykey = row.ykey.replace('.00','');
								  return row.xkey + ": " + row.ykey+" "+label;
								}
							});
						}
						else {
							Morris.Area({
								parseTime:false,
								element: 'graphoutput'+idx,
								data: data_com,
								fillOpacity:0.2,
								lineWidth:2,
								gridTextColor:'#fff',
								xkey: ['xkey'],
								ykeys: ['ykey'],
								labels: [label],
								lineColors: [graphColor],
								pointFillColors: ['none'],
								pointSize: 3,
								hideHover: 'auto',
								resize: true,
								hoverCallback: function (index, options, content, row) {
								  row.ykey = parseFloat(row.ykey);
								  row.ykey = row.ykey.toFixed(2);
								  row.ykey = row.ykey.replace('.00','');
								  return row.xkey + ": " + row.ykey+label;
								}
							});
						}
					}
				}
			}
		});
	}
}
