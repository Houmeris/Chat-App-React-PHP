import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { GetUser } from '../Components/GetUser';
import {GetAdmins} from '../Components/GetAdmins';
import {CheckStatus} from '../Components/CheckStatus';
import {GetPfp} from '../Components/GetPfp';

function Users () {

    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        GetPfp();
        GetUser();
        GetAdmins();
        CheckStatus();
    });

    return (
        <div className="wrapper">
            <section className="users">
                <header>
                    <div className="content">
                        <Link to = '/settings'><div id='pfp'></div></Link>
                        <div className="details" id='account_details'>
                        </div>
                    </div>
                    <Link to='/logout' className='logout'>Logout</Link>
                </header>
                <br></br>
                <div className="inbox">
                    <Link to='/notifications'><button><i className="fas fa-solid fa-bell"></i></button></Link>
                    <div className="dropdown">
                        <button className='addfriend'><i className="fas fa-solid fa-plus"></i></button>
                        <div className="dropdown-content">
                            <Link to='/addfriend'>Add friend</Link>
                            <Link to='/creategroup'>Create Group</Link>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <span className="text">Select an user to start chat</span>
                    <input style={{width: "100%"}} type="text" placeholder="Enter name to search..." />
                </div>
                <div className="users-list">
                </div>
            </section>
        </div>
    );
}

export default Users;