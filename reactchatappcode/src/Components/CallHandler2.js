import $ from 'jquery';
import Cookies from 'js-cookie';

function CallHandler2() {
    var dots = 0;
    const outgoing_id = Cookies.get('user_id');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const incoming_id = urlParams.get('user_id');
    const calling = urlParams.get('call');
    var mute = false;
    var camstatus = false;

    var dotfunc = setInterval(() => {
        if (dots < 3)
        {
            $('#dots').append('.');
            dots++;
        }
        else
        {
            $('#dots').html('');
            dots = 0;
        }
    }, 600);

    //our username 
    var name = Cookies.get('user_id'); 
    var connectedUser;

    
    //connecting to our signaling server 
    var conn = new WebSocket('ws://localhost:9090');
    
    conn.onopen = function () { 
    console.log("Connected to the signaling server"); 
    };

    conn.onmessage = function (msg) { 
        console.log("Got message", msg.data); 
        var data = JSON.parse(msg.data); 
         
        switch(data.type) { 
           case "login": 
              handleLogin(data.success); 
              break; 
           //when somebody wants to call us 
           case "offer": 
              handleOffer(data.offer, data.name); 
              break; 
           case "answer": 
              handleAnswer(data.answer);
              break; 
           //when a remote peer sends an ice candidate to us 
           case "candidate": 
              handleCandidate(data.candidate); 
              break; 
           case "leave": 
              handleLeave(); 
              break;
           default: 
              break; 
        } 
    };

    conn.onerror = function (err) { 
        console.log("Got error", err); 
    };

    //alias for sending JSON encoded messages 
    function send(message) { 
        //attach the other peer username to our messages 
        if (connectedUser) { 
            message.name = connectedUser; 
        } 
        
        conn.send(JSON.stringify(message));
    };

    //****** 
    //UI selectors block 
    //****** 

    const webcamVideo = document.getElementById('webcamVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const hangupButton = document.getElementById('hangupButton');
    const muteButton = document.getElementById('muteButton');
    const camButton = document.getElementById('camButton');

    var yourConn; 
    var stream; 

    async function login () {
        await new Promise(resolve => setTimeout(resolve, 500));
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:80/chatappserver/get-username.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    //console.log(data);
                    //name = Cookies.get('user_id');

                    if (name.length > 0)
                    {
                        send({
                            type: "login",
                            name: name,
                            incoming_name: incoming_id
                        });
                    }
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("outgoing_id=" + outgoing_id);
    }

    login();

    function handleLogin(success) {
        if (success === false)
        { 
            document.body.style.display = "none";
            alert("You can not connect to the same call");

        }
        else
        {
            // Peer connection without camera
            navigator.webkitGetUserMedia({ video: false, audio: true }, function (myStream) {
                stream = myStream;
                webcamVideo.srcObject = stream;
                var configuration = {
                    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
                };
                //stream.getVideoTracks()[0].enabled = false;
                yourConn = new RTCPeerConnection(configuration);

                // setup stream listening 
                yourConn.addStream(stream);

                //when a remote user adds stream to the peer connection, we display it 
                yourConn.onaddstream = function (e) { 
                    remoteVideo.srcObject = e.stream;
                };

                // Setup ice handling 
                yourConn.onicecandidate = function (event) { 
                    if (event.candidate) { 
                        send({ 
                            type: "candidate", 
                            candidate: event.candidate 
                        }); 
                    } 
                };

            }, function (error){
                console.log(error);
            });

            //********************** 
            //Starting a peer connection with camera
            //********************** 
            navigator.webkitGetUserMedia({ video: true, audio: true }, function (myStream) {
                stream = myStream;
                webcamVideo.srcObject = stream;
                var configuration = {
                    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
                };
                //stream.getVideoTracks()[0].enabled = false;
                yourConn = new RTCPeerConnection(configuration);

                // setup stream listening 
                yourConn.addStream(stream);

                //when a remote user adds stream to the peer connection, we display it 
                yourConn.onaddstream = function (e) { 
                    remoteVideo.srcObject = e.stream;
                };

                // Setup ice handling 
                yourConn.onicecandidate = function (event) { 
                    if (event.candidate) { 
                        send({ 
                            type: "candidate", 
                            candidate: event.candidate 
                        }); 
                    } 
                };

            }, function (error){
                console.log(error);
            });

            if (calling == 0)
            {
                let xhr = new XMLHttpRequest(); //XML object
                xhr.open("POST", "http://localhost:80/chatappserver/calladd.php", true);
                xhr.onload = () =>{
                    if(xhr.readyState === XMLHttpRequest.DONE)
                    {
                        if(xhr.status === 200)
                        {
                            updateCallTime();
                        }
                    }
                }

                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send("incoming_id=" + incoming_id + "&outgoing_id=" + outgoing_id);
            }
            else
            {
                offer();
            }
        }
    };

    function updateCallTime(){
        setInterval(()=>{
            let xhr = new XMLHttpRequest(); //XML object
            xhr.open("POST", "http://localhost:80/chatappserver/calltime.php", true);
            xhr.onload = () =>{
              if(xhr.readyState === XMLHttpRequest.DONE)
              {
                if(xhr.status === 200)
                {
                }
              }
            }
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("incoming_id=" + incoming_id + "&outgoing_id=" + outgoing_id);
          }, 500);
    }

    function callStatus(){
        let xhr = new XMLHttpRequest(); //XML object
        xhr.open("POST", "http://localhost:80/chatappserver/callstatus.php", true);
        xhr.onload = () =>{
          if(xhr.readyState === XMLHttpRequest.DONE)
          {
            if(xhr.status === 200)
            {
            }
          }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("incoming_id=" + incoming_id + "&outgoing_id=" + outgoing_id);
    }

    function offer(){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:80/chatappserver/get-friend-username.php", true);
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                if(xhr.status === 200)
                {
                    let data = xhr.response;
                    console.log(data);
                    wait(data);
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("incoming_id=" + incoming_id);
    };

    async function wait (data){
        var callToUsername = data;

        if(callToUsername.length > 0)
        {
            connectedUser = incoming_id;

            await new Promise(resolve => setTimeout(resolve, 3000));

            //create an offer
            yourConn.createOffer(function (offer) { 
                send({
                   type: "offer", 
                   offer: offer 
                });

                yourConn.setLocalDescription(offer);
            }, function (error) {
                alert("Error when creatingan offer");
            });
        }
    }

    //when somebody sends us an offer 
    function handleOffer(offer, name) {
        connectedUser = name; 
        yourConn.setRemoteDescription(new RTCSessionDescription(offer)); 
        
        //create an answer to an offer 
        yourConn.createAnswer(function (answer) { 
        yourConn.setLocalDescription(answer); 
            
        send({ 
            type: "answer", 
            answer: answer 
        });
            
        }, function (error) { 
        alert("Error when creating an answer"); 
        }); 
        
    };

    function handleAnswer(answer) { 
        yourConn.setRemoteDescription(new RTCSessionDescription(answer)); 
    };

    function handleCandidate(candidate) { 
        yourConn.addIceCandidate(new RTCIceCandidate(candidate));
        
        clearInterval(dotfunc);
        callStatus();
        $('#callingdiv').html('');
    };

    hangupButton.onclick = async () => {
        handleLeave();
    }

    function handleLeave () {
        connectedUser = null; 
        remoteVideo.src = null; 
        window.close();
        yourConn.close(); 
        yourConn.onicecandidate = null; 
        yourConn.onaddstream = null;
    }

    muteButton.onclick = async () => {
        if (mute == false)
        {
          stream.getAudioTracks()[0].enabled = false;
          muteButton.innerHTML = '<i class="fas fa-solid fa-microphone-slash"></i>';
          mute = true;
        }
        else
        {
          stream.getAudioTracks()[0].enabled = true;
          muteButton.innerHTML = '<i class="fas fa-solid fa-microphone"></i>';
          mute = false;
        }
    }

    camButton.onclick = async () => {
        if (camstatus == false)
        {
          stream.getVideoTracks()[0].enabled = false;
          camButton.innerHTML = '<i class="fas fa-solid fa-video-slash"></i>';
          camstatus = true;
        }
        else
        {
          stream.getVideoTracks()[0].enabled = true;
          camButton.innerHTML = '<i class="fas fa-solid fa-video"></i>';
          camstatus = false;
        }
    }

}

export {CallHandler2};