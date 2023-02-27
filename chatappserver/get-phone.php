<?php
    include_once "config.php";
	header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $sql = mysqli_query($conn, "SELECT * FROM calls
                                WHERE (call_send_id = {$outgoing_id} AND call_get_id = {$incoming_id})
                                OR (call_send_id = {$incoming_id} AND call_get_id = {$outgoing_id})");
    if(mysqli_num_rows($sql) > 0)
    {
        $row = mysqli_fetch_assoc($sql);

        if($row['status'] == "calling")
        {
            if($row['call_send_id'] == $outgoing_id)
            {
                echo "Calling";
            }
            else
            {
                echo '<a class = "phone2" id = "link"><i class="fas fa-solid fa-phone-volume"></i></a>';
            }
        }
        else
        {
            echo "Connected";
        }
    }
    else
    {
        echo '<a class = "phone" id = "link"><i class="fas fa-solid fa-phone"></i></a>';
    }
?>