import React from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {deploy} from '../data';
import {SuccessfulDeployment} from "./successful-deployment";
import {CreateProjectResponseInterface} from '../types'
import { DismissibleAlert } from "../common-components";




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
           {!done && <Form.Label>Project name</Form.Label>}
           {!done && <Form.Control
                type="text"
                id="project-name"
                aria-describedby="project-name"
                placeholder="Enter project name"
                onChange={changeHandler}
            />}
            {!done && <Form.Text id="project-name" muted>
                Please enter a name for your project
            </Form.Text>} 

            {!done &&<Button onClick={clickHandler} className="w-25 m-2 align-self-end" variant="success" size='sm'>Submit</Button>}
            {done && <div>
                <SuccessfulDeployment                    
                    id={responseData?.id} 
                    application_name={responseData?.application_name} 
                    local_git_repo={responseData?.local_git_repo}
                    date_created={responseData? responseData.date_created : new Date()}  
                    // applicationUpdatedAt={responseData?.applicationUpdatedAt}                  
                />
                </div>}
        
        </div>
    );
}


export default ReactDeployment;