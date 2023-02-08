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
import { VerticalLinearStepper} from ".";
import { AppData } from '../../types/create-project-response-type';



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


export default function CreateApplication() {

  const [appData, setAppData] = React.useState<AppData>();
  const [applicationName, setApplicationName] = React.useState<string>('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationName(event.target.value);
    };

  return (
 
      <Stack>
        <VerticalLinearStepper onChange={handleChange} repositories={repositories} applicationName={applicationName}/>
      </Stack>

  );
}