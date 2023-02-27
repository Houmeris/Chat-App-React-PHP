import Cookies from 'js-cookie';

function GetAdmins() {
    const usersList = document.querySelector(".users .users-list");
    const admin_id = Cookies.get('admin_id');

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/admin/admins.php", true);
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
        let formData = new FormData();
        formData.append('admin_id', admin_id);
        xhr.send(formData);
    }, 500); // This function will run every 500ms
}

export {GetAdmins};