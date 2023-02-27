import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

function Logout(){
    useEffect(() => {
        if (Cookies.get('user_id') == undefined) // Check if cookie does not exist
        {
            window.location.href = "/login";
        }

        Cookies.remove('user_id'); // Remove cookie
        window.location.href = "/login";
    });
}

export default Logout;