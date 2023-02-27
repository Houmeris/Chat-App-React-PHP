<?php
    while($row = mysqli_fetch_assoc($sql))
    {
        $buttontext = "Add";
        $sql2 = mysqli_query($conn, "SELECT * FROM group_list WHERE user_id = {$row['unique_id']} AND group_id = {$group_id}");
        if(mysqli_num_rows($sql2) > 0)
        {
            $buttontext = "Invite sent";
        }
        $output .= '
        <div class="content">
        <img src = "./images/' . $row['img'].'">
            <div class="details">
                <span>'. $row['username'] .'</span>
                <p>'.$row['status'].'</p>
            </div>
            <div class="addfriendbutton"><button name = "' . $row['unique_id'] .'">' . $buttontext . '</button></div>
        </div>';
    }
?>