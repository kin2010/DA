/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Divider, Empty } from "antd";
import {
  addSection,
  getCourse,
  useCourseService,
} from "../../hook/LessionHook";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  createGroupSchema,
  createLectureSchema,
} from "../../Validation/CourseCreate";
import FormControl from "../../component/FormControl";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Modal } from "antd";
import Section from "../../component/Section";
import { openNotification } from "../../Notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Group from "../Group";

const CourseTab2 = ({ setStep }) => {
  const [validated, setValidated] = React.useState(false);
  const [arrChapter, setArrChapter] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const courseId = sessionStorage.getItem("new_course");
  const id = sessionStorage.getItem("new_course");
  const [query, setQuery] = useState();
  const { data: courseData } = useQuery(["course", id], getCourse);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancelGroup = () => {
    setOpenGroup(false);
  };

  const [ids, setIds] = useState([]);
  const navigate = useNavigate();
  const { handleSubmit } = useFormikContext();

  const showModal = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();
  if (!courseId && !!setStep) {
    setStep(0);
  }
  const courseService = useCourseService();

  const addNewSection = () => {
    setOpen(true);
  };
  const addNewGroup = () => {
    setOpenGroup(true);
    setInit({
      name: "12412g4h1g",
    });
  };

  const handeAddSectionSumbit = async (value) => {
    const res = await courseService.addSection({ ...value, course: courseId });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Tạo thành công",
      });
    } else {
      openNotification({
        type: "error",
        message: "Tạo thất bại",
      });
    }
    setOpen(false);
  };
  const addGroup = async (value) => {
    console.log(value);
    const res = await courseService.addGroup({ ...value, course: courseId });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Tạo thành công",
      });
    } else {
      openNotification({
        type: "error",
        message: "Tạo thất bại",
      });
    }
    setOpenGroup(false);
  };
  const [init, setInit] = useState({
    name: "dad",
  });
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(value) => addGroup(value)}
        validationSchema={createGroupSchema}
      >
        {(props) => (
          <Modal
            open={openGroup}
            title="Thêm Group"
            // onOk={handleOk}
            onCancel={handleCancelGroup}
            footer={null}
          >
            <form onSubmit={props.handleSubmit}>
              <FormControl name="name" label={"Tên group*"}></FormControl>
              <FormControl
                name="description"
                type={"editor"}
                label={"Mô tả*"}
              ></FormControl>

              <Divider></Divider>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  size="small"
                  variant="outlined"
                  key="back"
                  onClick={handleCancel}
                >
                  Đóng
                </Button>
                <Button
                  size="small"
                  className="ms-2"
                  variant="contained"
                  key="submit"
                  type="submit"
                >
                  Thêm Group
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </Formik>
      <div className="widget-inner">
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>Group học tập</h3>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div
              className="d-flex align-items-center mb-5 col-12"
              style={{
                width: "100%",
                padding: "10px ",
                border: "0.5px solid #12121220",
                background: "white",
              }}
            >
              <ViewListIcon className="me-4" color="primary" />
              <Typography>Group</Typography>
              <Button
                variant="contained"
                className="ms-auto"
                color="primary"
                onClick={addNewGroup}
              >
                Thêm Group
              </Button>
            </div>
            <div className="col-12  ">
              {!!courseData?.groups?.length ? (
                courseData?.groups?.map((data) => (
                  <div key={data?._id} className="mt-5">
                    <Group propData={data}></Group>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    border: "0.5px solid #12121220",
                    background: "white",
                    padding: "15px",
                  }}
                >
                  <Empty />
                </div>
              )}
            </div>
          </div>
          <div className="form-group col-6"></div>
        </div>
      </div>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(value) => handeAddSectionSumbit(value)}
        validationSchema={createLectureSchema}
      >
        {(props) => (
          <Modal
            open={open}
            title="Học phần mới"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <form onSubmit={props.handleSubmit}>
              <FormControl name="name" label={"Tên học phần*"}></FormControl>
              <Divider></Divider>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  size="small"
                  variant="outlined"
                  key="back"
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
                <Button
                  size="small"
                  className="ms-2"
                  variant="contained"
                  key="submit"
                  type="submit"
                >
                  Thêm chương học
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </Formik>
      <div className="widget-inner">
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>Đề cương khóa học</h3>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div
              className="d-flex align-items-center mb-5 col-12"
              style={{
                width: "100%",
                padding: "10px ",
                border: "0.5px solid #12121220",
                background: "white",
              }}
            >
              <ViewListIcon className="me-4" color="primary" />
              <Typography>Đề cương</Typography>
              <Button
                variant="contained"
                className="ms-auto"
                color="primary"
                onClick={addNewSection}
              >
                Thêm chương học
              </Button>
            </div>
            <div className="col-12  ">
              {!!courseData?.sections_info?.length ? (
                courseData?.sections_info?.map((data) => (
                  <div key={data?.section?._id} className="mt-5">
                    <Section propData={data}></Section>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    border: "0.5px solid #12121220",
                    background: "white",
                    padding: "15px",
                  }}
                >
                  <Empty />
                </div>
              )}
            </div>
          </div>
          <div className="form-group col-6"></div>
        </div>
      </div>
    </>
  );
};
export default CourseTab2;
