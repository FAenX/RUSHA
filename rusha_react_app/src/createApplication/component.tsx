import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { StepProps } from '../types/create-project-response-type';
import { createApplicationPageContentCached } from '../backend_requests';
import { createApplication } from '../backend_requests/applications';
import {steps} from "./components";
import Layout from '../layout';
import {ProgressStepper} from "./components";
import { authenticate } from '../utils/decorators';





function VerticalLinearStepper(props : StepProps) {
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




const Component = authenticate(function()  {
  const [applicationName, setApplicationName] = React.useState<string>('');
  const [content, setContent] = React.useState<StepProps>();
  const [responseData, setResponseData] = React.useState<any>();
  const [error, setError] = React.useState({error: false, message: ""});
  
  


  React.useEffect(() => {
    ( 
        async()=> {
            const {data} =await createApplicationPageContentCached()
            console.log(data);
            setContent(data);
            // setProject(data);/
        }
        
    )()
    // call backend to get content
    }, []);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationName(event.target.value);
    };

    // 
  
    const handleSubmit = async () => {
      
      try{
        const payload = {
            applicationName: applicationName ? applicationName : "",
            framework: "react",
            projectId : "d17d88b4-388d-4679-ad0c-7ba906711989",
            description: "test",
            repository: "other",
            tags: "test",
            environmentVariables: "test",
            userId: "c36f8dcd-39cf-443c-a7f3-319dfc2d835b",

        }
          
        const data = await createApplication({...payload});


        console.log(data);
        setResponseData(data);

         
      } catch (error: any) {
          console.log(error.response.data);
          setError({error: true, message: `Error: ${JSON.stringify(error.response.data)}`});
      }
  }
 

 
  return (
        <Layout >

          
            <Stack className="border" sx={{width: "100%", margin: 5}}>
                
                <Stack sx={{padding: 5}} spacing={2}>
                    <Typography>Back to project</Typography>
                    <Typography>Create App</Typography>

                </Stack>
                {<Stack className="border" sx={{padding: 5}}>
                  <ProgressStepper />
                </Stack>}
                <Stack className="border" sx={{padding: 5}}>
                    <VerticalLinearStepper onChange={handleChange} repositories={content?.repositories} applicationName={applicationName} handleSubmit={handleSubmit}/>
                </Stack>
            </Stack>
  
        </Layout>
  );
});




export default Component;

