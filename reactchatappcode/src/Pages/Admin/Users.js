import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { GetAdmin } from '../../Components/Admin/GetAdmin';
import { GetUsers } from '../../Components/Admin/GetUsers';
import { CheckStatus } from '../../Components/Admin/CheckStatus';

function Users () {

    useEffect(() => {
        if (Cookies.get('admin_id') == undefined)
        {
            window.location.href = "/admin";
        }
        GetAdmin();
        GetUsers();
        CheckStatus();
    });

    return (
        <div className="wrapper">
            <section className="users">
                <header>
                    <div className="content">
                        <div className="details" id="account_details">
                        </div>
                    </div>
                    <Link to='/admin/logout' className='logout'>Logout</Link>
                </header>
                <div className="search">
                    <span className="text">Select an user to start chat</span>
                    <input type="text" placeholder="Enter name to search..." />
                </div>
                <div className="users-list">
                </div>
            </section>
        </div>
    );
}

export default Users;