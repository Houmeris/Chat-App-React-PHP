<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
	$servtime = time();
    $status = "Active now";
    $sql = mysqli_query($conn, "UPDATE admins SET last_connected = {$servtime} WHERE admin_id = {$_POST['admin_id']}");
    $sql2 = mysqli_query($conn, "UPDATE admins SET status = '{$status}' WHERE admin_id = {$_POST['admin_id']}");
?>