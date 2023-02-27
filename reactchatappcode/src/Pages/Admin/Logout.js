import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { LogoutHandler } from '../../Components/Admin/LogoutHandler';

function Logout(){
    useEffect(() => {
        if (Cookies.get('admin_id') == undefined) // Check if cookie does not exist
        {
            window.location.href = "/admin";
        }
        LogoutHandler();
        Cookies.remove('admin_id'); // Remove cookie
        window.location.href = "/admin";
    });
}

export default Logout;