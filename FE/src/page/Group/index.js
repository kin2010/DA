import { Divider, Empty } from "antd";
import React, { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReorderIcon from "@mui/icons-material/Reorder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Typography } from "@mui/material";
import GroupAdd from "./GroupAdd";

const Group = ({ propData }) => {
  const [showEdit, setShowEdit] = useState(false);

  const edit = () => {
    setShowEdit(!showEdit);
  };

  const remove = () => {};
  return (
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
            {propData?.name}
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
            <GroupAdd
              open={showEdit}
              setOpen={setShowEdit}
              group={propData}
            ></GroupAdd>
          )}

          <p dangerouslySetInnerHTML={{ __html: propData?.description }}></p>
          {/* 
          <Empty /> */}
        </div>
      </div>
    </div>
  );
};

export default Group;
