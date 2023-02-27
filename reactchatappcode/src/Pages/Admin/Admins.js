import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { GetAdmin } from '../../Components/Admin/GetAdmin';
import { CheckStatus } from '../../Components/Admin/CheckStatus';
import { GetAdmins } from '../../Components/Admin/GetAdmins';
import { CheckStatusAdmins } from '../../Components/Admin/CheckStatusAdmins';

function Admins() {
    useEffect(() => {
        if (Cookies.get('admin_id') == undefined)
        {
            window.location.href = "/admin";
        }
        GetAdmin();
        GetAdmins();
        CheckStatus();
        CheckStatusAdmins();
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
                <div className="users-list">
                </div>
            </section>
        </div>
    );
}
export default Admins;