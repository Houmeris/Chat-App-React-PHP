import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import {CheckStatus} from '../Components/CheckStatus';
import {DeleteAcc} from '../Components/DeleteAcc'

function DeleteAccount() {

    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
        DeleteAcc();
    });

    return(
        <div className='wrapper'>
        <Link to='/settings'><i className="fas fa-arrow-left"></i></Link>
        <section className="form login">
        <p>Confrim your email and password</p>
        <form action = "#" encType="multipart/form-data" id='deleteform'>
            <div className="error-txt"></div>
            <div className="field input">
                <label>Email Adress</label>
                <input type = "text" name="email" placeholder = "Enter your email" />
            </div>
            <div className="field input">
                <input type="text" name="user_id" defaultValue="#" id='user_id' hidden />
                <label>Password</label>
                <input type = "password" name="password" placeholder = "Enter your password" ></input>
            </div>
            <div className="field button">
                <input type="submit" value="Delete" id="deletebutton" />
            </div>
        </form>
        </section>
    </div>
    );
}

export default DeleteAccount;