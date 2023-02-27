<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $sql = mysqli_query($conn, "SELECT * FROM group_list WHERE user_id = {$user_id} AND NOT agreed = {SQL_TINYINT(1)}");
    $output = "";
    if(mysqli_num_rows($sql) > 0)
    {
        while ($row = mysqli_fetch_assoc($sql))
        {
            $sql2 = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$row['group_id']}");
            $row2 = mysqli_fetch_assoc($sql2);
            $output .= '
            <div class="content">
            <img src = "./images/' . $row2['img'].'">
                <div class="details">
                    <span>'. $row2['group_name'] .'</span>     
                    <p>Group</p>
                </div>
                <div class="answerbutton"><button name = "'. $row2['group_id'] .'">Agree</button> <button name = "' . $row2['group_id'] .'">No</button></div>
            </div>';
        }
    }
    echo $output;
?>