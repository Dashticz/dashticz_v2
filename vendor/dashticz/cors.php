<?php
header("Access-Control-Allow-Origin: *");
echo file_get_contents($_SERVER["QUERY_STRING"]);
exit();
?>
