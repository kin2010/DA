import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const CourseStep = ({ step, setStep, completed, handeSumbit }) => {
  const handleBack = () => {
    setStep(step - 1);
  };

  const isLastStep = () => {
    return step === step.length - 1;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === step.length;
  };
  const handleNext = async () => {
    if (!!handeSumbit) {
      await handeSumbit();
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? step.findIndex((step, i) => !(i in completed))
        : step + 1;
    setStep(newActiveStep);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", p: "30px" }}>
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
  );
};

export default CourseStep;
