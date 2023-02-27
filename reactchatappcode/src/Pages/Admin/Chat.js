import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { GetAdmin } from '../../Components/Admin/GetAdmin';
import { CheckStatus } from '../../Components/Admin/CheckStatus';
import { ChatHandler } from '../../Components/Admin/ChatHandler';

function Chat () {

    // Use useEffect to run javascript code after rendering
    useEffect(() => {
        //Check for Cookie
        if (Cookies.get('admin_id') == undefined)
        {
            window.location.href = "/admin";
        }
        // Get parameter from url to identify the admin who is going to get the message
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const incoming_id = urlParams.get('user_id');
        document.getElementById('incoming_id').value = incoming_id;
        // Get the connected user from the cookie
        document.getElementById('outgoing_id').value = Cookies.get('admin_id');
        ChatHandler();
        CheckStatus();
        GetAdmin();
    });

    return (
        <div className="wrapper">
            <section className="chat-area">
                <header>
                    <Link to='/admin/users'><i className="fas fa-arrow-left"></i></Link>
                    <div className='details' id="account_details">
                    </div>
                </header>
                <div className='chat-box'>
                </div>
                <form action='#' className='typing-area' autoComplete='off'>
                    <input type="text" name="outgoing_id" defaultValue="#" id='outgoing_id' hidden />
                    <input type="text" name="incoming_id" defaultValue="#" id='incoming_id' hidden />
                    <input type="text" name="message" className="input-field" placeholder="Type a message here..." />
                    <button><i className="fab fa-telegram-plane"></i></button>
                </form>
            </section>
        </div>
    );
}

export default Chat;