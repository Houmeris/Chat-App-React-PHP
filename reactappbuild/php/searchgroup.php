<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $group_id = mysqli_real_escape_string($conn, $_POST['group_id']);
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
    $output = "";

    $sql = mysqli_query($conn, "SELECT * FROM users WHERE NOT unique_id = {$user_id} AND (username LIKE '%{$searchTerm}%')");
    if(mysqli_num_rows($sql) > 0)
    {
        include "datagroup.php";
    }
    else
    {
        $output .= "No users found related to your search term";
    }
    echo $output;
?>