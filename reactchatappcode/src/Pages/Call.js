import React, { useEffect } from 'react';

import { CallHandler } from '../Components/CallHandler';
import { CallHandler2 } from '../Components/CallHandler2';
import { CheckStatus } from '../Components/CheckStatus';

function Call () {

    useEffect(() => {
        CheckStatus();
        CallHandler2();
    });
    return (
        <div className="wrapper2">
            <div id = "callingdiv">Calling<span id = "dots"></span></div>
            <video className='localCam' id="webcamVideo" autoPlay playsInline muted="muted"></video>
            <video className='remoteCam' id="remoteVideo" autoPlay playsInline></video>
            <button className='hangup' id='hangupButton'><i className="fas fa-solid fa-phone"></i></button>
            <button className='mute' id='muteButton'><i className="fas fa-solid fa-microphone"></i></button>
            <button className='camButton' id='camButton'><i className="fas fa-solid fa-video"></i></button>
        </div>
    );
}

export default Call;