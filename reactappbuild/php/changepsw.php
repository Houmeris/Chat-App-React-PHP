<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    //$incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $user_id = $_POST['user_id'];
    $old_password = mysqli_real_escape_string($conn, $_POST['old-password']);
    $new_password = mysqli_real_escape_string($conn, $_POST['new-password']);
    $confirm_new_password = mysqli_real_escape_string($conn, $_POST['confirm-new-password']);
    if(empty($old_password) || empty($new_password) || empty($new_password))
    {
        echo "All input fields are required!";
        exit();
    }
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");
    if(mysqli_num_rows($sql) > 0)
    {
        $row = mysqli_fetch_assoc($sql);
        if($row['password'] != md5($old_password))
        {
            echo "Incorrect password!";
            exit();
        }
        if(strlen($new_password) < 8)
        {
            echo "Your password needs to be atleast 8 symbols long";
            exit();
        }
        if(preg_match("/[a-z]/", $new_password) && preg_match("/[A-Z]/", $new_password) && preg_match("/[0-9]/", $new_password))
        {
            if($confirm_new_password != $new_password)
            {
                echo "Wrong confirmation password";
                exit();
            }
            $encryptedpassw = md5($new_password);
            mysqli_query($conn, "UPDATE users SET password = '{$encryptedpassw}'
                                WHERE unique_id = {$user_id}");
            echo 1;
            exit();
        }
        else
        {
            echo "Your password requires atleast one upper case letter, one lower case letter and atleast one number";
        }
    }
?>