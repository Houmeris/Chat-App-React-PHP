<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);

    if(isset($_FILES['image']))
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

            if(move_uploaded_file($tmp_name, "A:/Coding/chat-app/public/images/".$new_img_name)) // if file is succesfully uploaded then do this
            {
                $sql = mysqli_query($conn, "UPDATE users SET img = '{$new_img_name}' WHERE unique_id = {$user_id}");
                if($sql)
                {
                    echo "Success";
                }
                else
                {
                    echo "Something went wrong";
                }

            }
        }
        else
        {
            echo "Please select an Image file - jpeg, jpg, png!";
        }
    }
    else
    {
        echo "Please select an Image file!";
    }
?>