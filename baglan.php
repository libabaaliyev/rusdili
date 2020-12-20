<?php
 

$username="root";
$password="";
$local="localhost:3308";
$database="rusdili";

try {
     $db = new PDO("mysql:host=$local;dbname=$database", "$username", "$password");
} catch ( PDOException $e ){
     print $e->getMessage();
     echo "parol xetasi";
}
$db->query("SET CHARACTER SET utf8");


?> 