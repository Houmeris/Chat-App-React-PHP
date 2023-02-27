import Cookies from 'js-cookie';

function GetAdmin () {
    const user_details = document.getElementById('account_details');
    const admin_id = Cookies.get('admin_id');

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/chatappserver/admin/get-account.php", true)
    xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
            if(xhr.status === 200)
            {
                let data = xhr.response;
                user_details.innerHTML = data;
            }
        }
    }
    let formData = new FormData();
    formData.append('admin_id', admin_id);
    xhr.send(formData);
}

export {GetAdmin};