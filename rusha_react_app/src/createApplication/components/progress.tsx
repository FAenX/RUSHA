import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

interface Props {
    activeStep?: number;
    failedStep?: number;
    alertMessage?: string;

}

const steps = ['Collect data','Save application data', 'Creating application configs', 'Application created'];

export default function ProgressStepper(props: Props) {
    const {activeStep, failedStep, alertMessage} = props;
    

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (failedStep === index) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                {alertMessage}
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}