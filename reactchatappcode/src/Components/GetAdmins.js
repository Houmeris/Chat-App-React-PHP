import Cookies from 'js-cookie';

function GetAdmins() {
    const usersList = document.querySelector(".users .users-list");
    const user_id = Cookies.get('user_id');
    const searchBar = document.querySelector(".users .search input");
    //const button = document.getElementById('search-button');
    var olddata = "";

    searchBar.onkeyup = () =>{
        let searchTerm = searchBar.value;
        if(searchTerm != "")
        {
            searchBar.classList.add("active");
        }
        else
        {
            searchBar.classList.remove("active");
        }
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/search.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    usersList.innerHTML = data;
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        let formData = new FormData();
        formData.append('user_id', user_id);
        xhr.send("searchTerm=" + searchTerm + "&user_id=" + user_id);
    }


    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/users.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                let data = xhr.response;
                if(!searchBar.classList.contains("active"))
                {
                    if (data != olddata)
                    {
                        usersList.innerHTML = data;
                        olddata = data;
                        sortList();
                    }
                }
            }
        }
        let formData = new FormData();
        formData.append('user_id', user_id);
        xhr.send(formData);
    }, 500); // This function will run every 500ms

    function sortList()
    {
        const collection = document.getElementsByClassName("hidden-time");
        var users = document.querySelectorAll('div.users-list a');
        users = Array.prototype.slice.call(users, 0);
        var time = [];
        for (var i = 0; i < collection.length; i++)
        {
            time[i] = collection[i].innerHTML;
        }
        for(let i = 0; i < time.length; i++)
        {
            for (let j = 0; j < time.length - i - 1; j++)
            {
                if(time[j + 1] > time[j])
                {
                    [time[j + 1],time[j]] = [time[j],time[j + 1]];
                    [users[j + 1],users[j]] = [users[j],users[j + 1]];
                }
            }
        }
        for (var i = 0; i < time.length; i++)
        {
            usersList.appendChild(users[i]);
        }
    }
}

export {GetAdmins};