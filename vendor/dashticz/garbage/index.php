<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$allDates=array();
switch($_GET['service']){
	case 'rova':
		$ch = curl_init('https://www.rova.nl/api/TrashCalendar/GetCalendarItems?portal=inwoners');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch,CURLOPT_COOKIE, "RovaLc_inwoners={\"Id\":0,\"ZipCode\":\"".$_GET['zipcode']."\",\"HouseNumber\":\"".$_GET['nr']."\",\"HouseAddition\":null,\"Municipality\":null,\"Province\":null,\"Firstname\":null,\"Lastname\":null,\"UserAgent\":\"\",\"School\":null,\"Street\":null,\"Country\":null,\"Portal\":null,\"AreaLevel\":null,\"City\":null,\"Ip\":null}");
		$output = curl_exec($ch);
		curl_close($ch);
		$return = json_decode($output,true);
		foreach($return as $row){
			$title = $row['GarbageType'];
			if(!empty($row['Date'])){
				list($date,$time)=explode('T',$row['Date']);
				$allDates[$date][$title] = $date;
			}
		}
		break;
	
	case 'deafvalapp': 
		$url = 'http://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=NL&postcode='.$_GET['zipcode'].'&straatId=0&huisnr='.$_GET['nr'].'&huisnrtoev='.$_GET['t'];
		$return = file_get_contents($url);
		$return = explode("\n",$return);
		foreach($return as $row){
			$row = explode(';',$row);
			$title = $row[0];
			foreach($row as $r => $date){
				if($r>0 && !empty($date)){
					list($d,$m,$y) = explode('-',$date);
					$allDates[$y.'-'.$m.'-'.$d][$title] = $y.'-'.$m.'-'.$d;
				}
			}
		}
		break;	
	case 'mijnafvalwijzer': 
		$url = 'http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode='.$_GET['zipcode'].'&street=&huisnummer='.$_GET['nr'].'&toevoeging='.$_GET['t'];
		$return = file_get_contents($url);
		$return = json_decode($return,true);
		$return = $return['data']['ophaaldagen']['data'];
		foreach($return as $row){
			$title = $row['type'];
			if(!empty($row['date'])){
				$allDates[$row['date']][$title] = $row['date'];
			}
		}
		
		break;	
	case 'hvc': 
		$url = 'http://inzamelkalender.hvcgroep.nl/push/calendar?postcode='.$_GET['zipcode'].'&huisnummer='.$_GET['nr'];
		$return = file_get_contents($url);
		$return = json_decode($return,true);
		foreach($return as $row){
			$title = $row['naam'];
			foreach($row['dateTime'] as $date){
				if(!empty($date['date'])){
					list($date,$time)=explode(' ',$date['date']);
					$allDates[$date][$title] = $date;
				}
			}
		}
		break;
	case 'recyclemanager': 
		$url = 'https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode='.$_GET['zipcode'].'&number='.$_GET['nr'];
		$return = file_get_contents($url);
		$return = json_decode($return,true);
		$return = $return['data'][0]['occurrences'];
		foreach($return as $row){
			$title = $row['title'];
			list($date,$time)=explode('T',$row['from']['date']);
			if(!empty($date)){
				$allDates[$date][$title] = $date;
			}
		}
		break;	
	case 'edg': 
		$url = 'https://www.edg.de/JsonHandler.ashx?dates=1&street='.$_GET['street'].'&nr='.$_GET['nr'].'&cmd=findtrash&tbio=0&tpapier=1&trest=1&twert=1&feiertag=0';
		$return = file_get_contents($url);
		break;
	case 'afvalstromen':
		$baseUrl = '';
		if(!empty($_GET['sub'])){
			switch($_GET['sub']){
				case 'sudwestfryslan'; $baseUrl = 'http://afvalkalender.sudwestfryslan.nl'; break;
				case 'alphenaandenrijn'; $baseUrl = 'http://afvalkalender.alphenaandenrijn.nl'; break;
				case 'cure'; $baseUrl = 'https://afvalkalender.cure-afvalbeheer.nl'; break;
				case 'cyclusnv'; $baseUrl = 'https://afvalkalender.cyclusnv.nl'; break;
				case 'gemeenteberkelland'; $baseUrl = 'https://afvalkalender.gemeenteberkelland.nl'; break;
				case 'meerlanden'; $baseUrl = 'https://afvalkalender.meerlanden.nl'; break;
				case 'venray'; $baseUrl = 'https://afvalkalender.venray.nl'; break;
				case 'circulusberkel'; $baseUrl = 'https://afvalkalender.circulus-berkel.nl'; break;
				case 'rmn'; $baseUrl = 'https://inzamelschema.rmn.nl'; break;
				case 'dar'; $baseUrl = 'https://afvalkalender.dar.nl'; break;
				case 'waalre'; $baseUrl = 'https://afvalkalender.waalre.nl'; break;
				case 'avalex'; $baseUrl = 'https://www.avalex.nl'; break;
				case 'hvc'; $baseUrl = 'https://apps.hvcgroep.nl'; break;
			}
		}
		
		$url = $baseUrl.'/rest/adressen/'.$_GET['zipcode'].'-'.$_GET['nr'];
		$return = file_get_contents($url);
		$return = json_decode($return,true);
		$url = $baseUrl.'/rest/adressen/'.$return[0]['bagId'].'/afvalstromen';
		$return = file_get_contents($url);
		$return = json_decode($return,true);
		
		foreach($return as $row){
			$title = $row['title'];
			$date=$row['ophaaldatum'];
			if(!empty($date)){
				$allDates[$date][$title] = $date;
			}
		}
		
		$return = json_decode($return,true);
		break;
}

$temp = $allDates;
$allDates=array();
foreach($temp as $date => $items){
	foreach($items as $title => $date){
		$allDates[] = array('date'=>$date,'title'=>$title);
	}	
}
die(json_encode($allDates));
echo '<pre>';
print_r($allDates);
print_r($return);
exit();
?>
