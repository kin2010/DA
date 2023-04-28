/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import { useParams } from "react-router-dom";
import { useCreateMediaStream } from "../../../hook/useCreateMediaStream";
import Audio from "./Audio";
import { AppContextProvider } from "../../../Context/AppContext";
import Stream from "../Stream";
const Meeting = () => {
  const { room } = useParams();
  const videoRef = useRef();
  const { userStream, setUserStream } = useContext(AppContextProvider);
  const [stream, setStream] = useState({
    audio: true,
    webcam: true,
  });
  const userMediaStream = useCreateMediaStream(
    videoRef,
    stream.audio,
    stream.webcam
  );
  const [callShown, setCallShown] = useState(false);
  const handeJoin = () => {
    //
    setCallShown(true);
  };
  useEffect(() => {
    setUserStream(userMediaStream || null);
  }, [userMediaStream]);

  return (
    <>
      <Header />
      {!callShown ? (
        <div
          style={{
            background: "#75757515",
          }}
          className="text-center  "
        >
          <div className="mt-2 text_pri">Cuộc họp : {room || ""}</div>
          <div className="mx-auto text-center">
            <Card className="card_meeting">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Setting
                </Typography>
                <div classNmme="mtg-video">
                  <video
                    ref={videoRef}
                    volume="0"
                    autoPlay
                    poster="../images/thum.png"
                    className="mtg"
                  ></video>
                </div>
                <Audio stream={stream} setStream={setStream} />
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={handeJoin}>
                  Join
                </Button>
                <Button variant="contained" color="error">
                  Leave
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      ) : (
        <Stream initStream={userStream} />
      )}
    </>
  );
};

export default Meeting;
