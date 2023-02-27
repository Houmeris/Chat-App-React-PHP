<?php 
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $sql = mysqli_query($conn, "SELECT * FROM users");
    $output = "";
    if(mysqli_num_rows($sql) == 0)
    {
        $output .= "No users are available to chat";
    }
    elseif(mysqli_num_rows($sql) > 0)
    {
        include "data.php";
    }
    echo $output;
?>