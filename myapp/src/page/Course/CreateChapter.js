import React from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Editor from ".";
import { Box, Chip, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateLession from "./CreateLession";
const CreateChapter = () => {
  const [arrlession, setLessions] = useState([]);
  const addLession = () => {
    const add = {
      lession: {},

      index: arrlession.length + 1,
    };
    arrlession.push(add);
    setLessions([...arrlession]);
  };
  const replaceLession = (lession, le) => {
    // const ind = arrlession.findIndex((arr) => arr.index === le.index);
    // const arrz = arrlession;
    // arrz.splice(ind, 1, {
    //   lession,
    //   show: true,
    //   index: le.index,
    // });
    // setLessions({
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
  const changeLession = (id) => {
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
            onClick={addLession}
            style={{ fontSize: "55px" }}
            color="primary"
          />
        </Box>
        <div className="lessions">
          {!!arrlession.length &&
            arrlession.map((le, index) => (
              <div key={le.index}>
                <CreateLession
                  setLe={changeLession}
                  arr={arrlession}
                  data={le}
                ></CreateLession>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateChapter;
