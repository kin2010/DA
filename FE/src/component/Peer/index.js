import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

const PeerCall = () => {
  const [myId, setMyId] = useState(null);
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [myPeer, setMypeer] = useState();
  // Initialize PeerJS
  useEffect(() => {
    const myPeer = new Peer();
    setMypeer(myPeer);
    myPeer.on("open", (id) => {
      setMyId(id);
    });

    myPeer.on("call", (call) => {
      call.answer(stream);

      call.on("stream", (remoteStream) => {
        addPeerStream(remoteStream, call.peer);
      });
    });

    return () => {
      myPeer.destroy();
    };
  }, []);

  // Add a new peer
  const addPeer = (peerId) => {
    const call = myPeer.call(peerId, stream);

    call.on("stream", (remoteStream) => {
      addPeerStream(remoteStream, peerId);
    });
  };

  // Add a new peer's stream
  const addPeerStream = (remoteStream, peerId) => {
    const peer = { id: peerId, stream: remoteStream };
    setPeers((prevPeers) => [...prevPeers, peer]);
  };

  // Start the local video stream
  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
    videoRef.current.srcObject = stream;
  };

  console.log(peers);
  return (
    <div>
      <h1>My ID: {myId}</h1>

      <button onClick={startStream}>Start Stream</button>

      <div>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>

      <h2>Peers:</h2>

      <ul>
        {peers.map((peer, index) => (
          <li key={index}>
            <video srcObject={peer.stream} />
          </li>
        ))}
      </ul>

      <h2>Connect to Peer:</h2>

      <input type="text" id="peer-id" />

      <button onClick={() => addPeer(document.getElementById("peer-id").value)}>
        Connect
      </button>
    </div>
  );
};

export default PeerCall;
