<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $sql = mysqli_query($conn, "SELECT * FROM groups
                                WHERE group_id = {$incoming_id} AND group_admin_id = {$outgoing_id}");
    $sql2 = mysqli_query($conn, "SELECT * FROM group_list
                                WHERE group_id = {$incoming_id} AND user_id = {$outgoing_id}");
    if(mysqli_num_rows($sql) == 0 && mysqli_num_rows($sql2) == 0)
    {
        echo 0;
    }
    else
    {
        echo 1;
    }
?>