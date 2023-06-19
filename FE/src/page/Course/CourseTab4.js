import React, { useState } from "react";
import FormControl from "../../component/FormControl";
import { InputNumber, Switch } from "antd";
import { Formik, useFormikContext } from "formik";
import { openNotification } from "../../Notification";
import { useCourseService } from "../../hook/LessionHook";
import { Button } from "@mui/material";

const CourseTab4 = ({ setStep, step }) => {
  const courseService = useCourseService();
  const courseId = sessionStorage.getItem("new_course");
  const [disabled, setDisabled] = useState(false);
  const handeAddLessonSumbit = async (value) => {
    console.log(value);
    const res = await courseService.updateCourse({
      id: courseId,
      body: value,
    });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "SAVED",
      });
      // sessionStorage.setItem("new_course",courseId);
      setTimeout(() => {
        setStep(step + 1);
      }, 2000);
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };

  const SWitchPrice = () => {
    const { setFieldValue } = useFormikContext();

    const onChange = (value) => {
      setDisabled(value);
      if (!!value) {
        setFieldValue("price", 0);
      }
    };
    return <Switch defaultChecked onChange={onChange} />;
  };

  return (
    <div>
      <Formik
        initialValues={{ price: 0, discount: 0 }}
        onSubmit={(value) => handeAddLessonSumbit(value)}
      >
        {(props) => (
          <div className="widget-inner">
            <form
              className={"edit-profile m-b30"}
              onSubmit={props.handleSubmit}
            >
              <div className="row">
                <div className="col-12">
                  <div className="ml-auto">
                    <h3>Price</h3>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label className="col-form-label me-5">Free :</label>
                  <SWitchPrice></SWitchPrice>
                  <div className="col-6 mt-3">
                    <FormControl
                      prefix="VND"
                      disabled={disabled}
                      name="price"
                      label={"Discount Price*"}
                      type="input_number"
                    ></FormControl>
                  </div>
                  <div className="col-6 mt-3">
                    <FormControl
                      prefix="VND"
                      disabled={disabled}
                      name="discount"
                      label={"Discount Price*"}
                      type="input_number"
                    ></FormControl>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <Button variant="contained" color="primary" type="submit">
                  Save changes
                </Button>
                <Button
                  className="ms-3"
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CourseTab4;
