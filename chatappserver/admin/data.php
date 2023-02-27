<?php
    $servtime = time();
    while($row = mysqli_fetch_assoc($sql))
    {
        if($servtime - $row['status'] < 10)
        {
            $output .= '<a href="chat?user_id=' . $row['unique_id'] . '">
            <div class="content">
                <div class="details">
                    <span>'. $row['username'] .'</span>
                </div>
            </div>
            </a>';
        }
    }
?>