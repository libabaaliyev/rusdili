<?php
 

$username="root";
$password="";
$local="127.0.0.1";
$database="lang_edu";

try {
     $db = new PDO("mysql:host=$local;dbname=$database", "$username", "$password");
} catch ( PDOException $e ){
     print $e->getMessage();
     echo "parol xetasi";
}
$db->query("SET CHARACTER SET utf8");


?> 