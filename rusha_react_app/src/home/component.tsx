import React, {useEffect, useState} from "react";
import Layout from "../layout/component";

import { Avatar, Stack, Typography } from "@mui/material";
import {CreateApplication} from "./components"
import {retrieveHomePageCache} from "../backend_requests";
import {UserCache, Content} from "../types/create-project-response-type";
import {ApplicationTabs} from "./components";
import { Button } from "react-bootstrap";
import {SearchBar} from "./components";
import { retrieveHomePageContentCached } from "../backend_requests/cache";

const userId = "c36f8dcd-39cf-443c-a7f3-319dfc2d835b";



const Home = () => {

    const [applications, setApplications] = useState<UserCache[]>();
    const [content, setContent] = useState<Content>();

    useEffect(() => {
       ( 
        async()=> {
            const data =await retrieveHomePageCache(userId)
            console.log(data);
            setApplications(data);
        }
        
        )()

        
    }, []);

    // useEffect(() => {
    //     ( 
    //         async()=> {
    //             const data =await retrieveHomePageContentCached()
    //             console.log(data);
    //             setContent(data);
    //             // setProject(data);
    //         }
            
    //     )()
    //     // call backend to get content
    // }, []);

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
                        <Typography>{applications && applications[0].project_name }</Typography>
                        <Typography>{applications && applications[0].tag }</Typography>
                        <Typography>{applications && applications[0].description }</Typography>
                       
                    </Stack>
                    </Stack>
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                <ApplicationTabs applications={applications}/>
                
            </Stack>
          
        </Stack>
    );
}


// content container
const Component = () => {
    return (
        <Layout child={<Home />} />
        
    );
}

export default Component;