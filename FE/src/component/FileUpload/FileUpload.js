import { Button } from "@mui/material";
import { Upload } from "antd";
import React from "react";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

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
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        defaultFileList={[...fileList]}
        itemRender={(originNode, file, currFileList, actions) => {
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
