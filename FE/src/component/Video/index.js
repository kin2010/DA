import React, { forwardRef } from "react";
import FooterVideo from "../../page/Call/Stream/FooterVideo";

const StreamVideo = forwardRef((props, ref) => {
  const { id, width, height } = props;

  return (
    <div
      className="vd"
      style={{
        width: width || "100%",
      }}
    >
      <video
        ref={ref}
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
});

export default StreamVideo;
