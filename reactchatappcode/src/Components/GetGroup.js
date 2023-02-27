

function GetGroup () {
    const user_details = document.getElementById('account_details');
    const urlParams = new URLSearchParams(window.location.search);
    const group_id = urlParams.get('group_id');
    const friendpfp = document.getElementById('friendpfp');

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/chatappserver/get-group.php", true)
    xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
            if(xhr.status === 200)
            {
                let data = xhr.response;
                let img = data.substr(0, data.indexOf('</img>')); // Get image
                friendpfp.innerHTML = img;
                let after_img = data.split('</img>').pop(); // Get accunt details after image
                user_details.innerHTML = after_img;
            }
        }
    }
    let formData = new FormData();
    formData.append('group_id', group_id);
    xhr.send(formData);
}

export {GetGroup};