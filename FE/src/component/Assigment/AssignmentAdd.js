import React, { useState } from "react";
import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  createAssignmentSchema,
  createLectureSchema,
} from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { addSection, useCourseService } from "../../hook/LessionHook";
import FormControl from "../FormControl";
import { Button } from "@mui/material";
import { Divider, Modal, Tabs, Upload } from "antd";
import Uploadd from "../Upload";
import { UploadOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DatePicker, Space } from "antd";
import EditorCommon from "../EdittorCommon/EdittorCommon";
import FileUpload from "../FileUpload/FileUpload";
const { RangePicker } = DatePicker;
const AssignmentAdd = ({ open, setOpen, section }) => {
  const [fileList, setFileList] = useState([]);
  const courseService = useCourseService();
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handeAddSectionSumbit = async (value) => {
    console.log(value);
    const res = await courseService.addAssignment({
      ...value,
      section: section?._id,
    });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Created successfully",
      });
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
    setOpen(false);
  };

  const RangeTimePicker = () => {
    const { setFieldValue } = useFormikContext();

    const handleTimeChange = (date, dateString) => {
      console.log(date, dateString);
      if (!!dateString?.length) {
        const start = dateString[0];
        const end = dateString[1];
        setFieldValue("start_time", start?.toString());
        setFieldValue("end_time", end?.toString());
      }
    };
    return (
      <RangePicker
        format="YYYY-MM-DD HH:mm"
        showTime
        onChange={handleTimeChange}
      />
    );
  };

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(value) => handeAddSectionSumbit(value)}
      validationSchema={createAssignmentSchema}
    >
      {(props) => {
        return (
          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={700}
            title="Add Assignment"
          >
            <form onSubmit={props.handleSubmit} className="mb-3">
              <div className="mt-3 ">
                <FormControl
                  name="name"
                  label={"Assignment Title*"}
                ></FormControl>
                <FormControl name="description" label={"Description*"}>
                  <EditorCommon></EditorCommon>
                </FormControl>
                <br></br>
                <label className="col-form-label ">Time Duration*</label>
                <br></br>
                <RangeTimePicker />
                <br></br>
                <div className="col-6 mb-3">
                  <FormControl
                    name="mark"
                    inputType={"number"}
                    label={"Total Number*"}
                  ></FormControl>
                </div>

                <FileUpload
                  btnName={"ATTACHMENTS"}
                  formName={"attachments"}
                  label={"Supports: jpg, jpeg, png, pdf or .zip"}
                  accept="image/*,.pdf,.zip"
                  multiple
                ></FileUpload>
                {/* <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    defaultFileList={[...fileList]}
                    multiple
                  >
                    <Button variant="outlined" icon={<UploadOutlined />}>
                      <AddBoxIcon
                        style={{ fontSize: "18px", marginRight: "10px" }}
                      ></AddBoxIcon>
                      ATTACHMENTS
                    </Button>
                  </Upload>
                  <label className="col-form-label">
                    Supports: jpg, jpeg, png, pdf or .zip
                  </label> */}

                <div className="d-flex justify-content-end">
                  <Button
                    size="small"
                    className="mt-2"
                    variant="contained"
                    key="submit"
                    type="submit"
                  >
                    Add Assignment
                  </Button>
                </div>
              </div>
            </form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default AssignmentAdd;
