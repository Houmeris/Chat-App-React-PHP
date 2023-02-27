<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $group_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $sql = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$group_id}");
    $row = mysqli_fetch_assoc($sql);
    echo $row['call_room_id'];
?>