/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";
import AddIcon from "@mui/icons-material/Add";
import { useCourseService } from "../../hook/LessionHook";
import { useQueryClient } from "@tanstack/react-query";
import Tab2 from "../Tab2";
import TeacherModal from "../../component/TeacherModal";
import { serviceFetch } from "../../ultis/service";
import { apiURL } from "../../Context/constant";
import VirtualList from "rc-virtual-list";
import { Avatar, List } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AppContextProvider } from "../../Context/AppContext";
import Uploadd from "../../component/Upload";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import EditorCommon from "../../component/EdittorCommon/EdittorCommon";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { courseCreateSchema } from "../../Validation/CourseCreate";
import FormControl from "../../component/FormControl";
import { Button, ButtonBase, InputLabel, Select } from "@mui/material";
import Dropdown from "../../component/Dropdown";
import Chapter from "../../component/Chapter";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
const CourseTab2 = ({ course, setCourse, changeTab, dataTeacher }) => {
  const [validated, setValidated] = React.useState(false);
  const [arrChapter, setArrChapter] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const { openNotification } = React.useContext(AppContextProvider);
  const [open, setOpen] = useState(false);
  const [form, setForm] = React.useState({
    name: "",
    mota: "",
    yeucau: "",
    ketqua: "",
    price: 0,
    doituong: "",
    teacher: [],
    user: [],
    chapter: [],
  });
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();
  const { handleSubmit } = useFormikContext();
  useEffect(() => {
    if (!!course) {
      setForm({
        name: course?.name,
        mota: course?.description?.mota,
        yeucau: course?.yeucau,
        ketqua: course?.ketqua,
        price: course?.price,
      });
    }
  }, [course]);

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
  const changeFile = (file) => {
    setForm({
      ...form,
      file: file.fileList,
    });
  };
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

  return (
    <div className="widget-inner">
      <form className={"edit-profile m-b30"} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>Curriculum</h3>
            </div>
          </div>
          <div className="col-12 mt-3">
            <Accordion
              style={{
                width: "100%",
                padding: "10px 0px",
                border: "0.5px solid #12121220",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Button variant="contained" color="primary">
                    New Section
                  </Button>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ViewListIcon className="me-4" color="primary" />
                <Typography>Curriculum</Typography>
              </AccordionSummary>
              {/* <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails> */}
            </Accordion>
          </div>
          {/* <Chapter></Chapter> */}
          <div className="form-group col-6">
            <FormControl
              label="What will students learn in your course?*"
              name="target"
            >
              <textarea className="form-control" defaultValue={" "} />
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CourseTab2;
