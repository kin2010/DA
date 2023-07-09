/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  createGroupSchema,
  createLectureSchema,
} from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { addSection, useCourseService } from "../../hook/LessionHook";
import { Button } from "@mui/material";
import FormControl from "../../component/FormControl";
import { Divider } from "antd";

const GroupAdd = ({ open, setOpen, group }) => {
  const courseService = useCourseService();
  const courseId = sessionStorage.getItem("new_course");

  const handleUpdate = async (value) => {
    const params = {
      id: group?._id,
      body: {
        ...value,
      },
    };
    console.log("upda", params);
    const res = await courseService.updateGroup(params);
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Tạo thành công",
      });
    } else {
      openNotification({
        type: "error",
        message: "Tạo thất bại",
      });
    }
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{ name: group?.name, description: group?.description }}
      onSubmit={(value) => {
        handleUpdate(value);
      }}
      validationSchema={createGroupSchema}
    >
      {(props) => (
        <form
          className="mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.handleSubmit();
          }}
        >
          <FormControl name="name" label={"Tên group*"}></FormControl>
          <div className="mt-3 d-flex justify-content-start">
            <FormControl
              name="description"
              type={"editor"}
              label={"Mô tả*"}
            ></FormControl>

            <Divider></Divider>
          </div>
          <Button size="small" variant="contained" type="submit">
            Update Group
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default GroupAdd;
