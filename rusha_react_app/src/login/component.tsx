import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import React  from "react";


export const Login = () => {
    return (
        <Stack justifyContent={"center"} alignItems="center" className="border" sx={{minHeight: "100vh"}}>
            
            <Stack className='border' >
          
            <Stack direction={"row"} spacing={3} alignContent="center" sx={{padding: 10}}>

                <Stack justifyContent={""} sx={{padding:2}}>
                    <Avatar sx={{ bgcolor: "black", width: 100, height: 100 }} variant="square" >
                        L
                    </Avatar>
                    </Stack>
                

                
                    <Stack justifyContent={""} sx={{padding:2, width: 400}} spacing={2}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="password" variant="outlined" />
                    </Stack>
                </Stack>
                {/* login button */}
                <Stack justifyContent={"center"} sx={{padding:2}}>
                    <Button variant="outlined">
                    <Typography variant="h6" component="div" gutterBottom>
                        Login
                    </Typography>
                    </Button>
                    </Stack>
                </Stack>
        </Stack>
    );
    };