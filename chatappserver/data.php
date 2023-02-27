<?php
    while($row = mysqli_fetch_assoc($sql))
    {
        if ($row['friend_send_id'] == $outgoing_id)
        {
            if (isset($searchTerm))
            {
                $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['friend_get_id']}
                                            AND (username LIKE '%{$searchTerm}%')");
            }
            else
            {
                $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['friend_get_id']}");
            }
        }
        elseif ($row['friend_get_id'] == $outgoing_id)
        {
            if (isset($searchTerm))
            {
                $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['friend_send_id']}
                                            AND (username LIKE '%{$searchTerm}%')");
            }
            else
            {
                $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['friend_send_id']}");
            }
        }
        if(mysqli_num_rows($sql2) > 0)
        {
            $row2 = mysqli_fetch_assoc($sql2);
            $sql5 = mysqli_query($conn, "SELECT * FROM messages
                                        WHERE (incoming_msg_id = {$outgoing_id} AND outgoing_msg_id = {$row2['unique_id']})
                                        OR (incoming_msg_id = {$row2['unique_id']} AND outgoing_msg_id = {$outgoing_id})");
            $time = 0;
            while ($row3 = mysqli_fetch_assoc($sql5))
            {
                $time = $row3['msg_time'];
            }
            $result = mysqli_query($conn, "SELECT COUNT(*) as total FROM messages
                                            WHERE (incoming_msg_id = {$outgoing_id}
                                            AND outgoing_msg_id = {$row2['unique_id']}
                                            AND seen = {SQL_TINYINT(0)})");
            $messages = mysqli_fetch_assoc($result);
            if($messages['total'] == 0)
            {
                $output .= '<a href="chat?user_id=' . $row2['unique_id'] . '">
                <div class="content">
                    <img src = "./images/' . $row2['img'].'">
                    <div class="details">
                        <span>'. $row2['username'] .'</span>
                        <p>'.$row2['status'].'</p>
                    </div>
                </div>
                <p class = "hidden-time">' . $time . '</p>
                </a>';
            }
            else
            {
            $output .= '<a href="chat?user_id=' . $row2['unique_id'] . '">
                <div class="content">
                    <img src = "./images/' . $row2['img'].'">
                    <div class="details">
                        <span>'. $row2['username'] .'</span>
                        <p>'.$row2['status'].'</p>
                    </div>
                </div>
                <p class = "hidden-time">' . $time . '</p>
                <p class="unread">' . $messages['total'] . '</p>
                </a>';
            }
        }
    }
    while($row = mysqli_fetch_assoc($sql3))
    {
        $sql = mysqli_query($conn, "SELECT * FROM messages WHERE incoming_msg_id = {$row['group_id']}");
        $time = 0;
        while ($row2 = mysqli_fetch_assoc($sql))
        {
            $time = $row2['msg_time'];
        }
        $result = mysqli_query($conn, "SELECT COUNT(*) as total FROM group_msg_notification
                            WHERE (group_id = {$row['group_id']}
                            AND msg_geter_id = {$outgoing_id})");
        $messages = mysqli_fetch_assoc($result);
        if($messages['total'] == 0)
        {
            $output .= '<a href="groupchat?group_id=' . $row['group_id'] . '">
            <div class="content">
                <img src = "./images/' . $row['img'].'">
                <div class="details">
                    <span>'. $row['group_name'] .'</span>
                    <p>Group</p>
                </div>
            </div>
            <p class = "hidden-time">' . $time . '</p>
            </a>';
        }
        else
        {
            $output .= '<a href="groupchat?group_id=' . $row['group_id'] . '">
            <div class="content">
                <img src = "./images/' . $row['img'].'">
                <div class="details">
                    <span>'. $row['group_name'] .'</span>
                    <p>Group</p>
                </div>
            </div>
            <p class = "hidden-time">' . $time . '</p>
            <p class="unread">' . $messages['total'] . '</p>
            </a>';
        }
    }
    while($row = mysqli_fetch_assoc($sql4))
    {

        $sql2 = mysqli_query($conn, "SELECT * FROM messages WHERE incoming_msg_id = {$row['group_id']}");
        $time = 0;
        while ($row2 = mysqli_fetch_assoc($sql2))
        {
            $time = $row2['msg_time'];
        }
        if (isset($searchTerm))
        {
            $sql = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$row['group_id']}
                                        AND (group_name LIKE '%{$searchTerm}%')");
        }
        else
        {
            $sql = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$row['group_id']}");
        }
        if(mysqli_num_rows($sql) > 0)
        {
            $row2 = mysqli_fetch_assoc($sql);
            $result = mysqli_query($conn, "SELECT COUNT(*) as total FROM group_msg_notification
                                WHERE (group_id = {$row['group_id']}
                                AND msg_geter_id = {$outgoing_id})");
            $messages = mysqli_fetch_assoc($result);
            if($messages['total'] == 0)
            {
                $output .= '<a href="groupchat?group_id=' . $row2['group_id'] . '">
                    <div class="content">
                        <img src = "./images/' . $row2['img'].'">
                        <div class="details">
                            <span>'. $row2['group_name'] .'</span>
                            <p>Group</p>
                        </div>
                    </div>
                    <p class = "hidden-time">' . $time . '</p>
                    </a>';
            }
            else
            {
                $output .= '<a href="groupchat?group_id=' . $row2['group_id'] . '">
                    <div class="content">
                        <img src = "./images/' . $row2['img'].'">
                        <div class="details">
                            <span>'. $row2['group_name'] .'</span>
                            <p>Group</p>
                        </div>
                    </div>
                    <p class = "hidden-time">' . $time . '</p>
                    <p class="unread">' . $messages['total'] . '</p>
                    </a>';
            }
        }
    }
?>