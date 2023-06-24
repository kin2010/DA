import React, { useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import { AppBar, Divider, Typography } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Empty, Popconfirm } from "antd";
import SectionAdd from "./SectionAdd";
import LectureAdd from "../Lecture/Lecture";
import AssignmentAdd from "../Assigment/AssignmentAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { openNotification } from "../../Notification";
import { useQueryClient } from "@tanstack/react-query";
import { useCourseService } from "../../hook/LessionHook";
const Section = ({ propData }) => {
  const queryClient = useQueryClient();
  const courseService = useCourseService();
  const [showEdit, setShowEdit] = useState(false);
  const [showLecture, setShowLecture] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [lectureUpdateId, setLectureUpdateId] = useState();
  const [assignmentUpdateId, setAssignmentUpdateId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAssigment, setIsEditassignment] = useState(false);
  const edit = () => {
    setShowEdit(!showEdit);
  };

  const handleShow = (tab) => {
    if (tab === "1") {
      setIsEdit(false);
      setShowLecture(true);
    } else if (tab === "3") {
      setIsEdit(false);
      setShowAssessment(true);
    }
  };
  const remove = async (id) => {
    const res = await courseService.deleteGroupMutation({
      id: id,
      type: "section",
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
    }
  };
  const removeLecture = async (type, id) => {
    console.log(type, id);
    const res = await courseService.deleteGroupMutation({
      id: id,
      type: type,
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
    }
  };
  const editLecture = (type, id) => {
    if (type === "lecture") {
      setShowLecture(true);
      setLectureUpdateId(id);
      setIsEdit(true);
    }
    if (type === "assignment") {
      setShowAssessment(true);
      setAssignmentUpdateId(id);
      setIsEditassignment(true);
    }
  };
  return (
    <>
      <LectureAdd
        section={propData?.section}
        open={showLecture}
        setOpen={setShowLecture}
        isEdit={isEdit}
        lectureUpdateId={lectureUpdateId}
      />
      <AssignmentAdd
        section={propData?.section}
        open={showAssessment}
        setOpen={setShowAssessment}
        isEdit={isEditAssigment}
        assignmentUpdateId={assignmentUpdateId}
      />
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
              {propData?.section?.name}
            </Typography>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0 10px", marginLeft: "auto" }}
            >
              <EditNoteIcon onClick={edit} color="primary"></EditNoteIcon>
              <Popconfirm
                title="Xác nhận"
                description="Bạn chắc chắn muốn xóa ?"
                onConfirm={() => remove(propData?.section?._id)}
                onOpenChange={() => console.log("open change")}
              >
                <span>
                  <DeleteSweepIcon color="error"></DeleteSweepIcon>
                </span>
              </Popconfirm>
            </div>
          </div>
          <Divider></Divider>
          <div className="py-2">
            {showEdit && (
              <SectionAdd
                open={showEdit}
                setOpen={setShowEdit}
                section={propData?.section}
              ></SectionAdd>
            )}
            {!!propData?.data?.length ? (
              <>
                {propData?.data?.map((value) => (
                  <div
                    key={value?.item?._id}
                    style={{
                      background: "#f7f7f7",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                    className="mb-3 d-flex align-items-center"
                  >
                    {value?.type === "lecture" && (
                      <DescriptionIcon
                        color="info"
                        className="me-3"
                      ></DescriptionIcon>
                    )}
                    {value?.type === "assignment" && (
                      <AssignmentIcon
                        color="success"
                        className="me-3"
                      ></AssignmentIcon>
                    )}
                    {value?.item?.name}
                    <div
                      className="d-flex align-items-center ms-3"
                      style={{ gap: "0 10px" }}
                    >
                      <EditNoteIcon
                        onClick={() =>
                          editLecture(value?.type, value?.item?._id)
                        }
                        color="primary"
                      ></EditNoteIcon>
                      <Popconfirm
                        title="Xác nhận"
                        description="Bạn chắc chắn muốn xóa ?"
                        onConfirm={() =>
                          removeLecture(value?.type, value?.item?._id)
                        }
                        onOpenChange={() => console.log("open change")}
                      >
                        <span>
                          <DeleteSweepIcon color="error"></DeleteSweepIcon>
                        </span>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Empty />
            )}
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
            Bài học
          </div>
          {/* <div style={{ cursor: "pointer" }} onClick={() => handleShow("2")}>
            <AddBoxIcon fontSize="10" className="mr-3"></AddBoxIcon>
            Quiz
          </div> */}
          <div style={{ cursor: "pointer" }} onClick={() => handleShow("3")}>
            <AddBoxIcon fontSize="10" className="mr-3"></AddBoxIcon>
            Nhiệm vụ/ Bài tập
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
