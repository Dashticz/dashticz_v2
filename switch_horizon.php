<?php

 
$localip = "192.168.1.201"; // IP of mediabox
$localport = 5900; // Controlport of mediabox


/*
Script (C) KixAss 2016 - horizon@kixass.net
 
Possible keys:
KEY_POWER		= E0 00
KEY_OK 			= E0 01
KEY_BACK 		= E0 02
KEY_CHAN_UP		= E0 06
KEY_CHAN_DWN	= E0 07
KEY_HELP		= E0 09
KEY_MENU		= E0 0a
KEY_GUIDE		= E0 0b
KEY_INFO		= E0 0e
KEY_TEXT		= E0 0f
KEY_MENU1		= E0 11
KEY_MENU2		= E0 15
KEY_DPAD_UP		= E1 00
KEY_DPAD_DOWN	= E1 01
KEY_DPAD_LEFT	= E1 02
KEY_DPAD_RIGHT	= E1 03
KEY_NUM_0		= E3 00
KEY_NUM_1		= E3 01
KEY_NUM_2		= E3 02
KEY_NUM_3		= E3 03
KEY_NUM_4		= E3 04
KEY_NUM_5		= E3 05
KEY_NUM_6		= E3 06
KEY_NUM_7		= E3 07
KEY_NUM_8		= E3 08
KEY_NUM_9		= E3 09
KEY_PAUSE		= E4 00
KEY_STOP		= E4 02
KEY_RECORD		= E4 03
KEY_FWD			= E4 05
KEY_RWD			= E4 07
KEY_MENU3		= Ef 00
KEY_UNKNOWN_0 	= Ef 06;	// TIMESHIFT INF
KEY_UNKNOWN_1	= Ef 15;	// POWE
KEY_UNKNOWN_2	= Ef 16;	// N
KEY_UNKNOWN_3	= Ef 17;	// RC PAIRIN
KEY_UNKNOWN_4	= Ef 19;	// TIMIN
KEY_ONDEMAND	= Ef 28
KEY_DVR 		= Ef 29
KEY_TV = Ef 2a;
*/
 
function makeBuffer($data)
{
    $data = str_replace(" ", "", $data);
    return hex2bin($data);
}
 
$key = str_replace('x',' ',$_GET['key']); // Power toggle

if ($sock = fsockopen($localip, $localport))
{
    $data = fgets($sock); // readVersionMsg
    echo "recv version: " . $data . "<br>";
 
    echo "-----------------------------<br>";
 
    fwrite($sock, $data); // Send the same version back
 
    $data = fgets($sock, 2); // Get OKE
    echo "recv: " . $data . "<br>";
 
    echo "-----------------------------<br>";
 
    fwrite($sock, makeBuffer("01")); // Send Authorization type (none)
 
    $data = fgets($sock, 4); // Get OKE
    echo "recv: " . $data . "<br>";
 
    echo "-----------------------------<br>";
 
    $data = fgets($sock, 24); // Get init data
    echo "recv: " . $data . "<br>";
 
    fwrite($sock, makeBuffer("04 01 00 00 00 00 " . $key)); // Turn key on
    usleep(400);
    fwrite($sock, makeBuffer("04 00 00 00 00 00 " . $key)); // Turn key off
 
    fclose($sock);
}
?>