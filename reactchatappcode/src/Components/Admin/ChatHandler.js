

function ChatHandler() {
    const form = document.querySelector(".typing-area"),
    inputField = form.querySelector(".input-field"),
    sendBtn = form.querySelector("button"),
    chatBox = document.querySelector(".chat-box");

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
                    inputField.value = ""; // The inpufield becomes empty after sending a message
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
                    chatBox.innerHTML = data;
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
}

export {ChatHandler};