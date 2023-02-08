import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { Repository, SetActiveStepFunction, StepProps } from '../../types/create-project-response-type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';



export function Repositories(props: StepProps) {
    const {onChange, repositories} = props;


  return (
   

              <Stack direction={"row"}> 
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {repositories && repositories.map((repository) => (
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

export function EnvVariables(props: StepProps) {
    return (
        <Stack direction={"row"} spacing={3}>
            <Avatar sx={{width: 50, height: 50, margin:1}}>
                G
            </Avatar>
            Github
        </Stack>
    )
}

export function Info(props: StepProps) {
    const {onChange, applicationName} = props;
    return (
        <Stack direction={"row"} spacing={3}>
              <Typography>
          <Stack direction={"row"} spacing={3}>

          <TextField id="outlined-basic" label="Application Name" variant="outlined" onChange={onChange} value={applicationName} />
          </Stack>

          <Box sx={{ mb: 1, margin: 5 }}>
      
         
            
          
        </Box>
      </Typography>
        </Stack>
    )
}

export function Review(props: StepProps) {
    const {reviewProps} = props;
    return (
        <Stack direction={"row"} spacing={3}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody >
                
                    {reviewProps && 
                    <>
                        <TableRow key={"ddd"}>
                            <TableCell component="th" scope="row" style={{ width: 160 }} >
                                Application Name
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                            {reviewProps.applicationName}
                            </TableCell>
                        </TableRow>
                         <TableRow key={"dddd"}>
                            <TableCell component="th" scope="row" style={{ width: 160 }}>
                                Github Repository
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                            {reviewProps.githubRepo}
                            </TableCell>
                        </TableRow>
                        <TableRow key={"ddddd"}>
                            <TableCell component="th" scope="row" style={{ width: 160 }}>
                                Application Url
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="left">
                            {reviewProps.url}
                            </TableCell>
                        
                        </TableRow>
                    </>
                    }

                    
                
                </TableBody>
                
            </Table>
            </TableContainer>
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



