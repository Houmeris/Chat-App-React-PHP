import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import {CheckStatus} from '../Components/CheckStatus';
import {AddToGroupHandler} from '../Components/AddToGroupHandler';

function AddToGroup () {
    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
        AddToGroupHandler();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const incoming_id = urlParams.get('group_id');
        
        $("#back").attr("href", "groupchat?group_id=" + incoming_id);
    });

    return (
        <div className="wrapper">
            <a id='back'><i className="fas fa-arrow-left"></i></a>
            <section className="users">
                <p>Enter a name of an account you want to add to the group</p>
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

export default AddToGroup;