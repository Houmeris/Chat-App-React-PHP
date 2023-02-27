import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import {CheckStatus} from '../Components/CheckStatus';
import {AddFriendHandler} from '../Components/AddFriendHandler';

function AddFriend () {

    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
        AddFriendHandler();
        
    });

    return (
        <div className="wrapper">
            <Link to='/users'><i className="fas fa-arrow-left"></i></Link>
            <section className="users">
                <p>Enter a name of an account you want to add to friend list</p>
                <div className="search">
                    <span className="text">Select an user to start chat</span>
                    <input type="text" placeholder="Enter name to search..." />
                    <button id = "search-button" ><i className='fas fa-search'></i></button>
                </div>
                <div className="users-list">
                </div>
            </section>
        </div>
    );
}

export default AddFriend;