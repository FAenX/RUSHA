import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import React  from "react";
import { login } from "../backend_requests/user";


export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        console.log(email)
        console.log(password)

        login(email, password).then((response) => {
            console.log(response)
        }
        )


    };
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
                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleEmailChange}/>
                        <TextField id="outlined-basic" label="password" type="password" variant="outlined" onChange={handlePasswordChange}/>
                    </Stack>
                </Stack>
                {/* login button */}
                <Stack justifyContent={"center"} sx={{padding:2}}>
                    <Button variant="outlined" onClick={handleSubmit}>
                    <Typography variant="h6" component="div" gutterBottom sx={{textTransform: "none"}} >
                        Login
                    </Typography>
                    </Button>
                    </Stack>
                </Stack>
        </Stack>
    );
    };