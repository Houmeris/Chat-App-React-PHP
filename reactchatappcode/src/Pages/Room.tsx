import React, { useState, useRef, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import Video from "../Components/Video";
import { WebRTCUser } from "../types";

const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = "http://localhost:8080";

const App = () => {
  const socketRef = useRef<SocketIOClient.Socket>();
  const localStreamRef = useRef<MediaStream>();
  const sendPCRef = useRef<RTCPeerConnection>();
  const receivePCsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [users, setUsers] = useState<Array<WebRTCUser>>([]);
  const roomID = useParams();
  const myJSON = JSON.stringify(roomID["roomID"]);
  const roomIDString = myJSON.replace(/['"]+/g, '');
  const [muteButtonText, setMuteButtonText] = useState("fas fa-solid fa-microphone");
  const [camButtonText, setCamButtonText] = useState("fas fa-solid fa-video");

  const localVideoRef = useRef<HTMLVideoElement>(null);

  const closeReceivePC = useCallback((id: string) => {
    if (!receivePCsRef.current[id]) return;
    receivePCsRef.current[id].close();
    delete receivePCsRef.current[id];
  }, []);

  const createReceiverOffer = useCallback(
    async (pc: RTCPeerConnection, senderSocketID: string) => {
      try {
        const sdp = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        console.log("create receiver offer success");
        await pc.setLocalDescription(new RTCSessionDescription(sdp));
        if (!socketRef.current) return;
        socketRef.current.emit("receiverOffer", {
          sdp,
          receiverSocketID: socketRef.current.id,
          senderSocketID,
          roomID: roomIDString,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const createReceiverPeerConnection = useCallback((socketID: string) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      // add pc to peerConnections object
      receivePCsRef.current = { ...receivePCsRef.current, [socketID]: pc };

      pc.onicecandidate = (e) => {
        if (!(e.candidate && socketRef.current)) return;
        console.log("receiver PC onicecandidate");
        socketRef.current.emit("receiverCandidate", {
          candidate: e.candidate,
          receiverSocketID: socketRef.current.id,
          senderSocketID: socketID,
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      pc.ontrack = (e) => {
        console.log("ontrack success");
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              stream: e.streams[0],
            })
        );
      };

      // return pc
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  const createReceivePC = useCallback(
    (id: string) => {
      try {
        console.log(`socketID(${id}) user entered`);
        const pc = createReceiverPeerConnection(id);
        if (!(socketRef.current && pc)) return;
        createReceiverOffer(pc, id);
      } catch (error) {
        console.log(error);
      }
    },
    [createReceiverOffer, createReceiverPeerConnection]
  );

  const createSenderOffer = useCallback(async () => {
    try {
      if (!sendPCRef.current) return;
      const sdp = await sendPCRef.current.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      console.log("create sender offer success");
      await sendPCRef.current.setLocalDescription(
        new RTCSessionDescription(sdp)
      );

      if (!socketRef.current) return;
      socketRef.current.emit("senderOffer", {
        sdp,
        senderSocketID: socketRef.current.id,
        roomID: roomIDString,
        userID: Cookies.get('user_id'),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createSenderPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(pc_config);

    pc.onicecandidate = (e) => {
      if (!(e.candidate && socketRef.current)) return;
      console.log("sender PC onicecandidate");
      socketRef.current.emit("senderCandidate", {
        candidate: e.candidate,
        senderSocketID: socketRef.current.id,
      });
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    if (localStreamRef.current) {
      console.log("add local stream");
      localStreamRef.current.getTracks().forEach((track) => {
        if (!localStreamRef.current) return;
        pc.addTrack(track, localStreamRef.current);
      });
    } else {
      console.log("no local stream");
    }

    sendPCRef.current = pc;
  }, []);

  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (!socketRef.current) return;

      createSenderPeerConnection();
      await createSenderOffer();

      socketRef.current.emit("joinRoom", {
        id: socketRef.current.id,
        roomID: roomIDString,
      });
      /*const checkUser = useCallback(async () => {
        if(socketRef.current)
        {
          socketRef.current.emit("checkUser", {
            userID: Cookies.get('user_id'),
            senderSocketID: socketRef.current.id,
          });
        }
      }, []);*/
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, [createSenderOffer, createSenderPeerConnection]);
  const muteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (muteButtonText == "fas fa-solid fa-microphone")
    {
      if(localStreamRef.current)
      {
        localStreamRef.current.getAudioTracks()[0].enabled = false;
        setMuteButtonText('fas fa-solid fa-microphone-slash');
      }
    }
    else
    {
      if(localStreamRef.current)
      {
        localStreamRef.current.getAudioTracks()[0].enabled = true;
        setMuteButtonText('fas fa-solid fa-microphone');
      }
    }
  }

  const cameraHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (camButtonText == "fas fa-solid fa-video")
    {
      if(localStreamRef.current)
      {
        localStreamRef.current.getVideoTracks()[0].enabled = false;
        setCamButtonText('fas fa-solid fa-video-slash');
      }
    }
    else
    {
      if (localStreamRef.current)
      {
        localStreamRef.current.getVideoTracks()[0].enabled = true;
        setCamButtonText('fas fa-solid fa-video');
      }
    }
  }

  const leaveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.close();
  }

  const checkUser = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if(!socketRef.current) return
    socketRef.current.emit("checkUser", {
      senderSocketID: socketRef.current.id,
      userID: Cookies.get('user_id'),
      });
  }, []);

  useEffect(() => {

    document.getElementsByTagName('body')[0].style.display = "inline";

    if (Cookies.get('user_id') == undefined)
    {
        window.location.href = "/login";
    }

    socketRef.current = io.connect(SOCKET_SERVER_URL);
    checkUser();
    //getLocalStream();

    socketRef.current.on("Getlocal", (data: { id: string }) => {
      getLocalStream();
    });

    socketRef.current.on("userEnter", (data: { id: string }) => {
      createReceivePC(data.id);
    });

    socketRef.current.on(
      "allUsers",
      (data: { users: Array<{ id: string }> }) => {
        data.users.forEach((user) => createReceivePC(user.id));
      }
    );

    socketRef.current.on("userExit", (data: { id: string }) => {
      closeReceivePC(data.id);
      setUsers((users) => users.filter((user) => user.id !== data.id));
    });

    socketRef.current.on(
      "getSenderAnswer",
      async (data: { sdp: RTCSessionDescription }) => {
        try {
          if (!sendPCRef.current) return;
          console.log("get sender answer");
          console.log(data.sdp);
          await sendPCRef.current.setRemoteDescription(
            new RTCSessionDescription(data.sdp)
          );
        } catch (error) {
          console.log(error);
        }
      }
    );

    socketRef.current.on(
      "getSenderCandidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        try {
          if (!(data.candidate && sendPCRef.current)) return;
          console.log("get sender candidate");
          await sendPCRef.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
          console.log("candidate add success");
        } catch (error) {
          console.log(error);
        }
      }
    );

    socketRef.current.on(
      "loginFailed",
      async (data: { errormessage: string }) => {
        try {
          if(socketRef.current)
          {
            alert(data.errormessage);
            socketRef.current.disconnect();
            document.body.style.display = "none";
          }
        } catch (error) {
          console.log(error);
        }
      }
    );

    socketRef.current.on(
      "getReceiverAnswer",
      async (data: { id: string; sdp: RTCSessionDescription }) => {
        try {
          console.log(`get socketID(${data.id})'s answer`);
          const pc: RTCPeerConnection = receivePCsRef.current[data.id];
          if (!pc) return;
          await pc.setRemoteDescription(data.sdp);
          console.log(`socketID(${data.id})'s set remote sdp success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    socketRef.current.on(
      "getReceiverCandidate",
      async (data: { id: string; candidate: RTCIceCandidateInit }) => {
        try {
          console.log(data);
          console.log(`get socketID(${data.id})'s candidate`);
          const pc: RTCPeerConnection = receivePCsRef.current[data.id];
          if (!(pc && data.candidate)) return;
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log(`socketID(${data.id})'s candidate add success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (sendPCRef.current) {
        sendPCRef.current.close();
      }
      users.forEach((user) => closeReceivePC(user.id));
    };
    // eslint-disable-next-line
  }, [
    closeReceivePC,
    createReceivePC,
    createSenderOffer,
    createSenderPeerConnection,
    getLocalStream,
  ]);

  return (
    <div>
      <div style={{
        position: 'absolute',
        left: '40%',
        top: '500px'
      }}>
        <video
          style={{
            width: 450,
            height: 450,
            margin: 5,
            backgroundColor: "black",
          }}
          muted
          ref={localVideoRef}
          autoPlay
        />
        <button className='hangup' onClick={leaveHandler} id='hangupButton'><i className="fas fa-solid fa-phone"></i></button>
        <button className='mute' onClick={muteHandler} id='muteButton'><i className={muteButtonText}></i></button>
        <button className='camButton' onClick={cameraHandler} id='camButton'><i className={camButtonText}></i></button>
      </div>
      {users.map((user, index) => (
        <Video key={index} stream={user.stream} />
      ))}
    </div>
  );
};

export default App;
