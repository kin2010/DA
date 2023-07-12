import React, { useEffect, useState } from "react";
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
const Content = ({ data }) => {
  const { handleSubmit, setFieldValue } = useFormikContext();
  useEffect(() => {
    if (!!data) {
      setFieldValue("name", data?.name);
      setFieldValue("description", data?.description || "");
    } else {
      // resetForm();
    }
  }, [data]);
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mt-3 ">
        <FormControl name="name" label={"Tiêu đề*"}></FormControl>
        <FormControl name="description" label={"Mô tả*"}>
          <EditorCommon></EditorCommon>
        </FormControl>
        <br></br>
        {/* <label className="col-form-label ">Thời gian*</label>
  <br></br>
  <RangeTimePicker />
  <br></br>
  <div className="col-6 mb-3">
    <FormControl
      name="mark"
      inputType={"number"}
      label={"Tổng số điểm:*"}
    ></FormControl>
  </div> */}

        <FileUpload
          btnName={"Đính kèm"}
          formName={"attachments"}
          label={"hỗ trợ: jpg, jpeg, png, pdf or .zip"}
          accept="image/*,.pdf,.zip,.txt"
          multiple
          init={data?.attachments || []}
        ></FileUpload>
        <div className="d-flex justify-content-end">
          <Button
            size="small"
            className="mt-2"
            variant="contained"
            key="submit"
            type="submit"
          >
            Thêm Nhiệm vụ / Bài tập
          </Button>
        </div>
      </div>
    </form>
  );
};
const AssignmentAdd = ({
  open,
  setOpen,
  section,
  isEdit,
  assignmentUpdateId,
}) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState();

  const courseService = useCourseService();
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!!isEdit && !!assignmentUpdateId) {
      init();
    } else {
      setData(null);
    }
  }, [section, isEdit, assignmentUpdateId]);

  const init = async () => {
    const lecture = section?.assignments?.find(
      (lecture) => lecture?._id === assignmentUpdateId
    );
    setData(lecture);
  };
  const handeAddSectionSumbit = async (value) => {
    if (!isEdit) {
      console.log(value);
      const res = await courseService.addAssignment({
        ...value,
        section: section?._id,
      });
      if (!res?.message) {
        openNotification({
          type: "success",
          message: "Tạo thành công",
        });
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
      setOpen(false);
    } else {
      const res = await courseService.updateAssignment({
        ...value,
        id: data?._id,
      });
      if (!res?.message) {
        openNotification({
          type: "success",
          message: "Cập nhật",
        });
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
      setOpen(false);
    }
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
            title="Thêm nhiệm vụ / bài tập"
          >
            <Content data={data} />
          </Modal>
        );
      }}
    </Formik>
  );
};

export default AssignmentAdd;
