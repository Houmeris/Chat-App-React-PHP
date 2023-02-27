<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    mysqli_query($conn, "DELETE FROM calls
                        WHERE (call_send_id = {$outgoing_id} AND call_get_id = {$incoming_id})
                        OR (call_send_id = {$incoming_id} AND call_get_id = {$outgoing_id})");
?>