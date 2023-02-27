<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");
    $output = '';
    if(mysqli_num_rows($sql) == 0)
    {
        $output = "No user";
    }
    elseif(mysqli_num_rows($sql) > 0)
    {
        while($row = mysqli_fetch_assoc($sql))
        {
            $output = '<img src = "./images/' . $row['img'] . '"></img>
                        <span>'.$row['username'].'</span>
                        <p>'. $row['status'] .'</p>';
        }
    }
    echo $output;
?>