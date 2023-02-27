<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $output = "";

    $sql = "SELECT * FROM messages
            LEFT JOIN users ON users.unique_id = messages.outgoing_msg_id
            WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id})
            OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";
    $query = mysqli_query($conn, $sql);
    $query2 = mysqli_query($conn, $sql);
    // Mark messages as read
    $sql2 = mysqli_query($conn, "UPDATE messages SET seen = {SQL_TINYINT(1)}
                                WHERE (incoming_msg_id = {$outgoing_id} AND outgoing_msg_id = {$incoming_id})");
    if(mysqli_num_rows($query) > 0)
    {
        while ($row = mysqli_fetch_assoc($query2))
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
                if($row['msg_img'] != '')
                {
                    $output .= '<div class="chat incoming">
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
                    $output .= '<div class="chat incoming">
                                <div class="details">
                                    <div class="tooltip">
                                        <p>'. $row['msg'].'</p>
                                        <span class="tooltiptext">' . $dt->format('Y-m-d H:i') . '</span>
                                    </div>
                                </div>
                            </div>';
                }
            }
        }
        echo $output;
    }
?>