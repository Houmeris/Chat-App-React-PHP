<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
    $output = "";
    //$sql = mysqli_query($conn, "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id} AND (username LIKE '%{$searchTerm}%')");
    $sql = mysqli_query($conn, "SELECT * FROM friend_list WHERE
                                (friend_get_id = {$outgoing_id} AND agreed = {SQL_TINYINT(1)})
                                OR (friend_send_id = {$outgoing_id} AND agreed = {SQL_TINYINT(1)})");
    $sql3 = mysqli_query($conn, "SELECT * FROM groups WHERE group_admin_id = {$outgoing_id}
                                AND (group_name LIKE '%{$searchTerm}%')");
    $sql4 = mysqli_query($conn, "SELECT * FROM group_list WHERE user_id = {$outgoing_id}
                                AND agreed = {SQL_TINYINT(1)}");
    if(mysqli_num_rows($sql) > 0)
    {
        include "data.php";
    }
    else
    {
        $output .= "No users found related to your search term";
    }
    echo $output;
?>