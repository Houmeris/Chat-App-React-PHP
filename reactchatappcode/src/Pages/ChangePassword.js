import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import {CheckStatus} from '../Components/CheckStatus';
import {ChangePsw} from '../Components/ChangePsw';

function ChangePassword() {

    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CheckStatus();
        ChangePsw();
    });
    return (
        <div className='wrapper'>
            <Link to='/settings'><i className="fas fa-arrow-left"></i></Link>
            <section className="form login">
            <form action = "#" encType="multipart/form-data" id='changepswform'>
                <div className="error-txt"></div>
                <div className="field input">
                    <input type="text" name="user_id" defaultValue="#" id='user_id' hidden />
                    <label>Current password</label>
                    <input type = "password" name="old-password" placeholder = "Enter your current password" ></input>
                    <br></br>
                    <label>New password</label>
                    <input type = "password" name="new-password" placeholder = "Enter your new password" ></input>
                    <br></br>
                    <label>Confirm new password</label>
                    <input type = "password" name="confirm-new-password" placeholder = "Enter your new password" ></input>
                </div>
                <div className="field button">
                    <input type="submit" value="Continue" id="changepswbutton" />
                </div>
            </form>
            </section>
        </div>
    );
}


export default ChangePassword;