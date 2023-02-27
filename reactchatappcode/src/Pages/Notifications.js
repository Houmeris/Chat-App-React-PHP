import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import {CheckStatus} from '../Components/CheckStatus';
import {NotificationsHandler} from '../Components/NotificationsHandler';

function Inbox () {
    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
        NotificationsHandler();
    });

    return (
        <div className="wrapper">
            <Link to='/users'><i className="fas fa-arrow-left"></i></Link>
            <section className="users">
                <p>Here you can see all the invites</p>
                <div className="users-list">
                </div>
                <div className="groups-list">
                </div>
            </section>
        </div>
    );
}

export default Inbox;