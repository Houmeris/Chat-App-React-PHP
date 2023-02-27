/*import $ from 'jquery';
import Cookies from 'js-cookie';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function CallHandler() {
  var dots = 0;
  var callid = "";
  const outgoing_id = Cookies.get('user_id');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const incoming_id = urlParams.get('user_id');
  const calling = urlParams.get('call');
  var cal = "";
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

  //Seting up firebase and calling function
  const firebaseConfig = {
    apiKey: "AIzaSyCoL-H2FSQcDwC2t-8rqdNglYDUknfYn14",
    authDomain: "projektas-ded1e.firebaseapp.com",
    projectId: "projektas-ded1e",
    storageBucket: "projektas-ded1e.appspot.com",
    messagingSenderId: "830998112851",
    appId: "1:830998112851:web:47ce6a57fa530806b434a6",
    measurementId: "G-Z84GFFDT7N"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const firestore = firebase.firestore();

    const servers = {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
    };
      
    // Global State
    const pc = new RTCPeerConnection(servers);
    let localStream = null;
    let remoteStream = null;

    const webcamVideo = document.getElementById('webcamVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const hangupButton = document.getElementById('hangupButton');
    const muteButton = document.getElementById('muteButton');
    const camButton = document.getElementById('camButton');

    // 1. Setup media sources
    async function webcam (){
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      remoteStream = new MediaStream();

      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
      });

      // Pull tracks from remote stream, add to video stream
      pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
          });
       };
      webcamVideo.srcObject = localStream;
      remoteVideo.srcObject = remoteStream;
    }
    //webcam();

    //2. Create an offer
    async function createoffer(){
      // Reference Firestore collections for signaling
      await webcam();
      const callDoc = firestore.collection('calls').doc();
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');

      callid = callDoc.id;

      let xhr = new XMLHttpRequest(); //XML object
      xhr.open("POST", "http://localhost:80/chatappserver/calladd.php", true);
      xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
          if(xhr.status === 200)
          {
            
          }
        }
      }
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("incoming_id=" + incoming_id + "&outgoing_id=" + outgoing_id + "&call_id=" + callid);

      // Get candidates for caller, save to db
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            clearInterval(dotfunc);
            $('#callingdiv').html('');
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
       });
    };

    if(calling == 0)
    {
      createoffer();
    }

    async function getcallid(){
      await webcam();
      let xhr = new XMLHttpRequest(); //XML object
      xhr.open("POST", "http://localhost:80/chatappserver/callstatus.php", true);
      xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
          if(xhr.status === 200)
          {
            let data = xhr.response;
            cal = data;
            answeroffer();
          }
        }
      }
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("incoming_id=" + incoming_id + "&outgoing_id=" + outgoing_id);
    };

    async function answeroffer(){
      const callId = cal;
      const callDoc = firestore.collection('calls').doc(callId);
      const answerCandidates = callDoc.collection('answerCandidates');
      const offerCandidates = callDoc.collection('offerCandidates');

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === 'added') {
            clearInterval(dotfunc);
            $('#callingdiv').html('');
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    };

    if(calling == 1)
    {
      getcallid();
    }

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

    // Disconnect user if the other left or lost connection
    pc.oniceconnectionstatechange = function() {
      if(pc.iceConnectionState == 'disconnected') {
          console.log('Disconnected');
          window.close();
      }
  }

  hangupButton.onclick = async () => {
    window.close();
  }

  muteButton.onclick = async () => {
    if (mute == false)
    {
      localStream.getAudioTracks()[0].enabled = false;
      muteButton.innerHTML = '<i class="fas fa-solid fa-microphone-slash"></i>';
      mute = true;
    }
    else
    {
      localStream.getAudioTracks()[0].enabled = true;
      muteButton.innerHTML = '<i class="fas fa-solid fa-microphone"></i>';
      mute = false;
    }
  }

  camButton.onclick = async () => {
    if (camstatus == false)
    {
      localStream.getVideoTracks()[0].enabled = false;
      camButton.innerHTML = '<i class="fas fa-solid fa-video-slash"></i>';
      camstatus = true;
    }
    else
    {
      localStream.getVideoTracks()[0].enabled = true;
      camButton.innerHTML = '<i class="fas fa-solid fa-video"></i>';
      camstatus = false;
    }
  }

}
export {CallHandler};*/