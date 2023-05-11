import React, { useEffect, useState } from "react";
import FooterVideo from "../../page/Call/Stream/FooterVideo";

export const RemoteVideo = (props) => {
  const [mediaStream, setMediaStream] = useState();
  const { id } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      const stream = document.getElementById(props.id).srcObject;

      if (stream) {
        setMediaStream(stream);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  return (
    <div
      className="vd"
      style={{
        width: "100%",
      }}
    >
      <video
        id={id || "local-video"}
        volume="0"
        autoPlay
        muted
        poster="../images/thum.png"
        className="video"
      ></video>
      <FooterVideo />
    </div>
  );
};
