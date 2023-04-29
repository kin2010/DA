import { Avatar, List } from "antd";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "./index.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Person2Icon from "@mui/icons-material/Person2";

{
  /* <Avatar src="https://joeschmoe.io/api/v1/random" /> */
}

const Des = ({ view, time, member }) => {
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
          <Typography fontSize={14}> {time || "__"} phút</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0 10px",
            alignItems: "center",
          }}
        >
          <Person2Icon color="primary" />
          <Typography fontSize={14}>{member || "__"} học viên</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0 10px",
            alignItems: "center",
          }}
        >
          <RemoveRedEyeIcon color="primary" />
          <Typography fontSize={14}>{view || "__"}</Typography>
        </Box>
      </Box>
    </>
  );
};
const Lession = ({ name, time, view, member }) => {
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
            title={<a href="https://ant.design">{item.title}</a>}
            description={<Des time={time} view={view} member={member} />}
          />
        </List.Item>
      )}
    />
  );
};

export default Lession;
