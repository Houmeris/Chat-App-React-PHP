<?php 
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = $_POST['admin_id'];
    $sql = mysqli_query($conn, "SELECT * FROM admins WHERE NOT admin_id = {$outgoing_id}");
    $output = "";
    if(mysqli_num_rows($sql) == 0)
    {
        $output .= "No users are available to chat";
    }
    elseif(mysqli_num_rows($sql) > 0)
    {
        include "data_admins.php";
    }
    echo $output;
?>