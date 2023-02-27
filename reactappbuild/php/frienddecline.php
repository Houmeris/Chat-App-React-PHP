<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $friend_id = mysqli_real_escape_string($conn, $_POST['friend_id']);
    $sql = mysqli_query($conn, "DELETE FROM friend_list
                                WHERE friend_send_id = {$friend_id}
                                AND friend_get_id = {$user_id}");
    echo $friend_id;
?>