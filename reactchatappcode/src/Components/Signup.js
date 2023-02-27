import Cookies from 'js-cookie';

function Signup () {
    // Use Ajax to POST formData
    const form = document.getElementById("regform"),
    continueBtn = document.getElementById("regbutton"),
    errorText = form.querySelector(".error-txt");

    form.onsubmit = (e) =>{
        e.preventDefault();
    }

    continueBtn.onclick = () =>{
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/signup.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    if(!isNaN(data))
                    {
                        Cookies.set('user_id', data, { expires: 365 });
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
        let formData = new FormData(form);
        xhr.send(formData); // Send formData to PHP
    }
}

export {Signup};