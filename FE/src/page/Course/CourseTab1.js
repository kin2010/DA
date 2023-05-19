/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
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

const CourseTab1 = ({ course, setCourse, changeTab, dataTeacher }) => {
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
  const handleChangeEditor = (name, result) => {
    const ne = form;
    ne[name] = result;
    setForm({
      ...ne,
    });
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
  const handleSubmit = async (event) => {
    const f = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (f.checkValidity() === false) {
    } else {
      const data = {
        ...form,
        description: {
          mota: form?.mota,
        },
        teacher: [...ids],
      };
      const res = await courseService.addCourse(data);
      openNotification(res);
      if (res?.status === 200) {
        setCourse(res?.course);
        navigate("/course/create/" + res?.course?._id);
        if (!!changeTab) {
          changeTab(event, "2");
        }
      }
    }
    setValidated(true);
  };

  React.useEffect(() => {
    setForm({
      ...form,
      chapter: [...arrChapter],
    });
  }, [arrChapter]);

  const changee = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e.target?.value,
    });
  };

  return (
    <>
      <TeacherModal
        ids={ids}
        data={dataTeacher}
        changee={clickne}
        open={open}
        setOpen={setOpen}
      ></TeacherModal>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col
            style={{
              paddingRight: "30px",
            }}
            className="w-75"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="labell">Tên khóa học</Form.Label>
              <Form.Control
                required
                type="input"
                name="name"
                onChange={changee}
                placeholder="Tên khóa học"
                value={form.name}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Label className="labell">Mô tả khóa học</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Giới thiệu :</Form.Label>
              <EditorCommon
                name="mota"
                handleChange={handleChangeEditor}
                value={form.mota}
              ></EditorCommon>
            </Form.Group>
            <Form.Label>Chọn ảnh :</Form.Label>
            <Uploadd style={{ width: "299px" }} change={changeFile}></Uploadd>
            <Button
              className="mt-4  me-5"
              variant="primary"
              type="submit"
              size="sm"
            >
              <DataSaverOnIcon color="white" className="me-3" />
              Lưu thay đổi
            </Button>
          </Col>
          <Col className="w-25">
            <div>Teacher</div>
            {!!ids?.length && (
              <List>
                <VirtualList
                  unselectable="off"
                  data={dataTeacher.filter((t) => ids.includes(t?._id))}
                  itemHeight={40}
                  itemKey="email"
                >
                  {(item) => (
                    <>
                      <List.Item key={item?.email}>
                        <List.Item.Meta
                          avatar={<Avatar src={item?.picture?.large} />}
                          title={
                            <a href="https://ant.design">{item?.fullName}</a>
                          }
                        />
                        <CloseIcon
                          onClick={() => clickne(item?._id)}
                        ></CloseIcon>
                      </List.Item>
                    </>
                  )}
                </VirtualList>
              </List>
            )}
            <div
              style={{
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => showModal()}
              className="mt-4 mb-2 d-flex align-items-center"
            >
              <AddIcon className="me-2" />
              ADD NEW TEACHER
            </div>
            <div
              style={{
                background: "#f2f2f3",
                padding: "10px",
                minHeight: "300px",
              }}
            >
              <p>BILL INFORMATION</p>{" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price :</Form.Label>
                <Form.Control
                  // onChange={change}
                  name="price"
                  type="number"
                  placeholder="Price:"
                  defaultValue={1000}
                  min={10}
                />
                {/* <Form.Control type="input" name="yeucau" placeholder="Password" /> */}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Method :</Form.Label>
                <Form.Control
                  // onChange={change}
                  name="price"
                  type="text"
                  placeholder="Method:"
                />
                {/* <Form.Control type="input" name="yeucau" placeholder="Password" /> */}
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CourseTab1;
