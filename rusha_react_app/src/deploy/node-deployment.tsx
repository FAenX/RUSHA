import React, { useEffect } from "react";
import Layout from "../layout/component";

import { Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {deploy} from '../backend_requests';
import {useLocation} from 'react-router-dom';
import { SuccessfulDeployment } from "./successful-deployment";
import { CreateProjectResponseInterface } from "../types";

const NodeDeployment = () => {

    // const [projectName, setProjectName] = React.useState("");
    // const [responseData, setResponseData] = React.useState<CreateProjectResponseInterface>();
    // const [done, setDone] = React.useState(false);


    // const clickHandler = async () => {
    //     console.log(projectName);
    //     try{
    //         const data = await deploy({payload: {
    //             projectName,
    //             app: "react"
    //         }, path: "deploy/"});
    //         console.log(data);
    //         setResponseData(data);
    //         setDone(true);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value);
    //     setProjectName(e.target.value);
    // }
    // return (
    //     <div className="content border d-flex flex-column  w-100  justify-content-center align-self-start m-5 p-5">
    //        {!done && <Form.Label>Project name</Form.Label>}
    //        {!done && <Form.Control
    //             type="text"
    //             id="project-name"
    //             aria-describedby="project-name"
    //             placeholder="Enter project name"
    //             onChange={changeHandler}
    //         />}
    //         {!done && <Form.Text id="project-name" muted>
    //             Please enter a name for your project
    //         </Form.Text>} 

    //         {!done &&<Button onClick={clickHandler} className="w-25 m-2 align-self-end" variant="success" size='sm'>Submit</Button>}
    //         {done && 

    //             <SuccessfulDeployment                    
    //             id={responseData?.id} 
    //             applicationName={responseData?.applicationName} 
    //             localGitRepo={responseData?.localGitRepo}
    //             requestedAt={responseData?.applicationUpdatedAt}                    
    //             />
                
    //             }
        
    //     </div>
    // );
}


export default NodeDeployment;