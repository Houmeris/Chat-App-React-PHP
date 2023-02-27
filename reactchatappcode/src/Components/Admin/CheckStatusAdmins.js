import Cookies from 'js-cookie';

function CheckStatusAdmins() {
    const admin_id = Cookies.get('admin_id');

    setInterval(()=>{
        let xhr = new XMLHttpRequest(); //XML objektas
        xhr.open("POST", "http://localhost:80/chatappserver/admin/checkstatus.php", true);

        let formData = new FormData();
        formData.append('admin_id', admin_id);
        xhr.send(formData);
    }, 5000); // This function will run every 5 seconds
}

export {CheckStatusAdmins};