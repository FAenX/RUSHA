import React from "react";

import { DismissibleAlert } from "../common-components";
import { Stack, Typography } from "@mui/material";
import {  CreateApplication as CreateApplicationFlow } from "./components";



const CreateApplication = () => {

   
    const [error, setError] = React.useState({error: false, message: ""});
   

   
    return (
        <div className="content border d-flex flex-column  w-100  justify-content-center align-self-start m-5 p-5">
            <DismissibleAlert show={error.error} onClose={()=>setError({error: false, message: ""})} message={error.message}/>
           

            <Stack>
                <Stack sx={{padding: 5}} spacing={2}>
                    <Typography>Back to project</Typography>
                    <Typography>Create App</Typography>

                </Stack>
                <Stack direction={"row"} className="border" sx={{padding: 5}}>
                    <CreateApplicationFlow/>
                </Stack>
            </Stack>

            
        
        </div>
    );
}


export default CreateApplication;