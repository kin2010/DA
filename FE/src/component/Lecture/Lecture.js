import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { createLectureSchema } from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { addSection } from "../../hook/LessionHook";
import FormControl from "../FormControl";
import { Button } from "@mui/material";
import { Divider, Modal, Tabs, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUpload from "../FileUpload/FileUpload";

const LectureAdd = ({ open, setOpen }) => {
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
    // const res = await addSection({ ...value });
    // if (res?.status === 200) {
    //   openNotification({
    //     type: "success",
    //     message: "Created successfully",
    //   });
    // } else {
    //   openNotification({
    //     type: "error",
    //     message: "Creation failed",
    //   });
    // }
    // setOpen(false);
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
    return (
      <>
        <label className="col-form-label">Select your video :</label>
        <FileUpload
          btnName="Select your video"
          label="Supports: mp4"
          accept="video/mp4,video/x-m4v,video/*"
        />
        <FormControl label={"Youtube URL*"}></FormControl>
      </>
    );
  };
  const Tab3 = () => {
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);

    return (
      <>
        <div
          className="p-3 text-center"
          style={{
            border: "2px dashed #757575",
            minHeight: "200px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            defaultFileList={[...fileList]}
            multiple
          >
            <Button variant="outlined" icon={<UploadOutlined />}>
              <AddBoxIcon
                style={{ fontSize: "18px", marginRight: "10px" }}
              ></AddBoxIcon>
              ATTACHMENTS
            </Button>
          </Upload>
          <label className="col-form-label">
            Supports: jpg, jpeg, png, pdf or .zip
          </label>
        </div>
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
      initialValues={{ name: "" }}
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
