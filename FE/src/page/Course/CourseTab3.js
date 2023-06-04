import React, { useState } from "react";
import Uploadd from "../../component/Upload";
import FormControl from "../../component/FormControl";
import { Upload } from "antd";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "../../component/FileUpload/FileUpload";

const CourseTab3 = () => {
  const [fileList, setFileList] = useState([]);

  return (
    <div className="widget-inner">
      {/* <form className={"edit-profile m-b30"} onSubmit={handleSubmit}> */}
      <div className="row">
        <div className="col-12">
          <div className="ml-auto">
            <h3>Media</h3>
          </div>
        </div>
        <div className="col-6 mt-3">
          <label className="col-form-label">Intro Course overview :</label>
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
              multiple
            >
              <Button variant="outlined" icon={<UploadOutlined />}>
                <AddBoxIcon
                  style={{ fontSize: "18px", marginRight: "10px" }}
                ></AddBoxIcon>
                UPLOAD VIDEO
              </Button>
            </Upload>
            <label className="col-form-label">File Format: .mp4</label>
          </div>
        </div>
        <div className="col-6 mt-3">
          <label className="col-form-label">Course thumbnail* :</label>
          <FileUpload
            btnName={"CHOOSE THUMBNAIL"}
            label={"Supports: jpg,jpeg, or png"}
          ></FileUpload>
          {/* <FormControl label={"Course thumbnail*"}></FormControl> */}
        </div>
        <div className="form-group col-6"></div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default CourseTab3;
