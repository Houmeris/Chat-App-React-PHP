import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { Signup } from '../Components/Signup';

function Index () {
    // Use useEffect to run javascript code after rendering
    useEffect(() => {
        //Check for Cookie
        if (Cookies.get('user_id') != undefined)
        {
            window.location.href = "/users";
        }
        Signup();
      });

    return (
        <div className="wrapper">
            <section className="form signup">
                <header>Chat App</header>
                <form action = "#" encType="multipart/form-data" id="regform">
                    <div className="error-txt"></div>
                    <div className="field input">
                        <label>Username</label>
                        <input type = "text" name="username" placeholder = "Enter your username" required />
                    </div>
                        <div className="field input">
                            <label>Email Adress</label>
                            <input type = "text" name="email" placeholder = "Enter your email" required />
                        </div>
                        <div className="field input">
                            <label>Password</label>
                            <input type = "password" name="password" placeholder = "Enter new password" required />
                        </div>
                        <div className='field image'>
                            <label>Select an image for profile - jpeg, jpg, png</label>
                            <input type="file" name='image'></input>
                        </div>
                    <div className="field button">
                        <input type="submit" value="Continue to Chat" id="regbutton" />
                    </div>
                </form>
                <div className="link">Already signed up? <Link to='/login'>Login now</Link></div>
            </section>
        </div>
        );
        
}

export default Index;