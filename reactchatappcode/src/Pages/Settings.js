import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import {CheckStatus} from '../Components/CheckStatus';

function Settings () {

    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
    });
    return (
        <div className='wrapper'>
            <Link to='/users'><i className="fas fa-arrow-left"></i></Link>
            <section className="users">
                <Link to = '/changepsw'>Change password</Link> <br></br>
                <Link to = '/changepic'>Change profile picture</Link> <br></br>
                <Link to = '/deleteaccount'>Delete account</Link>
            </section>
        </div>
    );
}

export default Settings;