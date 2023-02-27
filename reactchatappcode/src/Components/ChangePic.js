import Cookies from 'js-cookie';

function ChangePic () {
    const form = document.getElementById("pfpform");
    const picsub = document.getElementById("picsub");
    const user_id = Cookies.get('user_id');

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    picsub.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/changepfp.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    document.getElementById("testing").innerHTML = data;
                }
            }
        }
        // Send form from ajax to PHP
        let formData = new FormData(form);
        formData.append('user_id', user_id);
        xhr.send(formData); // Send formData to PHP

    }
}

export {ChangePic}