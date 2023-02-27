import Cookies from 'js-cookie';

function GetUser () {
    const user_details = document.getElementById('account_details');
    const user_id = Cookies.get('user_id');

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/chatappserver/get-account.php", true)
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
    formData.append('user_id', user_id);
    xhr.send(formData);
}

export {GetUser};