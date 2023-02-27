import Cookies from 'js-cookie';

function DeleteAcc() {
    const form = document.getElementById("deleteform");
    const continueBtn = document.getElementById("deletebutton");
    const errorText = form.querySelector(".error-txt");
    document.getElementById('user_id').value = Cookies.get('user_id');

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    continueBtn.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/deleteaccount.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if(!isNaN(data))
                    {
                        Cookies.remove('user_id'); // Remove cookie
                        window.location.href = "/login";
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
        let formData = new FormData(form);
        xhr.send(formData); // Send formData to PHP
    }

}

export {DeleteAcc};