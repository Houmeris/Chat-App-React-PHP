import Cookies from 'js-cookie';

function CheckStatus() {
    const user_id = Cookies.get('user_id');

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML objektas
        xhr.open("POST", "http://localhost:80/chatappserver/checkstatus.php", true);

        let formData = new FormData();
        formData.append('user_id', user_id);
        xhr.send(formData);
    }, 5000); // This function will run every 5 seconds
}

export {CheckStatus};