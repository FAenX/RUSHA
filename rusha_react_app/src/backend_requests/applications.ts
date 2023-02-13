import axios from 'axios';
import { API } from '.';

const apiUrl = 'http://localhost:8000/app-api/v1'






const applicationList = async () => {  
    const { data } = await axios.get(`${apiUrl}/applications/`);
    return data;
};


interface CreateApplicationPayload {
    "projectId": string;
    "framework": string;
    "description": string;
    "applicationName": string;
    "repository": string;
    "environmentVariables": string;
    "tags": string;
    "userId": string;

}


// call deploy backend
const createApplication = async (payload: CreateApplicationPayload):Promise<0|1> => {
    
    return await new API().callAPI(
        "applicationsApi",
        "deploy/",
        "post",
        payload
        );
   
   
};

export  {
    applicationList,
    createApplication
};