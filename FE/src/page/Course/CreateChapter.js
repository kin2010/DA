import React from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Editor from ".";
import { Box, Chip, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateLecture from "./CreateLecture";
const CreateChapter = () => {
  const [arrlession, setLectures] = useState([]);
  const addLecture = () => {
    const add = {
      lession: {},

      index: arrlession.length + 1,
    };
    arrlession.push(add);
    setLectures([...arrlession]);
  };
  const replaceLecture = (lession, le) => {
    // const ind = arrlession.findIndex((arr) => arr.index === le.index);
    // const arrz = arrlession;
    // arrz.splice(ind, 1, {
    //   lession,
    //   show: true,
    //   index: le.index,
    // });
    // setLectures({
    //   ...arrz,
    // });
  };
  const [chapter, setChapter] = useState({
    name: "",
    lession: [],
  });
  const change = (e) => {
    setChapter({
      ...chapter,
      name: e?.target?.value,
    });
  };
  const changeLecture = (id) => {
    const arr = chapter.lession;
    arr.push(id);
    setChapter({
      ...chapter,
      lession: [...arr],
    });
  };
  return (
    <div>
      <div className="">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="input"
            name="name"
            placeholder="Tên chương"
            onChange={change}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Box className="d-flex align-items-center justify-content-between  mt-5">
          <Form.Label className="labell me-5 ">Bài giảng :</Form.Label>
          <AddBoxIcon
            onClick={addLecture}
            style={{ fontSize: "55px" }}
            color="primary"
          />
        </Box>
        <div className="lessions">
          {!!arrlession.length &&
            arrlession.map((le, index) => (
              <div key={le.index}>
                <CreateLecture
                  setLe={changeLecture}
                  arr={arrlession}
                  data={le}
                ></CreateLecture>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateChapter;
