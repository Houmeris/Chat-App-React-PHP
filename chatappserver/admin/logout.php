<?php
	include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $logout_id = mysqli_real_escape_string($conn, $_POST['logout_id']);
    if(isset($logout_id)) // If logout_id exists
    {
        $status = "Offline now";
    }
    $sql = mysqli_query($conn, "UPDATE admins SET status = '{$status}' WHERE admin_id = {$logout_id}");
?>