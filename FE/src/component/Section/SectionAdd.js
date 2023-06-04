import React, { useState } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { createLessionSchema } from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { addSection } from "../../hook/LessionHook";
import FormControl from "../FormControl";
import { Button } from "@mui/material";
import { Divider, Modal } from "antd";

const SectionAdd = ({ open, setOpen }) => {
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handeAddSectionSumbit = async (value) => {
    const res = await addSection({ ...value });
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
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(value) => handeAddSectionSumbit(value)}
      validationSchema={createLessionSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="mb-3">
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
              key="submit"
              type="submit"
            >
              Add Section
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SectionAdd;
