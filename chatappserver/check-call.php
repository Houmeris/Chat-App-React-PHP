<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $servertime = time();
    $sql = mysqli_query($conn, "SELECT * FROM calls
                                WHERE (call_send_id = {$outgoing_id} AND call_get_id = {$incoming_id})
                                OR (call_send_id = {$incoming_id} AND call_get_id = {$outgoing_id})");
    if(mysqli_num_rows($sql) > 0)
    {
        $row = mysqli_fetch_assoc($sql);
        if($servertime - $row['call_time'] > 2)
        {
            $sql2 = mysqli_query($conn, "DELETE FROM calls
                                         WHERE (call_send_id = {$outgoing_id} AND call_get_id = {$incoming_id})
                                         OR (call_send_id = {$incoming_id} AND call_get_id = {$outgoing_id})");
        }
    }
?>