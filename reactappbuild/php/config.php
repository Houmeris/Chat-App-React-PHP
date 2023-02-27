<?php
    $conn = mysqli_connect("localhost", "root", "", "chatapp");
    if(!$conn)
    {
        echo "Database not connected" . mysqli_connect_error();
    }
    header('Access-Control-Allow-Origin: 78.60.254.222');
?>