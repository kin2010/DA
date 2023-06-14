import React, { useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLectureSchema } from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import {
  addLecture,
  addSection,
  useCourseService,
} from "../../hook/LessionHook";
import FormControl from "../FormControl";
import { Button } from "@mui/material";
import { Divider, Modal, Tabs, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUpload from "../FileUpload/FileUpload";
import { getYoutubeId } from "../../ultis/func";
import { useQueryClient } from "@tanstack/react-query";

const LectureAdd = ({ open, setOpen, section }) => {
  const courseService = useCourseService();

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handeAddLessonSumbit = async (value) => {
    console.log(value);
    const res = await courseService.addLecture({
      ...value,
      section: section?._id,
    });
    if (res?.status === 200) {
      openNotification({
        type: "success",
        message: "Created successfully",
      });
      // qye;
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
    setOpen(false);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const Tab1 = () => {
    return (
      <>
        <FormControl name="name" label="Lecture Title*"></FormControl>
        <FormControl
          type={"editor"}
          name="description"
          label="Description*"
        ></FormControl>
      </>
    );
  };
  const Tab2 = () => {
    const { values } = useFormikContext();

    return (
      <>
        <label className="col-form-label">Select your video :</label>
        <FileUpload
          btnName="Select your video"
          label="Supports: mp4"
          accept="video/mp4,video/x-m4v,video/*"
          formName="video"
        />
        <FormControl name="youtube_url" label={"Youtube URL*"}></FormControl>
        {!!getYoutubeId(values["youtube_url"]) && (
          <div className="text-center mt-3">
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(
                values["youtube_url"]
              )}?controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              allowFullScreen
              title="Embedded youtube"
              className="w-75"
            />
          </div>
        )}
      </>
    );
  };
  const Tab3 = () => {
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);

    return (
      <>
        <FileUpload
          btnName="ATTACHMENTS"
          label="Supports: jpg, jpeg, png, pdf or .zip"
          accept="image/*, .pdf"
          formName="attachment"
          multiple
        ></FileUpload>
      </>
    );
  };

  const items = [
    {
      key: "1",
      label: `Basic`,
      children: <Tab1 />,
    },
    {
      key: "2",
      label: `Video`,
      children: <Tab2 />,
    },
    {
      key: "3",
      label: `Attachments`,
      children: <Tab3 />,
    },
  ];
  return (
    <Formik
      initialValues={{ name: "", youtube_url: "" }}
      onSubmit={(value) => handeAddLessonSumbit(value)}
      validationSchema={createLectureSchema}
    >
      {(props) => (
        <Modal
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={700}
        >
          <form onSubmit={props.handleSubmit} className="mb-3">
            <div className="mt-3 ">
              <Tabs
                popupClassName="tabss"
                // style={{ width: "100%", textAlign: "center" }}
                centered
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
              />
              {/* <Button
              size="small"
              variant="outlined"
              key="back"
              onClick={handleCancel}
            >
              Close
            </Button> */}
              <div className="d-flex justify-content-end">
                <Button
                  size="small"
                  className="mt-2"
                  variant="contained"
                  key="submit"
                  type="submit"
                >
                  Add Lecture
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default LectureAdd;
