<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $friend_id = mysqli_real_escape_string($conn, $_POST['friend_id']);
    $group_id = mysqli_real_escape_string($conn, $_POST['group_id']);
    $sql = mysqli_query($conn, "INSERT INTO group_list (group_id, user_id, agreed)
                                VALUES ({$group_id}, {$friend_id}, {SQL_TINYINT(0)})");
    echo $friend_id;
?>