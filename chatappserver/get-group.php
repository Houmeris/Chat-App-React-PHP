<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $group_id = mysqli_real_escape_string($conn, $_POST['group_id']);
    $sql = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$group_id}");
    $output = '';

    if(mysqli_num_rows($sql) == 0)
    {
        $output = "No group";
    }
    elseif(mysqli_num_rows($sql) > 0)
    {
        while($row = mysqli_fetch_assoc($sql))
        {
            $output = '<img src = "./images/' . $row['img'] . '"></img>
                        <span>'.$row['group_name'].'</span>
                        <p>Group</p>';
        }
    }
    echo $output;
?>