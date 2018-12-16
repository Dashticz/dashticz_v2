<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$allDates=array();
switch($_GET['get']){
  case 'phpversion':
    $return=phpversion();
    break;
}
die(json_encode($return));
echo '<pre>';
print_r($return);
exit();
?>
