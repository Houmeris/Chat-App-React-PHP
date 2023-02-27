

function GetUsers() {
    const searchBar = document.querySelector(".users .search input"),
    usersList = document.querySelector(".users .users-list");

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
        xhr.open("POST", "http://localhost:80/chatappserver/admin/search.php", true);
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
        xhr.send("searchTerm=" + searchTerm);
    }
    //

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("GET", "http://localhost:80/chatappserver/admin/users.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if(!searchBar.classList.contains("active"))
                    {
                        usersList.innerHTML = data;
                    }
                }
            }
        }
        xhr.send();
    }, 500); // This function will run every 500ms
}

export {GetUsers};