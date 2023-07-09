import React, { useState } from "react";
import Uploadd from "../../component/Upload";
import FormControl from "../../component/FormControl";
import { Upload } from "antd";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../../component/FileUpload/FileUpload";
import { Formik } from "formik";
import { getCourse, useCourseService } from "../../hook/LessionHook";
import { openNotification } from "../../Notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CourseTab3 = ({ setStep, step }) => {
  const [fileList, setFileList] = useState([]);
  const courseService = useCourseService();
  const courseId = sessionStorage.getItem("new_course");
  const queryClient = useQueryClient();
  const id = sessionStorage.getItem("new_course");
  const { data } = useQuery(["course", id], getCourse);

  const handeAddLessonSumbit = async (value) => {
    console.log(value);
    const res = await courseService.updateCourse({
      id: courseId,
      body: value,
    });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "SAVED",
      });
      // sessionStorage.setItem("new_course", courseData?.data?._id);
      setTimeout(() => {
        setStep(step + 1);
      }, 2000);
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={{ video: [], thumbnail: [] }}
      onSubmit={(value) => handeAddLessonSumbit(value)}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="mb-3">
          <div className="widget-inner">
            {/* <form className={"edit-profile m-b30"} onSubmit={handleSubmit}> */}
            <div className="row">
              <div className="col-12">
                <div className="ml-auto">
                  <h3>Media</h3>
                </div>
              </div>
              <div className="col-6 mt-3">
                <label className="col-form-label">Giới thiệu khóa học :</label>
                <div className=" text-center">
                  <FileUpload
                    btnName="UPLOAD VIDEO"
                    label="Supports: mp4"
                    accept="video/mp4,video/x-m4v,video/*"
                    formName="video"
                  />
                </div>
              </div>
              <div className="col-6 mt-3">
                <label className="col-form-label">Hình ảnh khóa học :</label>
                <div className=" text-center">
                  <FileUpload
                    btnName={"CHOOSE THUMBNAIL"}
                    label={"Supports: jpg,jpeg, or png"}
                    accept="image/*"
                    formName="thumbnail"
                  ></FileUpload>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <Button variant="contained" color="primary" type="submit">
                Save changes
              </Button>
              <Button
                className="ms-3"
                variant="outlined"
                color="primary"
                type="submit"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CourseTab3;
