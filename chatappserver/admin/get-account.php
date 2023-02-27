<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['admin_id']);
    $sql = mysqli_query($conn, "SELECT * FROM admins WHERE admin_id = {$user_id}");
    $output = "";
    if(mysqli_num_rows($sql) == 0)
    {
        $output .= "No user";
    }
    elseif(mysqli_num_rows($sql) > 0)
    {
        while($row = mysqli_fetch_assoc($sql))
        {
            $output .= '<span>'.$row['username'].'</span>
                        <p>Active now</p>';
        }
    }
    echo $output;
?>