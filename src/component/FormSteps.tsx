import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Alert,Card,FormControlLabel,Snackbar,Stack,Switch,} from "@mui/material";
import FormGenerator from "./FormGenerator";
import { initialForms } from "./controllerData";
import Report from "./Report";
// hold label of steps
const steps = ["Income_Details", "Deduction"];

export default function FormSteps() {
  // store state of forms ui & error and there value and other props of textField
  const [forms, setForms] = React.useState<any>(initialForms);
  // current step counter
  const [activeStep, setActiveStep] = React.useState(0);
  // error toast switch
  const [open, setOpen] = React.useState(false);
  // completed verifier
  const [completed, setCompleted] = React.useState<{[k: number]: boolean}>({});
// total steps return
  const totalSteps = () => {return steps.length;};
// handle closeing of toast
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // check completed steps
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
// check this is last step or not
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
// all complete verifier
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
// form next handler
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
// form back handler
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
//form step handler
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  
  // toast opener
  const handleClick = () => {
    setOpen(true);
  };

  // verify to current form complted or not
  const handleComplete = () => {
    const newCompleted = completed;
    let arr = forms[steps[activeStep]].filter((item: any) => {
      return item.error || (item.required && item.value === "");
    });
    if (!(arr.length > 0)) {
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    } else {
      handleClick();
    }
  };

  const handleGoBack = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "0px auto" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label} (Annually)
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - Here is your report:
            </Typography>
            <Report forms={forms} />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleGoBack}>Go Back</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Card sx={{ margin: "10px", padding: "10px 10px" }}>
              <Typography sx={{ m: 2 }}>
                {steps[activeStep].toUpperCase().replaceAll("_", " ")} FORM:
              </Typography>
              <FormGenerator
                forms={forms}
                setForms={setForms}
                currentForm={steps[activeStep]}
              />
            </Card>
            {steps[activeStep] === "Income_Details" && (
              <FormControlLabel
                sx={{ marginLeft: "15px" }}
                value="Do You live in metro city?"
                control={
                  <Switch
                    onChange={(e) =>
                      setForms({ ...forms, metrocity: !forms.metrocity })
                    }
                    checked={forms.metrocity}
                  />
                }
                label="Do You live in metro city ?"
                labelPlacement="end"
              />
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Button>Step {activeStep + 1} already completed</Button>
                ) : (
                  <Button onClick={handleComplete} variant="contained">
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please fill valid details in all required inputs!
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
