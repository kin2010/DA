import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLectureSchema } from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import {
  addLecture,
  addSection,
  getLectureById,
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
import { Player } from "video-react";
const Tab3 = ({ data }) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  return (
    <>
      <FileUpload
        btnName="Thêm tệp đính kèm"
        label="hỗ trợ: jpg, jpeg, png, pdf or .zip"
        accept="image/*, .pdf"
        formName="attachments"
        multiple
        init={data?.attachments || []}
      ></FileUpload>
    </>
  );
};
const Tab2 = ({ data, isEdit }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!!data) {
      setFieldValue("video", !!data?.video ? data?.video[0] : []);
      setFieldValue("youtube_url", data?.youtube_url || "");
    }
  }, [data]);

  return (
    <>
      {isEdit && <label className="col-form-label">Video hiện tại :</label>}
      {isEdit && !!data?.video?.length && (
        <Player
          className="mt-3"
          playsInline
          poster="/assets/poster.png"
          src={data?.video[0]}
        />
      )}
      <label className="col-form-label">Chọn video bài giảng :</label>
      <FileUpload
        btnName="Chọn video"
        label="Hỗ trợ: mp4"
        accept="video/mp4,video/x-m4v,video/*"
        formName="video"
      />
      <FormControl
        name="youtube_url"
        label={"Đường dẫn yoututbe*"}
      ></FormControl>
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
            style={{ height: "270px" }}
          />
        </div>
      )}
    </>
  );
};
const LectureAdd = ({ open, setOpen, section, isEdit, lectureUpdateId }) => {
  const courseService = useCourseService();
  const [data, setData] = useState();
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const courseData = courseService.get();
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!!isEdit && !!lectureUpdateId) {
      init();
    } else {
      setData(null);
    }
  }, [section, isEdit, lectureUpdateId]);

  const init = async () => {
    const lecture = section?.lectures?.find(
      (lecture) => lecture?._id === lectureUpdateId
    );
    setData(lecture);
  };

  const handeAddLessonSumbit = async (value) => {
    if (!isEdit) {
      const res = await courseService.addLecture({
        ...value,
        section: section?._id,
      });
      if (!res?.message) {
        openNotification({
          type: "success",
          message: "Tạo thành công",
        });
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
      setOpen(false);
    } else {
      const res = await courseService.updateLecture({
        ...value,
        id: data?._id,
      });
      if (!res?.message) {
        openNotification({
          type: "success",
          message: "Cập nhật",
        });
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
      setOpen(false);
    }
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const Tab1 = () => {
    const { setFieldValue, resetForm } = useFormikContext();

    useEffect(() => {
      if (!!data) {
        setFieldValue("name", data?.name);
        setFieldValue("description", data?.description || "");
      } else {
        // resetForm();
      }
    }, [data]);
    return (
      <>
        <FormControl name="name" label="Tên bài giảng*"></FormControl>
        <FormControl
          type={"editor"}
          name="description"
          label="Mô tả*"
        ></FormControl>
      </>
    );
  };

  const items = [
    {
      key: "1",
      label: `Cơ bản`,
      children: <Tab1 />,
    },
    {
      key: "2",
      label: `Video`,
      children: <Tab2 data={data} isEdit={isEdit} />,
    },
    {
      key: "3",
      label: `Đính kèm`,
      children: <Tab3 data={data} />,
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
                  {isEdit ? "Cập nhật" : "Thêm bài giảng"}
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
