<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $last_connected = time();
    $status = "Active now";
    $sql = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$_POST['user_id']}");
    $sql2 = mysqli_query($conn, "UPDATE users SET last_connected = '{$last_connected}' WHERE unique_id = {$_POST['user_id']}");
    $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE NOT unique_id = {$_POST['user_id']}");
    $servtime = time();
    while($row = mysqli_fetch_assoc($sql3))
    {
        if($servtime - $row['last_connected'] < 10)
        {
            $status = "Active now";
            mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
        }
        else
        {
            $status = "Offline now";
            mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
        }
    }
?>