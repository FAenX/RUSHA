import React, {useEffect} from "react";
import {applicationList} from '../backend_requests';
import {CreateProjectResponseInterface} from '../types'
import Button from 'react-bootstrap/Button';
import { DismissibleAlert } from "../common-components";

import {format} from "date-fns"
import { Typography, Stack, Link } from "@mui/material";






const Component = () => {
    // applications state
    const [applications, setApplications] = React.useState<CreateProjectResponseInterface[]>();
    // error state
    const [error, setError] = React.useState({error: false, message: ""});


  
    useEffect(() => {
        (
            async () => {
                // get applications
                try{
                    const getApplications = await applicationList();
                    console.log(format(new Date(getApplications[0].date_created), "MM/yy/dd"));
                   
                    setApplications(getApplications);
                    
                }catch (error) {
                    console.log(error);
                    setError({error: true, message: "Something went wrong"});
                    // notification time out


                }
               
            }
        
        )()
        
    }, []);
    return (
        <Stack className="border" width={"100%"}>
            <DismissibleAlert show={error.error} onClose={()=>setError({error: false, message: ""})} message={error.message}/>
            <div className="border m-2 p-2 d-flex">
                <i className="bi bi-view-stacked border d-flex align-items-center p-2" style={{fontSize: 100}}></i>
                <div className="m-2 p-2 border d-flex justify-content-start flex-column">
                    <p className="display-6">Applications</p>
                    <p className="text-muted">A very long example description</p>
                </div>
            </div>

            <div className="border m-2 p-2 d-flex flex-column">

                {/* map applications */}
                {applications?.map((application) => (
                    <div className="border d-flex  m-2 p-2" id={`application-${application.id}}`}>
                        <i className="bi bi-app border d-flex  p-2" style={{fontSize: 50}}></i>
                        <div className="m-2 p-2 border d-flex justify-content-start flex-column lh-1 flex-grow-1">
                            <Typography>
                                {application.application_name}
                            </Typography>
                            <Typography>
                                git repo: {application.local_git_repo}
                                </Typography>
                            <Typography>
                                tag: {application.tag}
                            </Typography>
                            <Typography>
                                 framework: {application.framework}
                            </Typography>
                            <Typography>
                                domain name: <Link href={`http://${application.domain_name}`}> {application.domain_name} </Link>
                            </Typography>
                                
                            
                        </div>

                        <Button 
                        variant="outline-primary" 
                        className="m-2 p-2 border d-flex justify-content-center align-items-center align-self-end  w-25" 
                        > info </Button>

                    </div>  
                ))}

            </div>
            

          
        </Stack>
    );
}

export default Component;
