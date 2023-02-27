import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { LoginHandler } from '../Components/LoginHandler';

function Login () {

    useEffect (() => {
        if (Cookies.get('user_id') != undefined)
        {
            window.location.href = "/users";
        }
        LoginHandler();
    });


    return (
        <div className="wrapper">
            <section className="form login">
                <header>Chat App</header>
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
                <div className="link">Don't have an account? <Link to='/'>Sign up now</Link></div>
            </section>
        </div>
    );
}

export default Login;