<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once('SG_iCal.php');
$ICS = $_GET['url'];
$MAXITEMS = $_GET['maxitems'];
$ICS = str_replace('#','%23',urldecode($ICS));
$ical = new SG_iCalReader($ICS);
$evts = $ical->getEvents();

$data = array();
if($evts){
	foreach($evts as $id => $ev) {
		$jsEvt = array(
			"id" => ($id+1),
			"title" => $ev->getProperty('summary'),
			"start" => $ev->getStart(),
			"end"   => $ev->getEnd()-1,
			"allDay" => $ev->isWholeDay(),
		);
		if($jsEvt["end"]<0) $jsEvt["end"] = $jsEvt["start"];
		$jsEvt["startt"] = date('Y-m-d H:i:s',$ev->getStart());
		$jsEvt["endt"] = date('Y-m-d H:i:s',$ev->getEnd()-1);
		if(substr($jsEvt["endt"],0,10)=='1970-01-01'){
			$jsEvt["endt"] = $jsEvt["startt"];
			$jsEvt["allDay"]=1;
		}
		$count = 0;
		$start = $ev->getStart();

		if (isset($ev->recurrence)) {
			$freq = $ev->getFrequency();
			if ($freq->firstOccurrence() == $start)
				$data[] = $jsEvt;
			$currentdate = time();
			while (($next = $freq->nextOccurrence($start)) > 0 ) {
				if (!$next or $count >= $MAXITEMS) break;
				$start = $next;
				$jsEvt["start"] = $start;
				$jsEvt["end"] = $start + $ev->getDuration()-1;
				$jsEvt["startt"] = date('Y-m-d H:i:s',$jsEvt["start"]);
				$jsEvt["endt"] = date('Y-m-d H:i:s',$jsEvt["end"]);
				if($jsEvt["end"]>$currentdate) {
					$data[$start] = $jsEvt;
					$count++;
				}
			}
		} else {
			if(date('Y',$start)>2016) $data[$start] = $jsEvt;
		}

	}
}
ksort($data);
die(json_encode($data));
echo '<pre>';
print_r($data);
exit();
?>
