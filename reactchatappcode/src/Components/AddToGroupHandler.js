import Cookies from 'js-cookie';

function AddToGroupHandler() {
    const usersList = document.querySelector(".users .users-list");
    const searchBar = document.querySelector(".users .search input");
    const button = document.getElementById('search-button');
    const user_id = Cookies.get('user_id');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const incoming_id = urlParams.get('group_id');

    button.onclick = () =>{
        let searchTerm = searchBar.value;
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/searchgroup.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if(searchTerm != "")
                    {
                        usersList.innerHTML = data;
                        addtodatabase();
                    }
                    else
                    {
                        usersList.innerHTML = "No users found related to your search term";
                    }
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("searchTerm=" + searchTerm + "&user_id=" + user_id + "&group_id=" + incoming_id);
    }

    function addtodatabase(){
        const buttons = document.querySelectorAll('div.users-list button');

        for(var i = 0; i < buttons.length; i++){
            const tmp = i;
            if(buttons[tmp].innerHTML == "Invite sent")
            {
                buttons[tmp].disabled = true;
                buttons[tmp].style = "cursor:default"; 
            }

            const friend_id = buttons[i].getAttribute("name");
            buttons[tmp].onclick = () =>{
                let xhr = new XMLHttpRequest(); //XML object
                xhr.open("POST", "http://localhost:80/chatappserver/groupinvitetodatabase.php", true);
                xhr.onload = () =>{
                    if(xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if(xhr.status === 200)
                        {
                            buttons[tmp].innerHTML = "Invite sent";
                            buttons[tmp].disabled = true;
                            buttons[tmp].style = "cursor:default";
                        }
                        else
                        {
                            console.log("Error");
                        }
                    }
                }
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send("friend_id=" + friend_id + "&group_id=" + incoming_id);
            }
        }
    }
}

export {AddToGroupHandler};