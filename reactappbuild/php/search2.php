<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
    $output = "";
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id} AND (username LIKE '%{$searchTerm}%')");
    if(mysqli_num_rows($sql) > 0)
    {
        include "data2.php";
    }
    else
    {
        $output .= "No users found related to your search term";
    }
    echo $output;
?>