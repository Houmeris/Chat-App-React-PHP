<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = $_POST['user_id'];
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(empty($email) || empty($password))
    {
        echo "All input fields are required!";
        exit();
    }

    $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");

    if(mysqli_num_rows($sql) > 0)
    {
        $row = mysqli_fetch_assoc($sql);
        if($row['email'] != $email)
        {
            echo "Incorrect email";
            exit();
        }
        if($row['password'] != md5($password))
        {
            echo "Incorrect password!";
            exit();
        }
        mysqli_query($conn, "DELETE FROM calls
                            WHERE call_send_id = {$user_id}
                            OR call_get_id = {$user_id}");

        mysqli_query($conn, "DELETE FROM friend_list
                            WHERE friend_send_id = {$user_id}
                            OR friend_get_id = {$user_id}");

        mysqli_query($conn, "DELETE FROM group_list
                            WHERE user_id = {$user_id}");

        mysqli_query($conn, "DELETE FROM group_msg_notification
                            WHERE msg_geter_id = {$user_id}");

        mysqli_query($conn, "DELETE FROM messages
                            WHERE incoming_msg_id = {$user_id}
                            OR outgoing_msg_id = {$user_id}");

        mysqli_query($conn, "DELETE FROM users
                            WHERE unique_id = {$user_id}");
        echo 1;
    }

?>