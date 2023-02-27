import Cookies from 'js-cookie';

function LoginHandler () {
    const form = document.getElementById("logform"),
    continueBtn = document.getElementById("loginbutton"),
    errorText = form.querySelector(".error-txt");

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    continueBtn.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/admin/login.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    console.log(data);
                    if(!isNaN(data))
                    {
                        Cookies.set('admin_id', data, { expires: 365 });
                        window.location.href = "/admin/users";
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

export {LoginHandler};