import {useContext, useEffect, useState} from "react";
import Layout from "../layout/component";

import { Avatar, Stack } from "@mui/material";
import {CreateApplication} from "./components"
import {retrieveHomePageCache} from "../backend_requests";
import {UserHomePageCache, Content} from "../types/create-project-response-type";
import {SearchBar} from "./components";
import { retrieveHomePageContentCached } from "../backend_requests/cache";
import { authenticate } from "../utils/decorators";
import { UserContext } from "../utils/userProvider";



const Home = authenticate(function() {

    const [applications, setApplications] = useState<UserHomePageCache[]>();
    const [content, setContent] = useState<Content>();

    const {user} = useContext(UserContext);

    console.log(user)
    // 

    useEffect(() => {
       ( 
        async()=> {
            const data =await retrieveHomePageCache(user ? user.id : '')
            const truncated = data.slice(0, 3);
            console.log(truncated);
            setApplications(truncated);
        }
        
        )()

        
    }, []);

    useEffect(() => {
        ( 
            async()=> {
                const data =await retrieveHomePageContentCached()
                console.log(data);
                // setContent(data);
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
                <CreateApplication/>
                
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                <Stack  direction={"row"} spacing={3}>
                    <Stack justifyContent={"center"}>
                        <Avatar sx={{ bgcolor: "black", height: 100, width: 100}} variant="square">
                            P
                        </Avatar>
                    </Stack>
                    {/* <Stack justifyContent={"center"}>
                        <Typography>{applications && applications[0].project_name }</Typography>
                        <Typography>{applications && applications[0].tag }</Typography>
                        <Typography>{applications && applications[0].description }</Typography>
                       
                    </Stack> */}
                    </Stack>
            </Stack>
            <Stack className="border" direction={"column"} spacing={3} sx={{padding: 2}}>
                {/* <Tabs applications={applications}/> */}
                
            </Stack>
          
        </Stack>
       
    );

});


// content container
const Component = () => {
    return (
        <Layout>
            <Home />
        </Layout>
        
    );
}

export default Component;