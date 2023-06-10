import { Avatar, List } from "antd";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "./index.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Link, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Person2Icon from "@mui/icons-material/Person2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
{
  /* <Avatar src="https://joeschmoe.io/api/v1/random" /> */
}

const Des = ({
  view,
  time,
  member,
  isEdit,
  setUpdateLectureId,
  lession,
  setIsShowLecture,
}) => {
  const { _id } = lession;
  const handleEdit = () => {
    setIsShowLecture(true);
    setUpdateLectureId(_id);
  };
  const handleRemove = (id) => {
    //
  };
  return (
    <>
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0 0 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "0 10px",
            alignItems: "center",
          }}
        >
          <PlayCircleOutlineIcon color="primary" />
          <Typography style={{ flexShrink: 0 }} fontSize={14}>
            {" "}
            {time || "__"} phút
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0 10px",
            alignItems: "center",
          }}
        >
          <Person2Icon color="primary" />
          <Typography style={{ flexShrink: 0 }} fontSize={14}>
            {member || "__"} học viên
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0 10px",
            alignItems: "center",
          }}
        >
          <RemoveRedEyeIcon color="primary" />
          <Typography style={{ flexShrink: 0 }} fontSize={14}>
            {view || "__"}
          </Typography>
        </Box>
        {isEdit && (
          <Box
            sx={{
              display: "flex",
              gap: "0 10px",
              alignItems: "center",
            }}
          >
            <EditNoteIcon onClick={handleEdit} color="success" />
            <DeleteIcon onClick={handleRemove} color="error" />
          </Box>
        )}
      </Box>
    </>
  );
};
const Lecture = (props) => {
  const { lession, isEdit, setUpdateLectureId, setIsShowLecture } = props;
  const { name, time, view, member, _id } = lession;
  const data = [
    {
      title: name,
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      className="less"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<BorderColorIcon color="success" />}
            title={<Link href={`/lession/${_id}`}>{item.title}</Link>}
            description={
              <Des
                time={time}
                view={view}
                member={member}
                isEdit={isEdit}
                lession={lession}
                setUpdateLectureId={setUpdateLectureId}
                setIsShowLecture={setIsShowLecture}
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

export default Lecture;
