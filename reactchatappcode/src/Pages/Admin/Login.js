import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { LoginHandler } from '../../Components/Admin/LoginHandler';

function Login() {

    useEffect (() => {
        if (Cookies.get('admin_id') != undefined)
        {
            window.location.href = "/admin/users";
        }
        LoginHandler();
    });


    return (
        <div className="wrapper">
            <section className="form login">
                <header>Chat App Admin</header>
                <form action = "#" id="logform">
                    <div className="error-txt"></div>
                        <div className="field input">
                            <label>Email Adress</label>
                            <input type = "text" name="email" placeholder = "Enter your email" />
                        </div>
                        <div className="field input">
                            <label>Password</label>
                            <input type = "password" name="password" placeholder = "Enter your password" />
                        </div>
                    <div className="field button">
                        <input type="submit" value="Continue to Chat" id="loginbutton" />
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;