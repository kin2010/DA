/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Divider, Empty } from "antd";
import { addSection, useCourseService } from "../../hook/LessionHook";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLectureSchema } from "../../Validation/CourseCreate";
import FormControl from "../../component/FormControl";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Modal } from "antd";
import Section from "../../component/Section";
import { openNotification } from "../../Notification";
import { useQueryClient } from "@tanstack/react-query";

const CourseTab2 = ({ setStep }) => {
  const [validated, setValidated] = React.useState(false);
  const [arrChapter, setArrChapter] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const courseId = sessionStorage.getItem("new_course");
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
  const courseData = queryClient.getQueryData(["course", courseId]);
  const addChapter = () => {
    const add = {
      data: {},

      index: chapter.length + 1,
    };
    chapter.push(add);
    setChapter([...chapter]);
  };

  const addNewSection = () => {
    setOpen(true);
  };

  const handeAddSectionSumbit = async (value) => {
    const res = await addSection({ ...value, course: courseId });
    if (res?.status === 200) {
      openNotification({
        type: "success",
        message: "Created successfully",
      });
    } else {
      openNotification({
        type: "error",
        message: "Creation failed",
      });
    }
    setOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(value) => handeAddSectionSumbit(value)}
        validationSchema={createLectureSchema}
      >
        {(props) => (
          <Modal
            open={open}
            title="New Section"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <form onSubmit={props.handleSubmit}>
              <FormControl name="name" label={"Section Name*"}></FormControl>
              <Divider></Divider>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  size="small"
                  variant="outlined"
                  key="back"
                  onClick={handleCancel}
                >
                  Close
                </Button>
                <Button
                  size="small"
                  className="ms-2"
                  variant="contained"
                  key="submit"
                  type="submit"
                >
                  Add Section
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </Formik>
      <div className="widget-inner">
        <form className={"edit-profile m-b30"} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <div className="ml-auto">
                <h3>Curriculum</h3>
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
                <Typography>Curriculum</Typography>
                <Button
                  variant="contained"
                  className="ms-auto"
                  color="primary"
                  onClick={addNewSection}
                >
                  New Section
                </Button>
              </div>
              <div className="col-12  ">
                {!!courseData?.data?.sections_info?.length ? (
                  courseData?.data?.sections_info?.map((data) => (
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
        </form>
      </div>
    </>
  );
};
export default CourseTab2;
