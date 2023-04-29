/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Editor from ".";
import { Box, Chip, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateLession from "./CreateLession";
import LessionDetail from "../../component/LessionDetail";
import CreateChapter from "./CreateChapter";
import Chapter from "../../component/Chapter";
import Menuu from "../../component/Menu";
import { Col, Row, Tabs } from "antd";
import Backk from "../../component/Backk";
import AddIcon from "@mui/icons-material/Add";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import Uploadd from "../../component/Upload";

const CreateCourse = () => {
  const onChange = (key) => {
    console.log(key);
  };

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
            <Backk name="Tạo khóa học"></Backk>

            <Tabs
              defaultActiveKey="1"
              tabBarStyle={{
                marginBottom: "50px",
              }}
              onChange={onChange}
              items={[
                {
                  label: `Chi tiết về khóa học`,
                  key: "x1",
                  children: <CreateCou></CreateCou>,
                },
                {
                  label: `Bài giảng trong khóa học`,
                  key: "x2",
                  children: <Editor></Editor>,
                },
                {
                  label: `Thành phần tham gia`,
                  key: "x3",
                  children: `Thành phần tham gia`,
                },
                {
                  label: `Thời gian biểu`,
                  key: "x4",
                  children: `Thời gian biểu`,
                },
              ]}
            />
            {/* <Box className="  d-flex align-items-center justify-content-between  mt-5">
              <div>
                <Form.Label className="labell me-5 ">Mục lục :</Form.Label>
                <br />
                <Form.Text className="text-muted">Xây dựng đề cương</Form.Text>
              </div>
              <AddBoxIcon
                onClick={addChapter}
                style={{ fontSize: "55px" }}
                color="primary"
              />
            </Box>{" "}
            {!!chapter.length &&
              chapter.map((chap, index) => (
                <Chapter
                  count={index}
                  handleChapter={handleChapter}
                  key={"chap" + index}
                ></Chapter>
              ))} */}
          </Col>
        </Row>

        {/* <div className="chapters">
          <Box className="d-flex align-items-center justify-content-between  mt-5">
            <Form.Label className="labell me-5 ">Bài giảng :</Form.Label>
            <AddBoxIcon
              onClick={addLession}
              style={{ fontSize: "55px" }}
              color="primary"
            />
          </Box>
          {!!arrlession.length &&
            arrlession.map((le, index) => (
              <div key={le.index}>
                <CreateLession
                  setLe={replaceLession}
                  arr={arrlession}
                  data={le}
                ></CreateLession>
              </div>
            ))}
        </div> */}
      </Container>
    </>
  );
};

export default CreateCourse;

export const CreateCou = () => {
  const [validated, setValidated] = React.useState(false);
  const [arrChapter, setArrChapter] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [form, setForm] = React.useState({
    mota: "",
    yeucau: "",
    ketqua: "",
    doituong: "",
    chapter: [],
  });
  const handleChangeEditor = (name, result) => {
    const ne = form;
    ne[name] = result;
    setForm({
      ...ne,
    });
  };
  React.useEffect(() => {
    console.log(22, form);
  }, [form]);
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
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(333);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
    }

    setValidated(true);
  };

  const handleChapter = (chapter) => {
    const c = {
      ...chapter,
      lession: chapter?.lession?.map((le) => le._id) || [],
    };
    console.log("cccc", c);
    const arr = arrChapter;
    const exist = arr.findIndex((ar) => ar.index === chapter.index);
    if (exist > -1) {
      arr[exist] = c;
    } else {
      arr.push(c);
    }
    setArrChapter([...arr]);
  };
  React.useEffect(() => {
    console.log(11, arrChapter, [...arrChapter]);
    setForm({
      ...form,
      chapter: [...arrChapter],
    });
  }, [arrChapter]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col
            style={{
              paddingRight: "30px",
            }}
            className="w-75"
          >
            {" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="labell">Tên khóa học</Form.Label>
              <Form.Control
                required
                type="input"
                name="name"
                placeholder="Tên khóa học"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Label className="labell">Mô tả khóa học</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Giới thiệu :</Form.Label>
              <Editor></Editor>
            </Form.Group>
            {/* <Form.Group
      className="mb-3"
      controlId="formBasicPassword"
    >
      <Form.Label>Yêu cầu của khóa học :</Form.Label>
      <Editor
        name="yeucau"
        handleChange={handleChangeEditor}
      ></Editor>
    </Form.Group>
    <Form.Group
      className="mb-3"
      controlId="formBasicPassword"
    >
      <Form.Label>
        Kết quả mong muốn của khóa học :
      </Form.Label>
      <Editor
        name="ketqua"
        handleChange={handleChangeEditor}
      ></Editor>
    </Form.Group>
    <Form.Group
      className="mb-3"
      controlId="formBasicPassword"
    >
      <Form.Label>
        Đối tượng có thể tham gia :
      </Form.Label>
      <Editor
        name="doituong"
        handleChange={handleChangeEditor}
      ></Editor>
    </Form.Group> */}
            <Form.Label>Chọn ảnh :</Form.Label>
            <Uploadd style={{ width: "299px" }} change={changeFile}></Uploadd>
            <Button
              // onClick={save}
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
            <div
              style={{
                fontSize: "12px",
              }}
              className="mt-4 mb-2 d-flex algin-items-center"
            >
              <AddIcon
                // style={{
                //   fontSize: "32px",
                // }}
                className="me-2"
              />
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
                  defaultValue={0}
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
