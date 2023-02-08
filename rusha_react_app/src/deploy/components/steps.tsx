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
import {BasicTextFields} from ".";
import { Repository, SetActiveStepFunction } from '../../types/create-project-response-type';


interface Props {
    repositories: Repository[]
}


export function Repositories(props: Props) {


  return (
   

              <Stack direction={"row"}> 
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {props.repositories.map((repository) => (
                        <Button variant="outlined" sx={{margin: 2}}>
                        
                        <FormControlLabel value="github" control={
                            <Stack direction={"row"} alignContent={""} justifyContent={"space-between"} >
                                <Radio />     
                            </Stack>
                        
                        } label={
                            <Stack direction={"row"} sx={{width: 200}} spacing={3} alignContent="center" alignItems={"center"}>
                                <Avatar sx={{width: 30, height: 30, margin:2}} variant="rounded">
                                    {repository.icon}
                                </Avatar>
                                {repository.name}
                            </Stack>
                        } />
                    </Button>
                        ))}
                    
                   
                </RadioGroup>
               
              </Stack>
              
              
              
       
  );
}

export function EnvVariables() {
    return (
        <Stack direction={"row"} spacing={3}>
            <Avatar sx={{width: 50, height: 50, margin:1}}>
                G
            </Avatar>
            Github
        </Stack>
    )
}

export function Info() {
    return (
        <Stack direction={"row"} spacing={3}>
              <Typography>
          <Stack direction={"row"} spacing={3}>

              <BasicTextFields />
          </Stack>

          <Box sx={{ mb: 1, margin: 5 }}>
      
         
            
          
        </Box>
      </Typography>
        </Stack>
    )
}

export function Review() {
    return (
        <Stack direction={"row"} spacing={3}>
            <Avatar sx={{width: 50, height: 50, margin:1}}>
                G
            </Avatar>
            Github
        </Stack>
    )
}

const steps =[
    {
        label: "Repositories",
        component: Repositories
    },
    {
        label: "Environment Variables",
        component: EnvVariables
    },
    {
        label: "Info",
        component: Info
    },
    {
        label: "Review",
        component: Review
    }
]

export  default steps;



