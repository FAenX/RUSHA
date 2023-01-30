import React, {useEffect, useState} from "react";
import Layout from "../layout/component";

import { Avatar, Stack, Typography } from "@mui/material";
import {Select} from "./components"
import {cacheHomePage, retrieveHomePageCache} from "../backend_requests/user";
import {ProjectCacheInterface} from "../types/create-project-response-type";
import {ProjectTabs} from "./components";
import { Button } from "react-bootstrap";



const PlaceHolder = () => {

    const [project, setProject] = useState<ProjectCacheInterface>();

    useEffect(() => {
       ( 
        async()=> {
            const data =await retrieveHomePageCache()
            console.log(data);
            setProject(data);
        }
        
        )()

        
    }, []);

    console.log(project)

    useEffect(() => {
        // call backend to log visit
        // cacheHomePage(project).then((response) => {console.log(response)}).catch((error) => {console.log(error)});
       
       
    }, []);

    return (
        <Stack className="border" direction={"column"} justifyContent="flex-start" sx={{"width": "100%", margin: 2, padding: 2}}>
            {/* project heading */}
            <Stack className="border" direction={"row"} justifyContent={"space-between"} sx={{margin: 5, padding: 2}}>
                <Stack direction={"row"}>
                    <Stack className="border" direction={"column"} sx={{margin: 2}}>
                        Content
                    </Stack>
                    <Stack className="border" direction={"column"} sx={{margin: 2}}>
                        Content
                    </Stack>
                </Stack>
                <Select />
                
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                <Stack  direction={"row"} spacing={3}>
                    <Stack>
                        <Avatar sx={{ bgcolor: "black" }} variant="square">
                            P
                        </Avatar>
                    </Stack>
                    <Stack>
                        {project && project?.project.project_name }
                    </Stack>
                    </Stack>
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                <ProjectTabs project={project}/>
                
            </Stack>
          
        </Stack>
    );
}


// content container
const Component = () => {
    return (
        <Layout child={<PlaceHolder />} />
        
    );
}

export default Component;