import $ from 'jquery';
import React from "react";

function GroupChatHandler(props) {
    const form = document.querySelector(".typing-area"),
    inputField = form.querySelector(".input-field"),
    sendBtn = form.querySelector("button"),
    chatBox = document.querySelector(".chat-box");
    var olddata = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const incoming_id = urlParams.get('group_id');
    var uuid;

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    sendBtn.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/insert-chat.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    inputField.value = ""; // The inpufield becomes empty after sending a message
                    console.log(data);
                    $('#file1').wrap('<form>').closest('form').get(0).reset();
                    $("#file1").unwrap();
                    scrollToBottom();
                }
            }
        }
        // Send form from ajax to PHP
        let formData = new FormData(form);
        xhr.send(formData); // Send form from ajax to PHP
    }

    chatBox.onmouseenter = () =>{
        chatBox.classList.add("active");
    }
    chatBox.onmouseleave = () =>{
        chatBox.classList.remove("active");
    }

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/group-get-chat.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if (data != olddata)
                    {
                        olddata = data;
                        chatBox.innerHTML = data;
                    }
                    if(!chatBox.classList.contains("active")) // Does not activate when mouse is in the window
                    {
                        scrollToBottom();
                    }
                }
            }
        }
        let formData = new FormData(form);
        xhr.send(formData); // Send form from ajax to PHP
    }, 500); // This function will run every 500ms

    function scrollToBottom()
    {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function get_call_id(){
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/get-call-id.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    uuid = data;
                }
            }
        }
        let formData = new FormData(form);
        xhr.send(formData); // Send form from ajax to PHP
    }
    get_call_id();

    $("#link2").click(function(){
        window.open(`/room/${uuid}`, '_blank');
    });

    // Check if user is in group list
    let xhr = new XMLHttpRequest(); //XML object
    xhr.open("POST", "http://localhost:80/chatappserver/check_group_list.php", true);
    xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
            if(xhr.status === 200)
            {
                let data = xhr.response;
                if(data == 0)
                {
                    window.location.href = "/users";
                }
            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData); // Send form from ajax to PHP
}

export {GroupChatHandler};