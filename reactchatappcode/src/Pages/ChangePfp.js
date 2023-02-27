import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import {ChangePic} from '../Components/ChangePic';
import {CheckStatus} from '../Components/CheckStatus';

function ChangePfp () {
    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        ChangePic();
        CheckStatus();
    });

    return (
        <div className='wrapper'>
            <Link to='/settings'><i className="fas fa-arrow-left"></i></Link>
            <section className="users">
                <form action = "#" encType="multipart/form-data" id='pfpform'>
                    <label>Select a picture</label>
                    <input type="file" name='image'></input>
                    <input type="submit" id='picsub'></input>
                </form>
                <p id = "testing"></p>
            </section>
        </div>
    );
}

export default ChangePfp;