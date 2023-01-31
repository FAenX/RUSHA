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
        <Button aria-describedby={id} variant="outlined" onClick={handleClick} sx={{}}>
          Create
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{width: 500, margin: 2}}

        >
            {content && content.supported_frameworks.map((application) => (
              <Button href={`deploy/${application.framework_name.toLowerCase()}`} value={application.id}>{application.framework_name}</Button>
            ))}
        </Popover>
    
          
          

    </Stack>
  );
}