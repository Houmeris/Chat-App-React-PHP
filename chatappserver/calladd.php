<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $call_id = rand(time(), 10000000); // Create a unique id
    $status = "calling";
    $servertime = time();
    $sql = mysqli_query($conn, "INSERT INTO calls (call_id, call_send_id, call_get_id, status, call_time)
                                VALUES ('{$call_id}', {$outgoing_id}, {$incoming_id}, '{$status}', {$servertime})");
?>