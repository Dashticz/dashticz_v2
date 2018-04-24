<?php
$config=file_get_contents('../custom/CONFIG.js');
list($before,$conf) = explode('var config = {}',$config);
$rows = explode("\n",$conf);
foreach($rows as $r => $row){
	if(substr($row,0,6)=='config' || substr($row,0,8)=='//config'){
		unset($rows[$r]);
	}
}

$newconf="var config = {}\n";
foreach($_POST as $n => $v){
	if(intval($v)==1) $newconf.= "config['".$n."'] = ".$v.";\n";
	else $newconf.= "config['".$n."'] = '".$v."';\n";
}
$config=file_put_contents('../custom/CONFIG.js',$before.$newconf.implode("\n",$rows));
exit();
?>