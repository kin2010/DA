/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  createAssignmentSchema,
  createLectureSchema,
} from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import {
  addSection,
  useCourseService,
  useGroupService,
} from "../../hook/LessionHook";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import { Divider, Modal } from "antd";
import ModalCommon from "../../component/Modal";
import Audio from "../Call/Meeting/Audio";
import FormControl from "../../component/FormControl";
import { useCreateMediaStream } from "../../hook/useCreateMediaStream";
import { AppContextProvider } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Context/constant";

const MeetingAdd = ({ open, setOpen, group, user }) => {
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const videoRef = useRef();
  const courseService = useCourseService();
  const courseId = sessionStorage.getItem("new_course");
  const handleCancel = () => {
    setOpen(false);
  };
  const [stream, setStream] = useState({
    audio: true,
    webcam: true,
  });
  const userMediaStream = useCreateMediaStream(
    videoRef,
    stream.audio,
    stream.webcam
  );
  const { userStream, setUserStream } = useContext(AppContextProvider);

  const [callShown, setCallShown] = useState(false);
  const groupServices = useGroupService();
  const navigate = useNavigate();

  useEffect(() => {
    setUserStream(userMediaStream || null);
  }, [userMediaStream]);

  const handleSubmitMeeting = async (value) => {
    const params = {
      group: group,
      createdby: user,
      name: value?.name,
    };
    const res = await groupServices.addMeeting(params);
    console.log(res);
    if (res?.meeting?._id) {
      setTimeout(() => {
        window?.open(URL + "/meeting/" + res?.meeting?._id);
      }, 2000);
    }
    setOpen(false);

    console.log(value);
  };

  const handeJoin = () => {
    // setCallShown(true);
  };

  return (
    <Formik
      initialValues={{ name: "Cuộc họp mới" }}
      onSubmit={(value) => handleSubmitMeeting(value)}
      validationSchema={createAssignmentSchema}
    >
      {(props) => (
        <Modal
          open={open}
          setOpen={setOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {" "}
          <form
            onSubmit={props.handleSubmit}
            //   className="mb-3"
          >
            <div
              style={{
                background: "#75757515",
              }}
              className="text-center mt-3 "
            >
              <div className="mx-auto ">
                <Card className="card_meeting">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      CÀI ĐẶT
                    </Typography>
                    <FormControl
                      label="Tên cuộc họp: "
                      name="name"
                    ></FormControl>
                    <div className="mtg-video mt-3">
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
                    <Button
                      variant="contained"
                      key="submit"
                      type="submit"
                      onClick={handeJoin}
                    >
                      Join
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancel}
                    >
                      Leave
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default MeetingAdd;
