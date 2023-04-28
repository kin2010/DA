import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
const Audio = (props) => {
  const {
    stream: { audio, webcam },
    setStream,
  } = props;

  const handleMic = () => {
    setStream((s) => ({
      ...s,
      audio: !audio,
    }));
  };

  const handleWebcam = () => {
    setStream((s) => ({
      ...s,
      webcam: !webcam,
    }));
  };

  return (
    <div
      className=""
      style={{
        padding: "5px ",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        gap: "0 15px",
        background: "#121212",
      }}
    >
      <div onClick={handleMic}>
        {audio ? (
          <KeyboardVoiceIcon
            style={{
              color: "white",
            }}
          />
        ) : (
          <MicOffIcon
            style={{
              color: "white",
            }}
          />
        )}
      </div>
      <div onClick={handleWebcam}>
        {webcam ? (
          <VideocamIcon
            style={{
              color: "white",
            }}
          />
        ) : (
          <VideocamOffIcon
            style={{
              color: "white",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Audio;
