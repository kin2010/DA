/* eslint-disable no-lone-blocks */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconBreadcrumbs from "../BreadCrumb";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import CourseTab1 from "../../../page/Course/CourseTab1";
import {
  addCourse,
  getAllCategories,
  getByRole,
  useCourseService,
} from "../../../hook/LessionHook";
import { useEffect } from "react";
import { Formik, useFormik } from "formik";
import { courseCreateSchema } from "../../../Validation/CourseCreate";
import CourseTab2 from "../../../page/Course/CourseTab2";
import CourseTab3 from "../../../page/Course/CourseTab3";
import CourseTab4 from "../../../page/Course/CourseTab4";
import CourseTab5 from "../../../page/Course/CourseTab5";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { openNotification } from "../../../Notification";
import { AuthContextProvider } from "../../../Context/AuthContext";

const steps = ["BASIC", "CURRICULUMN", "MEDIA", "PRICE", "PUBLIC"];

export const COURSE_CREATE_QUERY = ["new_course"];

export default function AdminCourse() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = React.useState({});
  const [course, setCourse] = useState({});
  const [teacher, setTeacher] = useState([]);
  const handleStep = (step) => {
    setStep(step, true);
  };
  const queryClient = useQueryClient();
  const { data } = useQuery(["categories"], getAllCategories);
  const courseService = useCourseService();
  const courseData = courseService.get();
  const initialValues = {
    name: "",
  };
  const userData = queryClient.getQueryData(["user"]);
  console.log(userData);
  const appendData = async () => {
    const res = await getByRole({ role: "Teacher" });
    setTeacher(res?.users);
  };

  useEffect(() => {
    appendData();
  }, []);

  const isLastStep = () => {
    return step === steps.length - 1;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === steps.length;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : step + 1;
    setStep(newActiveStep);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[step] = true;
    setCompleted(newCompleted);
    handleNext();
    if (step === 0) {
    }
  };

  const onSubmit = async (value) => {
    console.log(22, courseData);
    if (!!courseData?.data?._id) {
      const res = await courseService.updateCourse({
        id: courseData?.data?._id,
        body: value,
      });
      if (res?.status === 200) {
        openNotification({
          type: "success",
          message: "SAVED",
        });
        sessionStorage.setItem("new_course", courseData?.data?._id);
        setTimeout(() => {
          setStep(step + 1);
        }, 2000);
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
    } else {
      const res = await addCourse({ ...value, owner: userData?.user?._id });
      if (res?.status === 200) {
        openNotification({
          type: "success",
          message: "SAVED",
        });
        sessionStorage.setItem("new_course", res?.data?._id);
        setTimeout(() => {
          setStep(step + 1);
        }, 2000);
      } else {
        openNotification({
          type: "error",
          message: res?.message,
        });
      }
    }
  };

  return (
    <main className="ttr-wrapper">
      <div className="container-fluid">
        <IconBreadcrumbs></IconBreadcrumbs>
        <div className="row">
          <div className="col-lg-12 m-b30">
            <div className="widget-box">
              <div className="wc-title">
                <h4>Create New Course</h4>
              </div>
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel onClick={() => handleStep(index)}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Formik
                  initialValues={initialValues}
                  validationSchema={courseCreateSchema}
                  onSubmit={(value) => onSubmit(value)}
                >
                  {(props) => (
                    <>
                      {step === 0 && (
                        <CourseTab1
                          course={course}
                          setCourse={setCourse}
                          dataTeacher={teacher}
                        ></CourseTab1>
                      )}
                      {step === 1 && (
                        <CourseTab2
                          course={course}
                          setCourse={setCourse}
                          dataTeacher={teacher}
                          setStep={setStep}
                        ></CourseTab2>
                      )}
                      {step === 2 && (
                        <CourseTab3
                          course={course}
                          setCourse={setCourse}
                          dataTeacher={teacher}
                          setStep={setStep}
                          step={step}
                        ></CourseTab3>
                      )}
                      {step === 3 && (
                        <CourseTab4
                          course={course}
                          setCourse={setCourse}
                          dataTeacher={teacher}
                        ></CourseTab4>
                      )}
                      {step === 4 && (
                        <CourseTab5
                          course={course}
                          setCourse={setCourse}
                          dataTeacher={teacher}
                        ></CourseTab5>
                      )}
                    </>
                  )}
                </Formik>
                <div>
                  <React.Fragment>
                    <Box
                      sx={{ display: "flex", flexDirection: "row", p: "30px" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={step === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        PREVIOUS
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                      >
                        NEXT
                      </Button>
                    </Box>
                  </React.Fragment>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
{
  /* {step !== steps.length &&
                        (completed[step] ? (
                          <Typography
                            variant="caption"
                            sx={{ display: "inline-block" }}
                          >
                            Step {step + 1} already completed
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete}>
                            {completedSteps() === step.length - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))} */
}
