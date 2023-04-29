import { useEffect, useState } from "react";

export const useCreateMediaStream = (localVideoRef, audio = true, webcam) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    const createMediaStream = async () => {
      try {
        if (!userMediaStream) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: webcam || {
              width: { min: 640, ideal: 1920 },
              height: { min: 400, ideal: 1080 },
              aspectRatio: { ideal: 1.7777777778 },
            },
            audio: audio,
          });
          localVideoRef.current.srcObject = stream;
          // set media stream
          setUserMediaStream(stream);
          return;
        } else {
          userMediaStream.getVideoTracks()[0].enabled = !!webcam;
          userMediaStream.getAudioTracks()[0].enabled = !!audio;
          setUserMediaStream(userMediaStream);
        }
      } catch (error) {}
    };
    // userMediaStream.getVideoTracks()[0].enabled = !!webcam;
    createMediaStream();
  }, [localVideoRef, audio, webcam]);

  return userMediaStream;
};
