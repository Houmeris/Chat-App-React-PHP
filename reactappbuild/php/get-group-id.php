<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $roomid = $_POST['room_id'];
    $sql = mysqli_query($conn, "SELECT * FROM groups WHERE call_room_id = '{$roomid}'");
    $row = mysqli_fetch_assoc($sql);
    echo $row['group_id'];
?>