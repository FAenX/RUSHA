import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

const resources = [
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%"}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        
          <Step >
            <StepLabel
              optional={"select repository"}
            >
              <Typography variant={"h6"}>
                Resources
                </Typography>
            </StepLabel>
            <StepContent sx={{padding: 5}}>


              <Stack direction={"row"}> 
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {resources.map((resource) => (
                        <Button variant="outlined" sx={{margin: 2}}>
                        
                        <FormControlLabel value="github" control={
                            <Stack direction={"row"} alignContent={""} justifyContent={"space-between"} >
                                <Radio />     
                            </Stack>
                        
                        } label={
                            <Stack direction={"row"} sx={{width: 200}} spacing={3} alignContent="center" alignItems={"center"}>
                                <Avatar sx={{width: 30, height: 30, margin:2}} variant="rounded">
                                    {resource.icon}
                                </Avatar>
                                {resource.name}
                            </Stack>
                        } />
                    </Button>
                        ))}
                    
                   
                </RadioGroup>
               
              </Stack>
              
              
              <Box sx={{ mb: 1, margin: 5 }}>
                
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                
              </Box>
            </StepContent>
          </Step>

            <Step>
            <StepLabel
                optional={"Project Name"}
            >
                <Typography variant={"h6"}>
                    Environment Variables
                </Typography>
            </StepLabel>
            <StepContent sx={{padding: 5}}>
                <Typography>
                    <Stack direction={"row"} spacing={3}>
                        <Avatar sx={{width: 50, height: 50, margin:1}}>
                            G
                        </Avatar>
                        Github
                    </Stack>
                </Typography>
                </StepContent>
            </Step>

            <Step>
            <StepLabel
                optional={"Review and create"}
            >
                <Typography variant={"h6"}>
                    Review
                </Typography>
            </StepLabel>
            <StepContent sx={{padding: 5}}>
                <Typography>
                    <Stack direction={"row"} spacing={3}>
                        <Avatar sx={{width: 50, height: 50, margin:1}}>
                            G
                        </Avatar>
                        Github
                    </Stack>
                </Typography>
                </StepContent>
            </Step>
        
      </Stepper>
     
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      
    </Box>
  );
}