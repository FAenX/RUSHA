import React from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {deploy} from '../backend_requests';
import {SuccessfulDeployment} from "./successful-deployment";
import {CreateProjectResponseInterface} from '../types'
import { DismissibleAlert } from "../common-components";
import { Stack, Typography } from "@mui/material";
import {  VerticalLinearStepper } from "./components";



const ReactDeployment = () => {

    const [projectName, setProjectName] = React.useState<string>('');
    const [responseData, setResponseData] = React.useState<CreateProjectResponseInterface>();
    const [error, setError] = React.useState({error: false, message: ""});
    const [done, setDone] = React.useState(false);

    const clickHandler = async () => {
        console.log(projectName);
        try{
            const data = await deploy({payload: {
                 applicationName: projectName,
                framework: "react"
            }});
            console.log(data);
            setResponseData(data);
            setDone(true);

           
        } catch (error: any) {
            console.log(error.response.data);
            setError({error: true, message: `Error: ${JSON.stringify(error.response.data)}`});
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setProjectName(e.target.value.trim().replace(/\s+/g, '-').toLowerCase());
    }
    return (
        <div className="content border d-flex flex-column  w-100  justify-content-center align-self-start m-5 p-5">
            <DismissibleAlert show={error.error} onClose={()=>setError({error: false, message: ""})} message={error.message}/>
           

            <Stack>
                <Stack sx={{padding: 5}} spacing={2}>
                    <Typography>Back to project</Typography>
                    <Typography>Create App</Typography>

                </Stack>
                <Stack direction={"row"} className="border" sx={{padding: 5}}>
                    <VerticalLinearStepper />
                </Stack>
            </Stack>

            
        
        </div>
    );
}


export default ReactDeployment;