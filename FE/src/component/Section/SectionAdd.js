/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLectureSchema } from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { addSection, useCourseService } from "../../hook/LessionHook";
import FormControl from "../FormControl";
import { Button } from "@mui/material";
import { Divider, Modal } from "antd";

const SectionAdd = ({ open, setOpen, section }) => {
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

  const handeAddSectionSumbit = async (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("upda");
    const params = {
      id: section?._ic,
      body: {
        ...value,
      },
    };
    const res = await courseService.updateSection(params);
    if (res?.status === 200) {
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
    if (!!section) {
      //
    }
  }, [section]);

  return (
    <Formik
      initialValues={{ name: section?.name }}
      onSubmit={(e, value) => handeAddSectionSumbit(e, value)}
      validationSchema={createLectureSchema}
    >
      {(props) => (
        <form
          onSubmit={(e) => {
            e?.preventDefault();
            props.handleSubmit();
          }}
          className="mb-3"
        >
          <FormControl name="name" label={"Section Name*"}></FormControl>
          <div className="mt-3 d-flex justify-content-start">
            {/* <Button
              size="small"
              variant="outlined"
              key="back"
              onClick={handleCancel}
            >
              Close
            </Button> */}
            <Button
              size="small"
              //   className="ms-2"
              variant="contained"
              type="submit"
            >
              Update section
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SectionAdd;
