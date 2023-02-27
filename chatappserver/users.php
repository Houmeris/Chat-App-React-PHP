<?php 
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = $_POST['user_id'];
    $sql = mysqli_query($conn, "SELECT * FROM friend_list WHERE
                                (friend_get_id = {$outgoing_id} AND agreed = {SQL_TINYINT(1)})
                                OR (friend_send_id = {$outgoing_id} AND agreed = {SQL_TINYINT(1)})");
    $sql3 = mysqli_query($conn, "SELECT * FROM groups WHERE group_admin_id = {$outgoing_id}");
    $sql4 = mysqli_query($conn, "SELECT * FROM group_list WHERE user_id = {$outgoing_id}
                                AND agreed = {SQL_TINYINT(1)}");
    $output = "";
    if(mysqli_num_rows($sql) == 0 && mysqli_num_rows($sql3) == 0 && mysqli_num_rows($sql4) == 0)
    {
        $output .= "Add people to friend list to chat with them";
    }
    elseif(mysqli_num_rows($sql) > 0 || mysqli_num_rows($sql3) > 0 || mysqli_num_rows($sql4) > 0)
    {
        include "data.php";
    }
    echo $output;
?>