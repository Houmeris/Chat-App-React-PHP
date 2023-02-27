<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $sql = mysqli_query($conn, "SELECT * FROM friend_list WHERE friend_get_id = {$outgoing_id} AND NOT agreed = {SQL_TINYINT(1)}");
    $sql3 = mysqli_query($conn, "SELECT * FROM group_list WHERE user_id = {$outgoing_id} AND NOT agreed = {SQL_TINYINT(1)}");
    $output = "";
    if(mysqli_num_rows($sql) > 0)
    {
        while ($row = mysqli_fetch_assoc($sql))
        {
            $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['friend_send_id']}");
            $row2 = mysqli_fetch_assoc($sql2);
            $output .= '
            <div class="content">
            <img src = "./images/' . $row2['img'].'">
                <div class="details">
                    <span>'. $row2['username'] .'</span> 
                    <p>'.$row2['status'].'</p> 
                </div>
                <div class="answerbutton"><button name = "'. $row2['unique_id'] .'">Agree</button> <button name = "' . $row2['unique_id'] .'">Decline</button></div>
            </div>';
        }
    }
    echo $output;
?>