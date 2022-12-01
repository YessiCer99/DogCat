<?php
date_default_timezone_set('America/Mexico_City');
$dsn = 'mysql:dbname=dogcat;host=localhost;charset=utf8';
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dogcat";
$conn = new mysqli($servername, $username, $password, $dbname);
$pcn = new PDO($dsn, $username, $password);
if ($conn->connect_error) {
    die(json_encode(array("response"=>"CONNECTION_ERROR","detail"=>$conn->connect_error)));
}
?>