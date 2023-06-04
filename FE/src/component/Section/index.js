import React, { useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import { AppBar, Divider, Typography } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Empty } from "antd";
import SectionAdd from "./SectionAdd";
import LectureAdd from "../Lecture/Lecture";
import AssignmentAdd from "../Assigment/AssignmentAdd";
const Section = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showLecture, setShowLecture] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const edit = () => {
    setShowEdit(!showEdit);
  };

  const remove = () => {};

  const handleShow = (tab) => {
    if (tab === "1") {
      setShowLecture(true);
    } else if (tab === "3") {
      setShowAssessment(true);
    }
  };

  return (
    <>
      <LectureAdd open={showLecture} setOpen={setShowLecture} />
      <AssignmentAdd open={showAssessment} setOpen={setShowAssessment} />
      <div>
        <div
          style={{
            width: "100%",
            border: "0.5px solid #12121220",
            background: "white",
            padding: "15px",
          }}
        >
          <div
            className="d-flex align-items-center  col-12"
            style={{
              borderBottom: "0.5px solid #12121220",
              background: "white",
              paddingBottom: "15px",
            }}
          >
            <ReorderIcon className="me-4" color="primary" />
            <Typography fontWeight={600} fontSize={14}>
              Curriculum
            </Typography>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0 10px", marginLeft: "auto" }}
            >
              <EditNoteIcon onClick={edit} color="primary"></EditNoteIcon>
              <DeleteSweepIcon onClick={remove} color="error"></DeleteSweepIcon>
            </div>
          </div>
          <Divider></Divider>
          <div className="py-2">
            {showEdit && (
              <SectionAdd open={showEdit} setOpen={setShowEdit}></SectionAdd>
            )}
            <Empty />
          </div>
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            gap: "0 30px",
            background: "#1976d2",
            padding: "10px 14px",
            color: "white",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={() => handleShow("1")}>
            <AddBoxIcon fontSize="10" className="mr-3"></AddBoxIcon>
            Lecture
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => handleShow("2")}>
            <AddBoxIcon fontSize="10" className="mr-3"></AddBoxIcon>
            Quiz
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => handleShow("3")}>
            <AddBoxIcon fontSize="10" className="mr-3"></AddBoxIcon>
            Assignment
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
