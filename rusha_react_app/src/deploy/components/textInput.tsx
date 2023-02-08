import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

export default function BasicTextFields() {
    const [value, setValue] = React.useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    React.useEffect(() => {
        console.log(value);
    }, [value])

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Stack>
            <TextField id="outlined-basic" label="Application Name" variant="outlined" onChange={onChange} value={value} />
        </Stack>
     
    </Box>
  );
}