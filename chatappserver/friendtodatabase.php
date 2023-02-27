<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $friend_id = mysqli_real_escape_string($conn, $_POST['friend_id']);
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $sql = mysqli_query($conn, "INSERT INTO friend_list (friend_send_id, friend_get_id, agreed)
                                VALUES ({$user_id}, {$friend_id}, {SQL_TINYINT(0)})");
    echo $friend_id;
?>