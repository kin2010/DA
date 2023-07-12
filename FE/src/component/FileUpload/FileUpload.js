import { Button, CircularProgress } from "@mui/material";
import { Upload } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { uploadFile } from "../../hook/LessionHook";
import { useFormikContext } from "formik";
import BBackdrop from "../BackDrop";
const FileUpload = ({
  formName,
  btnName,
  label,
  thumbnail,
  init,
  ...props
}) => {
  const cloudaryUploadRef = useRef();
  const widgetRef = useRef();
  const { values, setFieldValue } = useFormikContext();
  const [loading, setLoading] = useState(false);
  const arr =
    init?.map((z) => {
      return {
        name: z,
        status: "done",
        url: z,
      };
    }) || [];
  const [defaultFileList, setDefault] = useState(arr);
  useEffect(() => {
    console.log("render");
  }, []);

  const handleChange = async ({ file, fileList }) => {
    if (fileList.length > 0) {
      console.log(fileList, 2);
      if (fileList?.every((file) => file?.status === "done")) {
        console.log("LÍT FILE", fileList);
        handleUpload(fileList);
      }
    }
  };

  const handleUpload = async (files) => {
    let arr = [];
    setLoading(true);
    if (files?.length) {
      console.log("UP", files?.length);
      for (const file of files) {
        if (file?.originFileObj) {
          const formData = new FormData();
          formData.append("file", file?.originFileObj);
          formData.append("upload_preset", "dzvpbt10");
          formData.append("api_key", "772276885786162");
          const res = await uploadFile(formData);
          console.log(res?.data?.url, 333);
          if (res?.data?.url) {
            if (!!formName) {
              arr.push(res?.data?.url);
            }
          }
        } else {
          arr.push(file?.url);
        }
      }
      setLoading(false);
      setFieldValue(formName, !!arr?.length ? arr : []);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUpload = (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    return isLt10M;
  };

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
      <BBackdrop open={loading} setOpen={setLoading}></BBackdrop>
      <Upload
        defaultFileList={defaultFileList}
        beforeUpload={beforeUpload}
        customRequest={dummyRequest}
        listType="picture"
        itemRender={(originNode, file, currFileList, actions) => {
          console.log(4214141, file);
          if (file?.status === "done") {
            console.log(
              file?.type?.includes("video") || file.url?.includes("webm"),
              "file",
              file
            );
            if (file?.type?.includes("video") || file.url?.includes("webm")) {
              const url = !!file.originFileObj
                ? URL.createObjectURL(file.originFileObj)
                : file.url;
              console.log(url, 9);
              return (
                <>
                  <Player
                    className="mt-3"
                    playsInline
                    poster="/assets/poster.png"
                    src={url}
                  />
                </>
              );
            }
            return (
              <div
                style={{
                  border: "0.5px solid gray",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                className="d-flex align-items-center justify-content-between flex-colum my-2"
              >
                {file?.type?.includes("image") ? (
                  <img alt="thumbnail" src={file?.thumbUrl}></img>
                ) : (
                  <AttachFileIcon
                    color="info"
                    style={{ fontSize: "50px" }}
                  ></AttachFileIcon>
                )}
                <div>
                  {file?.name?.length > 40
                    ? file?.name?.slice(0, 40) + "..."
                    : file?.name}
                </div>
                <Button
                  onClick={() => {
                    actions.remove();
                  }}
                  variant="outlined"
                  color="error"
                >
                  <DeleteSweepIcon></DeleteSweepIcon>
                </Button>
              </div>
            );
          }
        }}
        onChange={handleChange}
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
