import Cookies from 'js-cookie';
import { v1 as uuid } from "uuid";

function CreateGroupHandler() {
    const form = document.getElementById("groupform");
    const user_id = Cookies.get('user_id');
    const continueBtn = document.getElementById("groupbutton");
    const errorText = form.querySelector(".error-txt");

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    continueBtn.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/creategroup.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if(!isNaN(data))
                    {
                        //Cookies.set('user_id', data, { expires: 365 });
                        window.location.href = "/users";
                    }
                    else
                    {
                        errorText.textContent = data;
                        errorText.style.display = "block";
                    }
                }
            }
        }
        // Send form from ajax to PHP
        const call_id = uuid();
        let formData = new FormData(form);
        formData.append('user_id', user_id);
        formData.append('call_id', call_id);
        xhr.send(formData); // Send formData to PHP
    }
    
}

export {CreateGroupHandler};