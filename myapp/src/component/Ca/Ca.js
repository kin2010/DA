/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useStartPeerSession } from "../../hook/useStartPeer";
import { useCreateMediaStream } from "../../hook/useCreateMediaStream";
import StreamVideo from "../Video";
import { RemoteVideo } from "../RemoteVideo";

const Ca = () => {
  const room = "12345";
  const localVideoRef = useRef();
  const mainRef = useRef();

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers, shareScreen, cancelScreenSharing, isScreenShared } =
    useStartPeerSession(room, userMediaStream, localVideoRef);
  return (
    <>
      <div>
        <StreamVideo ref={localVideoRef} />
      </div>
      <div className="other_video">
        {connectedUsers.map((user) => (
          <RemoteVideo key={user} id={user} autoPlay playsInline />
        ))}
      </div>
    </>
  );
};

export default Ca;
