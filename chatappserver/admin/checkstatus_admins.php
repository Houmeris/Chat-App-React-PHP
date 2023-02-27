<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
	$admin_id = $_POST['admin_id'];
    $sql2 = mysqli_query($conn, "SELECT * FROM admins WHERE NOT admin_id = {$admin_id}");
    $servtime = time();
    while($row = mysqli_fetch_assoc($sql2))
    {
        if($servtime - $row['last_connected'] < 10)
        {
            $status = "Active now";
            mysqli_query($conn, "UPDATE admins SET status = '{$status}' WHERE admin_id = {$row['admin_id']}");
        }
        else
        {
            $status = "Offline now";
            mysqli_query($conn, "UPDATE admins SET status = '{$status}' WHERE admin_id = {$row['admin_id']}");
        }
    }
?>