/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateMediaStream } from "../../../hook/useCreateMediaStream";
import Audio from "./Audio";
import { AppContextProvider } from "../../../Context/AppContext";
import Stream from "../Stream";
import { AuthContextProvider } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMeeting } from "../../../hook/LessionHook";
import HeaderAppBar from "../../Header/AppBar";
import { Backdrop, CircularProgress } from "@mui/material";
import { Result } from "antd";
const Meeting = () => {
  const { room } = useParams();
  const videoRef = useRef();
  const { userStream, setUserStream } = useContext(AppContextProvider);
  const [stream, setStream] = useState({
    audio: true,
    webcam: true,
  });
  const { id } = useParams();
  const { data: meeting, isLoading } = useQuery(
    ["meeting_detail", id],
    getMeeting,
    {
      retry: 0,
    }
  );
  const { userData: user } = useContext(AuthContextProvider);
  const navigate = useNavigate();
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

  if (isLoading) {
    return (
      <>
        <HeaderAppBar />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  if (
    // !!meeting?.group?.course &&
    !(meeting?.group?.course?.users || [])?.find(
      (item) => user?.user?._id === item
    )
  ) {
    return (
      <>
        {" "}
        <HeaderAppBar />{" "}
        <Result
          status="404"
          title="404"
          subTitle="Bạn không có quyền để tham gia cuộc Meeting này"
          extra={
            <Button onClick={() => navigate("/")} type="primary">
              Trang chủ
            </Button>
          }
        />
      </>
    );
  }
  if (!!userStream) {
    return <Stream initStream={userStream} />;
  }
  return (
    <>
      {!callShown && <HeaderAppBar />}
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
                <div className="mtg-video">
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
        <>{!!user?.user && <Stream initStream={userStream} />}</>
      )}
    </>
  );
};

export default Meeting;
