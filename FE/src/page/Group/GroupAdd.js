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

  const handleUpdate = async (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("upda");
    const params = {
      id: group?._id,
      body: {
        ...value,
      },
    };
    const res = await courseService.updateGroup(params);
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "Created successfully",
      });
    } else {
      openNotification({
        type: "error",
        message: "Creation failed",
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!!group) {
      //
    }
    console.log(group, 22);
  }, [group]);

  return (
    <Formik
      initialValues={{ name: group?.name, description: group?.description }}
      onSubmit={(e, value) => handleUpdate(e, value)}
      validationSchema={createGroupSchema}
    >
      {(props) => (
        <form
          onSubmit={(e) => {
            e?.preventDefault();
            e?.stopPropagation();
            props.handleSubmit();
          }}
          className="mb-3"
        >
          <FormControl name="name" label={"Group Name*"}></FormControl>
          <div className="mt-3 d-flex justify-content-start">
            <FormControl
              name="description"
              type={"editor"}
              label={"Description*"}
            ></FormControl>

            <Divider></Divider>
          </div>
          <Button
            size="small"
            //   className="ms-2"
            variant="contained"
            type="submit"
          >
            Update Group
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default GroupAdd;
