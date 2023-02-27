import Cookies from 'js-cookie';

function NotificationsHandler() {
    const usersList = document.querySelector(".users .users-list");
    const groupsList = document.querySelector(".users .groups-list");
    const user_id = Cookies.get('user_id');
    var olddata = '';
    var olddata2 = '';

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/friendnotifications.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if (data != olddata)
                    {
                        olddata = data;
                        usersList.innerHTML = data;
                    }
                    buttonaction();
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("user_id=" + user_id);
    }, 500); // This function will run every 500ms

    function buttonaction()
    {
        const buttons = document.querySelectorAll('div.users-list button');
        for(var i = 0; i < buttons.length; i++){
            const tmp = i;

            const friend_id = buttons[tmp].getAttribute("name");
            buttons[tmp].onclick = () =>{
                if(buttons[tmp].innerHTML == "Agree")
                {
                    let xhr = new XMLHttpRequest(); //XML object
                    xhr.open("POST", "http://localhost:80/chatappserver/friendagree.php", true);
                    xhr.onload = () =>{
                        if(xhr.readyState === XMLHttpRequest.DONE)
                        {
                            if(xhr.status === 200)
                            {
                                console.log("Success");
                            }
                            else
                            {
                                console.log("Error");
                            }
                        }
                    }
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send("friend_id=" + friend_id + "&user_id=" + user_id);
                }
                else
                {
                    let xhr = new XMLHttpRequest(); //XML object
                    xhr.open("POST", "http://localhost:80/chatappserver/frienddecline.php", true);
                    xhr.onload = () =>{
                        if(xhr.readyState === XMLHttpRequest.DONE)
                        {
                            if(xhr.status === 200)
                            {
                                console.log("Success");
                            }
                            else
                            {
                                console.log("Error");
                            }
                        }
                    }
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send("friend_id=" + friend_id + "&user_id=" + user_id);
                }
            }
        }
    }

    //Handling group invites

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/groupnotifications.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if (data != olddata2)
                    {
                        olddata2 = data;
                        groupsList.innerHTML = data;
                    }
                    buttonaction2();
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("user_id=" + user_id);
    }, 500); // This function will run every 500ms

    function buttonaction2(){
        const buttons = document.querySelectorAll('div.groups-list button');
    
        for(var i = 0; i < buttons.length; i++){
            const tmp = i;
    
            const group_id = buttons[tmp].getAttribute("name");
            buttons[tmp].onclick = () =>{
                if(buttons[tmp].innerHTML == "Agree")
                {
                    let xhr = new XMLHttpRequest(); //XML object
                    xhr.open("POST", "http://localhost:80/chatappserver/groupagree.php", true);
                    xhr.onload = () =>{
                        if(xhr.readyState === XMLHttpRequest.DONE)
                        {
                            if(xhr.status === 200)
                            {
                                console.log("Success");
                            }
                            else
                            {
                                console.log("Error");
                            }
                        }
                    }
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send("group_id=" + group_id + "&user_id=" + user_id);
                }
                else
                {
                    let xhr = new XMLHttpRequest(); //XML object
                    xhr.open("POST", "http://localhost:80/chatappserver/groupdecline.php", true);
                    xhr.onload = () =>{
                        if(xhr.readyState === XMLHttpRequest.DONE)
                        {
                            if(xhr.status === 200)
                            {
                                console.log("Success");
                            }
                            else
                            {
                                console.log("Error");
                            }
                        }
                    }
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send("group_id=" + group_id + "&user_id=" + user_id);
                }
            }
        }
    }
}

export {NotificationsHandler};