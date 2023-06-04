/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Col, Divider, Row } from "antd";
import AddIcon from "@mui/icons-material/Add";
import { addSection, useCourseService } from "../../hook/LessionHook";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLessionSchema } from "../../Validation/CourseCreate";
import FormControl from "../../component/FormControl";
import { Button, ButtonBase, InputLabel, Select } from "@mui/material";
import Dropdown from "../../component/Dropdown";
import Chapter from "../../component/Chapter";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Modal } from "antd";
import Section from "../../component/Section";
import { openNotification } from "../../Notification";

const CourseTab2 = ({ course, setCourse, changeTab, dataTeacher }) => {
  const [validated, setValidated] = React.useState(false);
  const [arrChapter, setArrChapter] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const clickne = (id) => {
    const copy = ids;
    if (copy.includes(id)) {
      const index = ids.findIndex((a) => a === id);
      copy.splice(index, 1);
      setIds([...copy]);
    } else {
      const cp = ids;
      cp.push(id);
      setIds([...cp]);
    }
  };
  const showModal = () => {
    setOpen(true);
  };

  const courseService = useCourseService();

  const addChapter = () => {
    const add = {
      data: {},

      index: chapter.length + 1,
    };
    chapter.push(add);
    setChapter([...chapter]);
  };
  // const handleSubmit = async (event) => {
  //   const f = event.currentTarget;
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (f.checkValidity() === false) {
  //   } else {
  //     const data = {
  //       ...form,
  //       description: {
  //         mota: form?.mota,
  //       },
  //       teacher: [...ids],
  //     };
  //     const res = await courseService.addCourse(data);
  //     openNotification(res);
  //     if (res?.status === 200) {
  //       setCourse(res?.course);
  //       navigate("/course/create/" + res?.course?._id);
  //       if (!!changeTab) {
  //         changeTab(event, "2");
  //       }
  //     }
  //   }
  //   setValidated(true);
  // };

  const addNewSection = () => {
    console.log("z");
    setOpen(true);
  };

  const handeAddSectionSumbit = async (value) => {
    const res = await addSection({ ...value });
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
        validationSchema={createLessionSchema}
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
              <Section></Section>
            </div>
            <div className="form-group col-6"></div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CourseTab2;
