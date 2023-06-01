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

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const initialValues = {
    name: "",
  };

  return (
    <div className="widget-inner">
      <form className={"course-cr m-b30"} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>1. Basic info</h3>
            </div>
          </div>
          <div className="form-group col-6">
            <div>
              <FormControl label="Course title" name="name"></FormControl>
            </div>
          </div>

          <div className="form-group col-6">
            <label className="col-form-label">Teachers :</label>
            <div>
              <Dropdown data={dataTeacher}></Dropdown>
            </div>
          </div>
          <div className="seperator" />
          <div className="col-12 m-t20">
            <div className="ml-auto m-b5">
              <h3>2. Description</h3>
            </div>
          </div>
          <div className="form-group col-12">
            <label className="col-form-label">Course description</label>
            <div>
              <EditorCommon name="description"></EditorCommon>
            </div>
          </div>
          <div className="form-group col-6">
            <FormControl
              label="What will students learn in your course?*"
              name="target"
            >
              <textarea className="form-control" defaultValue={" "} />
            </FormControl>
          </div>
          <div className="form-group col-6">
            <FormControl label="Requirements*" name="requirement">
              <textarea className="form-control" defaultValue={" "} />
            </FormControl>
          </div>
          <div className="col-12 m-t20">
            <div className="ml-auto">
              <h3 className="m-form__section">3. Add Item</h3>
            </div>
          </div>
          <div className="col-12">
            <table id="item-add" style={{ width: "100%" }}>
              <tbody>
                <tr className="list-item">
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="col-form-label">
                          Course Category
                        </label>
                        <div>
                          <Select
                            style={{ width: "100%" }}
                            native
                            defaultValue=""
                            id="grouped-native-select"
                            label="Grouping"
                            placeholder="Select"
                          >
                            <optgroup label="Category 1">
                              <option value={1}>Option 1</option>
                              <option value={2}>Option 2</option>
                            </optgroup>
                            <optgroup label="Category 2">
                              <option value={3}>Option 3</option>
                              <option value={4}>Option 4</option>
                            </optgroup>
                          </Select>
                        </div>
                      </div>
                      {/* <div className="col-md-2">
                            <label className="col-form-label">Close</label>
                            <div className="form-group">
                              <a className="delete" href="#">
                                <i className="fa fa-close" />
                              </a>
                            </div>
                          </div> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="col-12 mt-5">
            <Button variant="contained" type="submit" className="me-3">
              <i className="fa fa-fw fa-plus-circle" />
              Add Item
            </Button>
            <Button variant="outlined" color="primary" type="reset">
              Save changes
            </Button>
          </div> */}
        </div>
      </form>
    </div>
  );

  return (
    <>
      <TeacherModal
        ids={ids}
        data={dataTeacher}
        changee={clickne}
        open={open}
        setOpen={setOpen}
      ></TeacherModal>
      <h4 className="mb-5">Tạo khóa học: </h4>
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
