import Cookies from 'js-cookie';

function GetPfp () {
    const user_details = document.getElementById('pfp');
    const user_id = Cookies.get('user_id');

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/chatappserver/pfp.php", true)
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

export {GetPfp};