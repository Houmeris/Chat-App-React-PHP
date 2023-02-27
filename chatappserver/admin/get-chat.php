<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $output = "";

    $sql = "SELECT * FROM messages
            LEFT JOIN users ON users.unique_id = messages.outgoing_msg_id LEFT JOIN admins ON admins.admin_id = messages.incoming_msg_id
            WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id})
            OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0)
    {
        while ($row = mysqli_fetch_assoc($query))
        {
            if($row['outgoing_msg_id'] === $outgoing_id) // If it matches with database (Msg sender)
            {
                $output .= '<div class="chat outgoing">
                                <div class="details">
                                    <p>'. $row['msg'].'</p>
                                </div>
                            </div>';
            }
            else // Msg reciever
            {
                $output .= '<div class="chat incoming">
                                <div class="details">
                                    <p>'. $row['msg'].'</p>
                                </div>
                            </div>';
            }
        }
        echo $output;
    }
?>