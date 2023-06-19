/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { Col, DatePicker, Divider, Modal, Row } from "antd";
import { useCourseService, useGroupService } from "../../../hook/LessionHook";
import { openNotification } from "../../../Notification";
import FormControl from "../../../component/FormControl";
import {
  createGroupSchema,
  createLectureSchema,
  createScheduleSchema,
} from "../../../Validation/CourseCreate";
const { RangePicker } = DatePicker;
const ScheduleMeeting = ({ open, setOpen, group, user }) => {
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const courseService = useCourseService();
  const courseId = sessionStorage.getItem("new_course");
  const handleCancel = () => {
    setOpen(false);
  };
  const groupServices = useGroupService();
  const handeAddSectionSumbit = async (value) => {
    const params = {
      group: group,
      createdby: user,
      name: value?.name,
      ...value,
    };
    const res = await groupServices.addMeeting(params);
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Đặt lịch họp thành công !",
      });
    } else {
      openNotification({
        type: "error",
        message: "Có lỗi, thử lại sau",
      });
    }
    setOpen(false);
  };
  const RangeTimePicker = () => {
    const { setFieldValue, errors } = useFormikContext();

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
      <>
        <RangePicker
          format="YYYY-MM-DD HH:mm"
          showTime
          onChange={handleTimeChange}
        />
        <Row>
          <Col xs={12}>
            {errors["start_time"] && (
              <div className="feedback">{errors["start_time"]}</div>
            )}
          </Col>
          <Col>
            {errors["end_time"] && (
              <div className="feedback">{errors["end_time"]}</div>
            )}
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Formik
      initialValues={{ name: "Cuộc họp mới  " }}
      onSubmit={(value) => handeAddSectionSumbit(value)}
      validationSchema={createScheduleSchema}
    >
      {(props) => (
        <Modal
          open={open}
          title="Cuộc họp mới.."
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={props.handleSubmit}>
            <FormControl name="name" label={"Tên cuộc họp*"}></FormControl>
            <br></br>
            <label className="col-form-label ">
              Thời gian: ( bắt đầu : kết thúc )*
            </label>
            <RangeTimePicker />
            <FormControl
              name="description"
              type={"editor"}
              label={"Mô tả*"}
            ></FormControl>
            <Divider></Divider>
            <div className="mt-3 d-flex justify-content-end">
              <Button
                size="small"
                variant="outlined"
                key="back"
                onClick={handleCancel}
              >
                Close
              </Button>
              <Button
                size="small"
                className="ms-2"
                variant="contained"
                key="submit"
                type="submit"
              >
                Lên lịch
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default ScheduleMeeting;
