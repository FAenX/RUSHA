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


export default function CreateApplication(Props: {content?: Content}) {
  const [application, setApplication] = React.useState('');

  const {content} = Props;

 
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Stack sx={{ minWidth: 120 }} className="border">
        <Button 
        aria-describedby={id} 
        variant="outlined" 
        onClick={handleClick} 
        sx={{"textTransform": "none"}} 
        href={'create-application'}>
          Create application
        </Button>
    </Stack>
  );
}