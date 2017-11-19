function getGraphs(device,popup){
	var sensor='counter';
	var txtUnit = "?";
	var currentValue = device['Data'];
	var decimals = 2;

	switch (device['Type']) {
		case 'Rain':
			sensor = 'rain';
			txtUnit = 'mm';
			decimals = 1;
			break;
        case 'Lux':
            sensor = 'counter';
            txtUnit = 'Lux';
            decimals = 0;
            break;
		case 'Wind':
			sensor = 'wind';
			if (config['use_beaufort']) {
                currentValue = Beaufort(device['Speed']);
                decimals = 0;
                txtUnit = 'Bft';
            } else {
                currentValue = device['Speed'];
                decimals = 1;
                txtUnit = 'm/s'
            }
			break;
		case 'Temp':
		case 'Temp + Humidity':
		case 'Temp + Humidity + Baro':
			sensor = 'temp';
            txtUnit = '°C';
            currentValue = device['Temp'];
            decimals = 1;
			break;
        case 'Humidity':
            sensor = 'temp';
            txtUnit = '%';
            decimals = 1;
            break;
	}

    switch (device['SubType']) {
        case 'Percentage':
            sensor = 'Percentage';
            txtUnit = '%';
            decimals = 1;
            break;
        case 'Custom Sensor':
            sensor = 'Percentage';
            txtUnit = device['SensorUnit'];
            decimals = 1;
            break;
        case 'Gas':
            txtUnit = "m3";
            break;
        case 'Energy':
        case 'kWh':
        case 'YouLess counter':
            txtUnit = "kWh";
            currentValue = device['CounterToday'];
            break;
        case 'Visibility':
            txtUnit = "km";
            break;
        case 'Radiation':
        case 'Solar Radiation':
            txtUnit = "Watt/m2";
            decimals = 0;
            break;
        case 'Pressure':
            txtUnit = "Bar";
            break;
        case 'Soil Moisture':
            txtUnit = "cb";
            break;
        case 'Leaf Wetness':
            txtUnit = "Range";
            break;
        case 'Voltage':
        case 'A/D':
            txtUnit = "mV";
            break;
        case 'VoltageGeneral':
            txtUnit = "V";
            break;
        case 'DistanceGeneral':
        case 'Distance':
            txtUnit = "cm";
            break;
        case 'Sound Level':
            txtUnit = "dB";
            break;
        case 'CurrentGeneral':
        case 'Current':
            txtUnit = "A";
            break;
        case 'Weight':
            txtUnit = "kg";
            break;
        case 'Waterflow':
            sensor = "Percentage";
            txtUnit = "l/min";
            break;
        case 'Counter Incremental':
            txtUnit = device['CounterToday'].split(' ')[1];
            currentValue = device['CounterToday'].split(' ')[0];
            break;
    }

	currentValue = number_format(currentValue, decimals);
	showGraph(device['idx'], device['Name'], txtUnit, 'initial', currentValue, false, sensor, popup);
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

function showGraph(idx, title, label, range, current, forced, sensor, popup) {
	if(typeof(popup)=='undefined') forced=false;
	if(typeof(forced)=='undefined') forced=false;
	
	if(typeof(_GRAPHS_LOADED[idx])=='undefined' || _GRAPHS_LOADED[idx]<(time()-(parseFloat(_GRAPHREFRESH)*60))){
		forced = true;
	}
	
	if($('.graphcurrent'+idx).length>0){
		$('.graphcurrent'+idx).html(current + ' ' + label);
	}
	
	if(forced || popup){
		_GRAPHS_LOADED[idx] = time();
		//Check settings for standard graph
		if(range=='initial'){
		    switch (settings['standard_graph']) {
                case 'hours':
                    range = 'last';
                    break;
                case 'day':
                    range = 'day';
                    break;
                case 'month':
                    range = 'month';
                    break;
            }
		}
		realrange=range;
		if(range=='last') realrange='day';
		
		$.ajax({
			url: settings['domoticz_ip']+'/json.htm?type=graph&sensor='+sensor+'&idx='+idx+'&range='+realrange+'&time='+new Date().getTime()+'&jsoncallback=?',
			type: 'GET',async: true,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
                if(data.status=="ERR") {
                    alert('Could not load graph!');
                    return;
                }
				var orgtitle = title;
				title = '<h4>'+title;
				if(typeof(current)!=='undefined' && current!=='undefined') title+=': <B class="graphcurrent'+idx+'">' + current + ' ' + label + '</B>';
				title+='</h4>';
				
				var buttons = '<div class="btn-group" role="group" aria-label="Basic example">';
                    buttons +='<button type="button" class="btn btn-default ';
				if(range=='last') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'last\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.last_hours+'</button> ';
				
				buttons+='<button type="button" class="btn btn-default ';
				if(range=='day') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'day\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.today+'</button> ';
				
				buttons+='<button type="button" class="btn btn-default ';
				if(range=='month') buttons+='active';
				buttons+='" onclick="showGraph('+idx+',\''+orgtitle+'\',\''+label+'\',\'month\',\''+current+'\',true,\''+sensor+'\','+popup+');">'+language.graph.last_month+'</button>';
				buttons += '</div>';
		
				if(popup==true) var html = '<div class="graphpopup" id="graph'+idx+'">';
				else var html = '<div class="graph" id="graph'+idx+'">';
					html+='<div class="transbg col-xs-12">';
						html+=''+title+'<br /><div style="margin-left:15px;">'+buttons+'</div><br /><div id="graphoutput'+idx+'"></div>';
							
					html+='</div>';
				html+='</div>';
				
                if($('#graph'+idx+'.graph').length>0){
                    $('#graph'+idx+'.graph').replaceWith(html);
                }
                else if(popup) $('.block_graphpopup_'+idx).html(html);
                else $('.block_graph_'+idx).html(html);

                var data_com=new Array();
                var labels = [label];
                var ykeys = ['ykey'];
                var count=0;
                for (r in data.result) {
                    var currentdate = moment(data.result[r].d, 'YYYY-MM-DD HH:mm').locale(settings['calendarlanguage']);
                    var isLater = currentdate.isAfter(moment().subtract(4, 'hours'));

                    if(range === 'month' || range === 'year'){
                        currentdate = currentdate.format(settings['shortdate']);
                    } else {
                        currentdate = currentdate.format(settings['shorttime']);
                    }

                    if (range!=='last' || (range=='last' && isLater))
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
                            labels = ['Lux'];
                        }
                        else if(typeof(data.result[r]['lux_avg']) !== 'undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['lux_avg'],
                                ykey2: data.result[r]['lux_min'],
                                ykey3: data.result[r]['lux_max'],
                            };
                            labels = ['Lux average', 'Minimum', 'Maximum'];
                            ykeys = ['ykey', 'ykey2', 'ykey3'];
                        }
                        else if(typeof(data.result[r]['gu'])!=='undefined' && typeof(data.result[r]['sp'])!=='undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['gu'],
                                ykey2: data.result[r]['sp']
                            };
                            labels = ['m/s', 'm/s'];
                            ykeys = ['ykey', 'ykey2'];
                        }
                        else if(typeof(data.result[r]['ba'])!=='undefined' && typeof(data.result[r]['hu'])!=='undefined' && typeof(data.result[r]['te'])!=='undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['ba'],
                                ykey2: data.result[r]['hu'],
                                ykey3: data.result[r]['te']
                            };
                            labels = ['hPa', '%', _TEMP_SYMBOL];
                            ykeys = ['ykey', 'ykey2', 'ykey3'];
                        }
                        else if(typeof(data.result[r]['hu']) !== 'undefined' && typeof(data.result[r]['te']) !== 'undefined') {
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['hu'],
                                ykey2: data.result[r]['te'],
                            };
                            labels = ['%', _TEMP_SYMBOL];
                            ykeys = ['ykey', 'ykey2'];
                        }
                        else if(typeof(data.result[r]['hu'])!=='undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['hu']
                            };
                            labels = ['%'];
                        }
                        else if(typeof(data.result[r]['mm'])!=='undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['mm']
                            };
                            labels = ['mm'];
                        }
                        else if(typeof(data.result[r]['te'])!=='undefined'){
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['te']
                            };
                            labels = [_TEMP_SYMBOL];
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
                            if (label === 'kWh' && realrange === 'day') {
                                labels = ['Watt'];
                            }
                        }
                        else if(typeof(data.result[r]['v'])!=='undefined'){
                            if (data.method === 1) {
                                continue;
                            }
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['v']
                            };
                            if (label === 'kWh' && realrange === 'day') {
                                labels = ['Watt'];
                            }
                        }
                        else if(typeof(data.result[r]['eu'])!=='undefined'){
                            if (data.method !== 1) {
                                continue;
                            }
                            data_com[count] = {
                                xkey: currentdate,
                                ykey: data.result[r]['eu']
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
                            labels = ['?', '?']; // TODO Unit
                            ykeys = ['ykey', 'ykey2'];
                        } else {
                            continue;
                        }

                        count++;
                    }
                }

                if($('#graphoutput'+idx).length>0 && typeof(data_com[0])!=='undefined') {
                    Morris.Line({
                        parseTime:false,
                        element: 'graphoutput'+idx,
                        data: data_com,
                        fillOpacity:0.2,
                        gridTextColor:'#fff',
                        lineWidth:2,
                        xkey: ['xkey'],
                        ykeys: ykeys,
                        labels: labels,
                        lineColors: settings['lineColors'],
                        pointFillColors: ['none'],
                        pointSize: 3,
                        hideHover: 'auto',
                        resize: true,
                        hoverCallback: function (index, options, content, row) {
                          var text = row.xkey + ": " + number_format(parseFloat(row.ykey), 2) + " " + labels[0];
                          if (row.hasOwnProperty('ykey2')) {
                              text += " / " + number_format(row.ykey2, 2) + " " + labels[1];
                          }
                          if (row.hasOwnProperty('ykey3')) {
                              text += " / " + number_format(row.ykey3, 2) + " " + labels[2];
                          }
                          return text;
                        }
                    });
                }
			}
		});
	}
}
