<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $output = "";
    $sql = mysqli_query($conn, "SELECT * FROM messages WHERE incoming_msg_id = {$incoming_id} ORDER BY msg_id");
    mysqli_query($conn, "DELETE FROM group_msg_notification WHERE group_id = {$incoming_id}
                        AND msg_geter_id = {$outgoing_id}");

    if(mysqli_num_rows($sql) > 0)
    {
        while ($row = mysqli_fetch_assoc($sql))
        {
            $epoch = $row['msg_time'];
            $dt = new DateTime();
            $dt->setTimezone(new DateTimeZone('Europe/Vilnius'));
            $dt->setTimestamp($epoch);
            if($row['outgoing_msg_id'] === $outgoing_id) // If it matches with database (Msg sender)
            {
                if($row['msg_img'] != '')
                {
                    $output .= '<div class="chat outgoing">
                                <div class="details">
                                    <div class="tooltip">
                                        <p> <img src = "./images/' . $row['msg_img'].'">'. $row['msg'].'</p>
                                        <span class="tooltiptext">' . $dt->format('Y-m-d H:i') . '</span>
                                    </div>
                                </div>
                            </div>';
                }
                else
                {
                    $output .= '<div class="chat outgoing">
                                <div class="details">
                                    <div class="tooltip">
                                        <p>'. $row['msg'].'</p>
                                        <span class="tooltiptext">' . $dt->format('Y-m-d H:i') . '</span>
                                    </div>
                                </div>
                            </div>';
                }
            }
            else // Msg reciever
            {
                $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$row['outgoing_msg_id']}");
                $row2 = mysqli_fetch_assoc($sql2);
                if($row['msg_img'] != '')
                {
                    $output .= '<div class="chat incoming">
                                <div class="details">
                                    <div class="tooltip">
                                        <p> <img src = "./images/' . $row['msg_img'].'">'. $row['msg'].'</p>
                                        <span class="tooltiptext">' . $dt->format('Y-m-d H:i') . '</span>
                                    </div>
                                </div>
                            </div>
                            <div class="tooltip">
                                <img src = "./images/'. $row2['img'] .'" width="20" height="20">
                                <span class="tooltiptext">' . $row2['username'] . '</span>
                            </div>';
                }
                else
                {
                    $output .= '<div class="chat incoming">
                                <div class="details">
                                    <div class="tooltip">
                                        <p>'. $row['msg'].'</p>
                                        <span class="tooltiptext">' . $dt->format('Y-m-d H:i') . '</span>
                                    </div>
                                </div>
                            </div>
                            <div class="tooltip">
                                <img src = "./images/'. $row2['img'] .'" width="20" height="20">
                                <span class="tooltiptext">' . $row2['username'] . '</span>
                            </div>';
                }
            }
        }
        echo $output;
    }
?>