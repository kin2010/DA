/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Header from "../Header";
import { Container, Form } from "react-bootstrap";
import { Col, Row } from "antd";
import Menuu from "../../component/Menu";
import Backk from "../../component/Backk";
import Uploadd from "../../component/Upload";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import { getByRole, useCourseService } from "../../hook/LessionHook";
import { AppContextProvider } from "../../Context/AppContext";
import { useQueryClient } from "@tanstack/react-query";
import TeacherModal from "../../component/TeacherModal";
import { serviceFetch } from "../../ultis/service";
import { apiURL } from "../../Context/constant";
import VirtualList from "rc-virtual-list";
import { Avatar, List } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CourseTab1 from "./CourseTab1";
import Tab5 from "../Tab5";
import Tab2 from "../Tab2";
import Tab3 from "../Tab3";
import Tab4 from "../Tab4";
export default function CrCourse() {
  const [value, setValue] = React.useState("1");
  const queryClient = useQueryClient();
  const changeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [course, setCourse] = useState({});
  const [ids, setIds] = useState([]);
  const [dataTeacher, setDataTeacher] = useState([]);
  const router = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();

  const appendData = async () => {
    const res = await getByRole({ role: "teacher" });
    setDataTeacher(res?.users);
  };

  useEffect(() => {
    appendData();
  }, []);

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

  const init = async () => {
    const res = await serviceFetch({
      method: "GET",
      url: "/api/course/" + id,
    });
    if (!res?.message) {
      setCourse(res?.course);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col>
            <Menuu></Menuu>
          </Col>
          <Col
            style={{
              width: "calc(100% - 200px)",
              padding: "0 20px",
            }}
          >
            <Backk desc={course?.name} name="Tạo khóa học"></Backk>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={changeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Chi tiết về khóa học" value="1" />
                    <Tab label="Chương mục" value="2" />
                    <Tab label="Bài giảng" value="3" />
                    <Tab label="Thành phần tham gia" value="4" />
                    <Tab label="Thời gian biểu" value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <CourseTab1
                    course={course}
                    setCourse={setCourse}
                    changeTab={changeTab}
                  ></CourseTab1>
                </TabPanel>
                <TabPanel value="2">
                  <Tab2 course={course}></Tab2>
                </TabPanel>
                <TabPanel value="3">
                  <Tab3 course={course}></Tab3>
                </TabPanel>
                <TabPanel value="4">
                  <Tab4 ids={ids} teacher={dataTeacher}></Tab4>
                </TabPanel>
                <TabPanel value="5">
                  <Tab5></Tab5>
                </TabPanel>
              </TabContext>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
}
