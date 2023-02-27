import Cookies from 'js-cookie';

function LogoutHandler () {
    const admin_id = Cookies.get('admin_id');

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/chatappserver/admin/logout.php", true)

    let formData = new FormData();
    formData.append('logout_id', admin_id);
    xhr.send(formData);
}

export {LogoutHandler};