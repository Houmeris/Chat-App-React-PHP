<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");
    if(mysqli_num_rows($sql) > 0)
    {
        $row = mysqli_fetch_assoc($sql);
        echo $row['username'];
    }
?>