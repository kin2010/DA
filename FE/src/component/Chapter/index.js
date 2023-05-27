/* eslint-disable react-hooks/exhaustive-deps */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateLession from "../../page/Course/CreateLession";
import { Divider } from "antd";
import Lession from "../Lession";
export default function Chapter({ count, name, lession, handleChapter }) {
  const [show, setShow] = useState(false);
  const [index] = useState(count);
  const [chapter, setChapter] = React.useState({
    name: "",
    lession: [],
    index: count,
  });
  const [arrlession, setLessions] = useState([]);

  const change = (e) => {
    setChapter({
      ...chapter,
      [e.target.name]: e?.target?.value,
    });
  };
  const addLession = () => {
    const add = {
      lession: {},

      index: arrlession.length + 1,
    };
    arrlession.push(add);
    setLessions([...arrlession]);
  };
  const changeLession = (id) => {
    const arr = chapter.lession;
    arr.push(id);
    setChapter({
      ...chapter,
      index: index,
      lession: [...arr],
    });
  };
  const save = () => {
    setShow(!show);
  };
  useEffect(() => {
    // handleChapter(chapter);
  }, [chapter]);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          className="acc_header"
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ViewListIcon className="me-4" color="primary" />
          <Typography className="w-100 chapter">
            {!show ? (
              <>
                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
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
                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="input"
                    name="desc"
                    placeholder="Mô tả"
                    onChange={change}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button
                  onClick={save}
                  className="mt-1 me-5"
                  variant="primary"
                  type="submit"
                >
                  <DataSaverOnIcon color="white" className="me-3" />
                  Lưu
                </Button>
              </>
            ) : (
              <div style={{ textTransform: "uppercase" }}>{chapter.name}</div>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="chapter-intro mt-2">
            {show && chapter.desc}
          </Typography>
          <Divider></Divider>
          <PostAddIcon
            onClick={addLession}
            style={{ fontSize: "35px" }}
            color="primary"
          />
          <Divider></Divider>
          {/* <div className="lessions">
            <Lession className="lession"></Lession>
            <Lession className="lession"></Lession>
            <Lession className="lession"></Lession>
            <Lession className="lession"></Lession>
          </div> */}
          <div className="lessions">
            {!!arrlession.length &&
              arrlession.map((le, index) => (
                <div key={le.index}>
                  <CreateLession
                    count={index}
                    setLe={changeLession}
                    arr={arrlession}
                    data={le}
                  ></CreateLession>
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
