<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
    $group_name = mysqli_real_escape_string($conn, $_POST['groupname']);
    $call_id = mysqli_real_escape_string($conn, $_POST['call_id']);

    if(empty($group_name))
    {
        echo "Write group's name";
        exit();
    }
    $sql2 = mysqli_query($conn, "SELECT group_name FROM groups WHERE group_name = '{$group_name}'");
    if(mysqli_num_rows($sql2) > 0)
    {
        echo "$group_name - This group already exists!";
        exit();
    }
    if(strlen($group_name) > 18)
    {
        echo "The number of characters for group cannot exceed 18";
        exit();
    }
    if($_FILES['image']['name'] == '')
    {
        echo "Select an image for the group";
        exit();
    }

    $img_name = $_FILES['image']['name']; // Get file name
    $img_type = $_FILES['image']['type']; // Get file type
    $tmp_name = $_FILES['image']['tmp_name'];

    $img_explode = explode('.', $img_name); // get extension
    $img_ext = end($img_explode);
    $extensions = ['png', 'jpeg', 'jpg']; // Valid extensions
    if(in_array($img_ext, $extensions) === false)
    {
        echo "Please select an Image file - jpeg, jpg, png!";
        exit();
    }
    $time = time();
    $new_img_name = $time.$img_name; // Create a unique name for the image to not replace the files
    move_uploaded_file($tmp_name, "A:/Coding/chat-app/public/images/".$new_img_name);

    // send data to database
    $sql = mysqli_query($conn, "INSERT INTO groups (group_admin_id, group_name, img, call_room_id)
                                VALUES ({$user_id}, '{$group_name}', '{$new_img_name}', '{$call_id}')");
    if($sql)
    {
        echo 1;
    }
    else
    {
        echo "Error";
    }
?>