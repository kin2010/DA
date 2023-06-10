import { Button } from "@mui/material";
import { Upload } from "antd";
import React from "react";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
const FileUpload = ({ btnName, label, thumbnail, ...props }) => {
  const [fileList, setFileList] = useState([]);

  return (
    <div
      className="p-3 text-center"
      style={{
        border: "2px dashed #757575",
        minHeight: "200px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <Upload
        listType="picture"
        defaultFileList={[...fileList]}
        itemRender={(originNode, file, currFileList, actions) => {
          console.log(file);
          if (file?.type?.includes("video")) {
            const reader = new FileReader();
            console.log(file);
            const url = URL.createObjectURL(file.originFileObj);
            return (
              <Player
                className="mt-3"
                playsInline
                poster="/assets/poster.png"
                src={url}
              />
            );
          }
          return (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img alt="thumbnail" src={file?.thumbUrl}></img>
              <Button
                onClick={() => {
                  actions.remove();
                }}
                variant="outlined"
                color="error"
              >
                <DeleteSweepIcon></DeleteSweepIcon>
                Remove
              </Button>
            </div>
          );
        }}
        {...props}
      >
        <Button variant="outlined" icon={<UploadOutlined />}>
          <AddBoxIcon
            style={{ fontSize: "18px", marginRight: "10px" }}
          ></AddBoxIcon>
          {btnName}
        </Button>
      </Upload>
      <label className="col-form-label">{label}</label>
    </div>
  );
};

export default FileUpload;
