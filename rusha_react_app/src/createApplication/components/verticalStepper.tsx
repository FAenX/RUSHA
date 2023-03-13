import {Box, Paper, Stepper, Step, StepLabel, Typography, StepContent, Button } from "@mui/material";
import React from "react";
import { createApplication, createApplicationOptions} from "../../backend_requests";
import { StepProps } from "../../types/create-project-response-type";
import { UserContext } from "../../utils/userProvider";
import steps from "./steps";

export default function VerticalLinearStepper() {

    const [applicationName, setApplicationName] = React.useState<string>('');
    const [dynamicContent, setDynamicContent] = React.useState<StepProps>();
    const [responseData, setResponseData] = React.useState<any>();
    const [error, setError] = React.useState({error: false, message: ""});

    const {user} = React.useContext(UserContext);

    console.log('create_application user :' + JSON.stringify(user));


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setApplicationName(event.target.value);
    };

    React.useEffect(() => {
        ( 
            async()=> {
                const {data} =await createApplicationOptions()
                console.log("create application data " + JSON.stringify(data));
                setDynamicContent(data);
                // setProject(data);
            }
            
        )()
        // call backend to get content
    }, []);

    const handleSubmit = async () => {
      
        try{
          const payload = {
              applicationName: applicationName ? applicationName : "",
              framework: "react",
              projectId : user? user.projectId : "-1",
              description: "test",
              repository: "other",
              tags: "test",
              environmentVariables: "test",
              userId: user? user.id : "-1",
  
          }
            
          const data = await createApplication({...payload});
  
  
          console.log(data);
          setResponseData(data);
  
           
        } catch (error: any) {
            console.log(error.response.data);
            setError({error: true, message: `Error: ${JSON.stringify(error.response.data)}`});
        }
    }
   
        // 
    
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
                        {<step.component 
                        repositories= {dynamicContent?.repositories} 
                        frameworks={dynamicContent?.frameworks}
                        onChange={handleChange} 
                        applicationName={applicationName} 
                        reviewProps={{
                            applicationName: applicationName? applicationName : "", 
                            githubRepo: "Repository not generated", 
                            url: "URL not generated",
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
  