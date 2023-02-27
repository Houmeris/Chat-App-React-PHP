import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import $ from 'jquery';

import { CheckStatus } from '../Components/CheckStatus';
import {GroupChatHandler} from '../Components/GroupChatHandler';
import {GetGroup} from '../Components/GetGroup';

function GroupChat () {

    // Use useEffect to run javascript code after rendering
    useEffect(() => {
        //Check for Cookie
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        // Get parameter from url to identify the admin who is going to get the message
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const incoming_id = urlParams.get('group_id');
        document.getElementById('incoming_id').value = incoming_id;
        // Get the connected users ID from the cookie
        document.getElementById('outgoing_id').value = Cookies.get('user_id');
        CheckStatus();
        GetGroup();
        GroupChatHandler();
        
        $("#upfile1").click(function(){
            $("#file1").trigger('click'); // Clicking on upfile1 id triggers file1 id
        });
        $("#link").attr("href", "addtogroup?group_id=" + incoming_id);
    });

    return (
        <div className="wrapper">
            <section className="chat-area">
                <header>
                    <Link to='/users'><i className="fas fa-arrow-left"></i></Link>
                    <div id = "friendpfp"></div>
                    <div className='details' id='account_details'>
                    </div>
                    <div className='groupbutton'>
                        <a style={{cursor: "pointer", marginRight: "20px"}} id = "link2"><i className="fas fa-solid fa-phone"></i></a>
                        <a id='link'><button style={{borderRadius: "50%"}}><i className="fas fa-solid fa-plus"></i></button></a>
                    </div>
                </header>
                <div className='chat-box'>
                </div>
                <form action='#' className='typing-area' autoComplete='off'>
                    <input type="text" name="outgoing_id" defaultValue="#" id='outgoing_id' hidden />
                    <input type="text" name="incoming_id" defaultValue="#" id='incoming_id' hidden />
                    <div className='filebutton'><i className="fas fa-solid fa-plus" id='upfile1'></i></div>
                    <input type="file" name='image' id='file1' style={{display:"none"}}></input>
                    <input type="text" name="message" className="input-field" placeholder="Type a message here..." />
                    <div className='sendbutton'><button><i className="fab fa-telegram-plane"></i></button></div>
                </form>
            </section>
        </div>
    );
}

export default GroupChat;