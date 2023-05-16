import React from "react";
const FooterVideo = () => {
  return (
    <div className="ui" id="video-setting">
      <i
        style={{ color: "#fff" }}
        className="fa-solid fa-microphone mute-remote-mic"
        title="mic_on_local-video"
      ></i>
      <i
        title="camera_on_local-video"
        style={{ color: "#fff" }}
        className="fa-solid fa-video mute-remote-camera"
      ></i>
      <i
        title="camera_on_local-video"
        style={{ color: "#fff" }}
        className="fa-solid fa-expand expand-remote-video"
      ></i>
      <i
        title="camera_on_local-video"
        style={{ color: "#fff" }}
        className="fa-regular fa-square-arrow-up-right focus-video"
      ></i>
    </div>
  );
};

export default FooterVideo;
