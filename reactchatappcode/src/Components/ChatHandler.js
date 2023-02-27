import $, { data } from 'jquery';

function ChatHandler() {
    const form = document.querySelector(".typing-area"),
    inputField = form.querySelector(".input-field"),
    sendBtn = form.querySelector("button"),
    chatBox = document.querySelector(".chat-box"),
    phone = document.getElementById("phone");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const incoming_id = urlParams.get('user_id');
    var olddata = '';
    var olddata2 = '';

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
                    inputField.value = ""; // The inputfield becomes empty after sending a message
                    $('#file1').wrap('<form>').closest('form').get(0).reset(); // Reset the file selection
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
        xhr.open("POST", "http://localhost:80/chatappserver/get-chat.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if (data != olddata2)
                    {
                        olddata2 = data;
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

    //phone handling
    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/get-phone", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    //phone.innerHTML = data;
                    if(data == 'Connected' && data != olddata)
                    {
                        phone.innerHTML = data;
                        olddata = data;
                    }
                    if(data == 'Calling' && data != olddata)
                    {
                        phone.innerHTML = data;
                        olddata = data;
                    }
                    if(data == '<a class = "phone" id = "link"><i class="fas fa-solid fa-phone"></i></a>' && data != olddata)
                    {
                        phone.innerHTML = data;
                        $("#link").click(function(){
                            window.open("/call?user_id=" + incoming_id + "&call=0", '_blank', 'location=yes,height=680,width=600,scrollbars=yes,status=yes');
                            phone.innerHTML = "Connecting";
                        });
                        olddata = data;
                    }
                    else if (data == '<a class = "phone2" id = "link"><i class="fas fa-solid fa-phone-volume"></i></a>' && data != olddata)
                    {
                        phone.innerHTML = data;
                        $("#link").click(function(){
                            window.open("/call?user_id=" + incoming_id + "&call=1", '_blank', 'location=yes,height=680,width=600,scrollbars=yes,status=yes');
                            phone.innerHTML = "Connecting";
                        });
                        olddata = data;
                    }
                }
            }
        }
        let formData = new FormData(form);
        xhr.send(formData); // Send form from ajax to PHP
    }, 500); // This function will run every 500ms

    // Check if user is in friend list
    let xhr = new XMLHttpRequest(); //XML object
    xhr.open("POST", "http://localhost:80/chatappserver/check_friend_list.php", true);
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

export {ChatHandler};