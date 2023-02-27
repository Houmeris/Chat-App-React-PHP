<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $new_img_name = "";
    $servertime = time();
    if(!empty($message) || $_FILES['image']['name'] != '')
    {
        if($_FILES['image']['name'] != '')
        {
            $img_name = $_FILES['image']['name']; // Get file name
            $img_type = $_FILES['image']['type']; // Get file type
            $tmp_name = $_FILES['image']['tmp_name'];

            $img_explode = explode('.', $img_name); // get extension
            $img_ext = end($img_explode);

            $extensions = ['png', 'jpeg', 'jpg']; // Valid extensions
            if(in_array($img_ext, $extensions) === true) // if file with these extensions is selected
            {
                $time = time();
                $new_img_name = $time.$img_name; // Create a unique name for the image to not replace the files
                if(move_uploaded_file($tmp_name, "A:/Coding/chat-app/public/images/".$new_img_name))
                {
                    $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg, msg_img, msg_time, seen)
                            VALUES ({$incoming_id}, {$outgoing_id}, '{$message}', '{$new_img_name}', {$servertime}, {SQL_TINYINT(0)})") or die();
                    group_chat_notification($conn, $incoming_id, $outgoing_id);
                }
                else
                {
                    echo "File too large";
                }
            }
            else
            {
                echo "Select a file with png, jpeg or jpg extension";
                exit();
            }
        }
        else
        {
            $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg, msg_img, msg_time, seen)
                    VALUES ({$incoming_id}, {$outgoing_id}, '{$message}', '{$new_img_name}', {$servertime}, {SQL_TINYINT(0)})") or die();
            group_chat_notification($conn, $incoming_id, $outgoing_id);
            
        }
    }
    function group_chat_notification($conn, $incoming_id, $outgoing_id)
    {
        $sql = mysqli_query($conn, "SELECT * FROM groups WHERE group_id = {$incoming_id}");
        if(mysqli_num_rows($sql) > 0)
        {
            $row = mysqli_fetch_assoc($sql);
            if($row['group_admin_id'] != $outgoing_id)
            {
                mysqli_query($conn, "INSERT INTO group_msg_notification (group_id, msg_geter_id)
                                        VALUES ({$incoming_id}, {$row['group_admin_id']})");
                $sql = mysqli_query($conn, "SELECT * FROM group_list WHERE group_id = {$incoming_id}
                                            AND NOT user_id = $outgoing_id");
                while($row = mysqli_fetch_assoc($sql))
                {
                    mysqli_query($conn, "INSERT INTO group_msg_notification (group_id, msg_geter_id)
                                        VALUES ({$incoming_id}, {$row['user_id']})");
                }
            }
            else
            {
                $sql = mysqli_query($conn, "SELECT * FROM group_list WHERE group_id = {$incoming_id}
                                            AND NOT user_id = $outgoing_id");
                while($row = mysqli_fetch_assoc($sql))
                {
                    mysqli_query($conn, "INSERT INTO group_msg_notification (group_id, msg_geter_id)
                                        VALUES ({$incoming_id}, {$row['user_id']})");
                }
            }
        }
    }
?>