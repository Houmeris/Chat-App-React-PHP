<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $group_id = mysqli_real_escape_string($conn, $_POST['group_id']);
    $sql = mysqli_query($conn, "DELETE FROM group_list
                                WHERE group_id = {$group_id}
                                AND user_id = {$user_id}");
    echo $friend_id;
?>