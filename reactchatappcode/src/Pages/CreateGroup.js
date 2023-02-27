import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import { CreateGroupHandler } from '../Components/CreateGroupHandler';
import {CheckStatus} from '../Components/CheckStatus';

function CreateGroup () {
    useEffect(() => {
        if (Cookies.get('user_id') == undefined)
        {
            window.location.href = "/login";
        }
        CreateGroupHandler();
        CheckStatus();
    });

    return (
        <div className="wrapper">
            <Link to='/users'><i className="fas fa-arrow-left"></i></Link>
            <section className="form group">
                <form action = "#" encType="multipart/form-data" id="groupform">
                    <div className="error-txt"></div>
                    <div className="field input">
                        <label>Group name</label>
                        <input type = "text" name="groupname" placeholder = "Enter group's name" required />
                    </div>
                    <div className='field image'>
                        <label>Select an image for profile - jpeg, jpg, png</label>
                        <input type="file" name='image'></input>
                    </div>
                    <div className="field button">
                        <input type="submit" value="Create a group" id="groupbutton" />
                    </div>
                </form>
            </section>
        </div>
    );
}

export default CreateGroup;