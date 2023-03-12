import {Box, Paper, Stepper, Step, StepLabel, Typography, StepContent, Button } from "@mui/material";
import React from "react";
import { StepProps } from "../../types/create-project-response-type";
import steps from "./steps";

export default function VerticalLinearStepper(props : StepProps) {
    const {repositories, applicationName, onChange, reviewProps, handleSubmit} = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => activeStep==steps.length -1 ? activeStep : prevActiveStep + 1);
    };
  
    const handleBack = () => {
        setActiveStep((prevActiveStep) => activeStep==0 ? activeStep : prevActiveStep - 1);
    };
  
    const handleReset = () => {
        setActiveStep(0);
    };
  
  return (
    <Box sx={{ width: "100%"}}>
        <Paper square elevation={2} sx={{ p: 1, width: 600 }}>
            <Box sx={{ mb: 1, margin: 1 }}>
                { activeStep!==steps.length -1 && <Button
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                >
                Next
                </Button>}
  
                { activeStep!==0 && <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
                >
                Back
                </Button>}
            
        
                { activeStep==steps.length -1 && <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                </Button>}
  
                { activeStep==steps.length -1 && <Button onClick={handleSubmit}  sx={{ mt: 1, mr: 1 }}>
                    Submit
                </Button>}
                </Box>
        </Paper>
      <Stepper activeStep={activeStep} orientation="vertical">
  
        {steps.map((step) => (
  
            <Step key={Math.random()}>
                <StepLabel
                    optional={"select repository"}
                >
                    <Typography variant={"h6"}>
                    {step.label}
                    </Typography>
                </StepLabel>
                <StepContent >
                    <Typography>
                        {<step.component repositories= {repositories} onChange={onChange} applicationName={applicationName} reviewProps={{
                            applicationName: applicationName? applicationName : "", 
                            githubRepo: reviewProps?.githubRepo? reviewProps?.githubRepo : "Repository not generated", 
                            url: reviewProps?.url? reviewProps?.url : "URL not generated",
                        }}  
                        />}
                    </Typography>
                </StepContent>
            </Step>
  
  
        ))}
      </Stepper>
     
        
      
    </Box>
  );
  }
  