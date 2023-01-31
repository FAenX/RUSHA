import React, {useEffect, useState} from "react";
import Layout from "../layout/component";

import { Avatar, Stack, Typography } from "@mui/material";
import {CreateApplication} from "./components"
import {retrieveHomePageCache, retrieveHomePageContentCached} from "../backend_requests";
import {ProjectCacheInterface, Content} from "../types/create-project-response-type";
import {ProjectTabs} from "./components";
import { Button } from "react-bootstrap";
import {SearchBar} from "./components";



const PlaceHolder = () => {

    const [project, setProject] = useState<ProjectCacheInterface>();
    const [content, setContent] = useState<Content>();

    useEffect(() => {
       ( 
        async()=> {
            const data =await retrieveHomePageCache()
            setProject(data);
        }
        
        )()

        
    }, []);

    useEffect(() => {
        ( 
            async()=> {
                const data =await retrieveHomePageContentCached()
                console.log(data);
                setContent(data);
                // setProject(data);
            }
            
        )()
        // call backend to get content
    }, []);

    return (
        <Stack className="border" direction={"column"} justifyContent="flex-start" sx={{"width": "100%", margin: 2, padding: 2}}>
            {/* project heading */}
            <Stack className="border" direction={"row"} justifyContent={"space-between"} sx={{margin: 5, padding: 2}}>
                <Stack  className=""  >
                    
                <SearchBar />
       
                </Stack>
                <CreateApplication content={content}/>
                
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                <Stack  direction={"row"} spacing={3}>
                    <Stack justifyContent={"center"}>
                        <Avatar sx={{ bgcolor: "black", height: 100, width: 100}} variant="square">
                            P
                        </Avatar>
                    </Stack>
                    <Stack justifyContent={"center"}>
                        <Typography>{project && project?.project.project_name }</Typography>
                        <Typography>{project && project?.project.tag }</Typography>
                        <Typography>{project && project?.project.description }</Typography>
                       
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