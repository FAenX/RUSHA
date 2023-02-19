import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

interface Props {
    done: boolean;
    started: boolean;

}

interface ProgressSteps {
    step: number;
    message: string;
    type: string;
}

const steps = ['Collect data','Save application data', 'Creating application configs', 'Application created'];

export default function ProgressStepper() {


  
    const [activeStep, setActiveStep] = React.useState(0);
    const [failedStep, setFailedStep] = React.useState<number>();
    const [alertMessage, setAlertMessage] = React.useState();
    const [timer, setTimer] = React.useState(0);
    const [socket, setSocket] = React.useState<any>();
    

    const notification = React.useReducer((state:any, action: any) => {
      return action;
    }, null);
      

    React.useEffect(() => {
      const socket = new WebSocket("ws://localhost:8001/ws/")
      setSocket(socket);
      socket.onopen = () => {
        console.log('connected')
        
        
      }
      socket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log(data.message.step)

          let step = 0;
          // 
          if (data.message.step === "save_application") {
              step = 1;
              setActiveStep(step);
          } else if (data.message.step === "create_git_repo") {
              step = 2;
              setActiveStep(step);
          } else if (data.message.step === "create_nginx_conf") {
              step = 2;
              setActiveStep(step);
          } else if (data.message.step === "completed") {
              step = 4;
              setActiveStep(step);
          }
          // // 

          if (data.message.type === "error") {
            notification[1](data);
            setFailedStep(step);
            setAlertMessage(data.message.message);
          }
         
          else if (data.message.type === "success") {
            setFailedStep(undefined);
            setAlertMessage(undefined);
            notification[1](data);
          }
          else {
            console.log("unknown message")
          }
      }
      socket.onclose = () => {
        console.log('disconnected')
      }
     
      return () => {
        socket.close()
        setSocket(null);
        
      }
    }, []);


    React.useEffect(() => {
        console.log("activeStep", activeStep);
        console.log("failedStep", failedStep);
        console.log("alertMessage", alertMessage);
    }, [activeStep, failedStep, alertMessage]);


    React.useEffect(() => {
      if (socket && socket.readyState === WebSocket.OPEN ) {
        socket.send(JSON.stringify({ 
          request: "get_notifications",
          userId: "c36f8dcd-39cf-443c-a7f3-319dfc2d835b",
        }));
      }
  }, [timer]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
        setTimer(timer + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [timer]);
    

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