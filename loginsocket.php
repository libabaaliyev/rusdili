<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
include ("baglan.php");
session_start();

 
if(isset($_SESSION['username']))
{
	$username  	= $_SESSION['username'];

	$dataUsers 	= $db->query("SELECT * FROM users WHERE username = '$username'")->fetch(PDO::FETCH_ASSOC);
	
	if($dataUsers)
		$allData 	= array('datas'=>$dataUsers);
	else
		$allData 	= array('datas'=>'none');
}
else
{
	
	$allData 	= array('datas'=>'none');
}

echo 'data: ' . json_encode($allData);
echo "\n\n";

ob_end_flush();
flush();


?>