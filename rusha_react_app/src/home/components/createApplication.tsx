import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, Typography } from '@mui/material';
import { Content } from '../../types/create-project-response-type';
import Button, {} from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function CreateApplication() {

  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/create-application')
  };

  

  return (
    <Stack sx={{ minWidth: 120 }} className="border">
        <Button 
        variant="outlined" 
        onClick={handleClick} 
        sx={{"textTransform": "none"}} 
        href={'create-application'}>
          Create application
        </Button>
    </Stack>
  );
}