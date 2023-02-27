<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $encryptedpassw = md5($password);
    if(!empty($username) && !empty($email) && !empty($password))
    {
        // Check if email is valid
        if(filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            // Check if username is valid
            if(preg_match("/[^a-zA-Z0-9_]+/", $username))
            {
                echo "Your username contains symbols that are not allowed";
            }
            else
            {
                if(strlen($username) > 25)
                {
                    echo "The number of characters for username cannot exceed 25";
                }
                else
                {
                    if(strlen($password) < 8)
                    {
                        echo "Your password needs to be atleast 8 symbols long";
                    }
                    else
                    {
                        if(preg_match("/[a-z]/", $password) && preg_match("/[A-Z]/", $password) && preg_match("/[0-9]/", $password)) // Check if a password contains atlease one upper case letter, one lower case letter and atleast one number
                        {
                            // Check email exists in database
                            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
                            if(mysqli_num_rows($sql) > 0) // If email already exists
                            {
                                echo "$email - This email already exists!";
                            }
                            else
                            {
                                $sql4 = mysqli_query($conn, "SELECT username FROM users WHERE username = '{$username}'");
                                if(mysqli_num_rows($sql4) > 0)
                                {
                                    echo "$username - This username already exists!";
                                }
                                else
                                {
                                    $status = time(); // Use time to tell when user was last connected
                                    $random_id = rand(time(), 10000000); // Create a unique id
                    
                                    // Send data to database
                                    $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, username, email, password, status)
                                                                    VALUES ({$random_id}, '{$username}', '{$email}', '{$encryptedpassw}', {$status})");
                                    if($sql2) // If everything is ok
                                    {
                                        $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                        if(mysqli_num_rows($sql3) > 0)
                                        {
                                            $row = mysqli_fetch_assoc($sql3);
                                            echo $row['unique_id'];
                                        }
                                    }
                                    else
                                    {
                                        echo "Something went wrong!";
                                    }
                                }
                            }
                        }
                        else
                        {
                            echo "Your password requires atleast one upper case letter, one lower case letter and atleast one number";
                        }
                    }
                }
            }
        }
        else
        {
            echo "$email - this is not a valid email";
        }
    }
    else
    {
        echo "All input fields are required";
    }
?>