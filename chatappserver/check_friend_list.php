<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $sql = mysqli_query($conn, "SELECT * FROM friend_list
                                WHERE (friend_send_id = {$outgoing_id} AND friend_get_id = {$incoming_id})
                                OR (friend_send_id = {$incoming_id} AND friend_get_id = {$outgoing_id})");
    if(mysqli_num_rows($sql) == 0)
    {
        echo 0;
    }
    else
    {
        echo 1;
    }
?>