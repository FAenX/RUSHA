import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {steps} from ".";


const repositories = [
    {
        name: "Github",
        icon: "G"
    },
    {
        name: "GitLab",
        icon: "G"
    },
    {
        name: "Other",
        icon: "O"
    }
]


export default function VerticalLinearStepper() {
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
      <Stepper activeStep={activeStep} orientation="vertical">

        {steps.map((step, index) => (

            <Step key={step.label}>
                <StepLabel
                    optional={"select repository"}
                >
                    <Typography variant={"h6"}>
                    {step.label}
                    </Typography>
                </StepLabel>
                <StepContent >
                    <Typography>
                        {<step.component repositories={repositories}/>}
                    </Typography>
                </StepContent>
            </Step>


        ))}
      </Stepper>
     
        <Paper square elevation={0} sx={{ p: 3 }}>
            <Box sx={{ mb: 1, margin: 1 }}>
                <Button
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                >
                Next
                </Button>

                <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
                >
                Back
                </Button>
            
        
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                </Button>
                </Box>
        </Paper>
      
    </Box>
  );
}