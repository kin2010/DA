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
const FileUpload = ({ formName, btnName, label, thumbnail, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const cloudaryUploadRef = useRef();
  const widgetRef = useRef();
  const { values, setFieldValue } = useFormikContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    cloudaryUploadRef.current = window.cloudinary;
    widgetRef.current = cloudaryUploadRef.current.createUploadWidget(
      {
        cloudName: "drvb2kjug",
        uploadPreset: "dzvpbt10",
      },
      function (error, result) {
        if (!error && result && result?.event === "success") {
          // const imageUrl = result.info.secure_url;
        }
      }
    );
  }, []);

  // useEffect(() => {
  //   if (!!values[formName]?.length) {
  //     console.log(22, values[formName]);
  //     setFileList([
  //       {
  //         uid: "-1",
  //         name: values[formName][0],
  //         status: "done",
  //         url: values[formName][0],
  //       },
  //     ]);
  //   }
  // }, [values[formName]]);

  const handleChange = async ({ file, fileList }) => {
    if (fileList.length > 0) {
      if (fileList?.every((file) => file?.status === "done")) {
        handleUpload(fileList);
      }
    }
    // if (file.status === "done") {
    //   const formData = new FormData();
    //   formData.append("file", file?.originFileObj);
    //   formData.append("upload_preset", "dzvpbt10");
    //   formData.append("api_key", "772276885786162");
    //   const res = await uploadFile(formData);
    //   if (res?.data?.url) {
    //     console.log(res?.data?.url);
    //     if (!!formName) {
    //       setFieldValue(formName, res?.data?.url);
    //     }
    //   }
    // }
  };

  const handleUpload = async (files) => {
    let arr = [];
    setLoading(true);
    if (files?.length) {
      for (const file of files) {
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
        beforeUpload={beforeUpload}
        customRequest={dummyRequest}
        listType="picture"
        defaultFileList={[...fileList]}
        itemRender={(originNode, file, currFileList, actions) => {
          if (file?.type?.includes("video") || file.url?.includes("webm")) {
            const reader = new FileReader();
            const url = !!file.originFileObj
              ? URL.createObjectURL(file.originFileObj)
              : file.url;
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
              <div>{file?.name}</div>
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
        }}
        {...props}
        onChange={handleChange}
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
