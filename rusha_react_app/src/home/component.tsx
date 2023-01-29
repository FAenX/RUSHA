import React, {useEffect, useState} from "react";
import Layout from "../layout/component";

import { Stack } from "@mui/material";
import {Select} from "./components"
import {cacheHomePage, retrieveHomePageCache} from "../backend_requests/user";

const PlaceHolder = () => {

    const [userId, setUserId] = useState<string>('123');

    useEffect(() => {
       ( async()=>retrieveHomePageCache({
            path: `get_home_page_cache/${userId}`,

        }))()
    }, []);

    useEffect(() => {
        // call backend to log visit
        cacheHomePage({payload: {
            timestamp: new Date().toISOString(),
            projectId: "123",
            userId: userId,
       }}).then((response) => {console.log(response)}).catch((error) => {console.log(error)});
       
       
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
            <Stack className="border" direction={"column"}>
                Content
            </Stack>
            <Stack className="border" direction={"column"}>
                Content
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