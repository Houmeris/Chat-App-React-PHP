<?php
    include_once "config.php";
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $data = json_decode(file_get_contents('php://input'), true);
    $outgoing_id = mysqli_real_escape_string($conn, $data['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $data['incoming_id']);
    mysqli_query($conn, "DELETE FROM calls
                        WHERE (call_send_id = {$outgoing_id} AND call_get_id = {$incoming_id})
                        OR (call_send_id = {$incoming_id} AND call_get_id = {$outgoing_id})");
?>