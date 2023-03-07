
import { API } from '.';
import {apiBaseUrls, endpoints} from './http';






const applicationList = async () => {  
    const { data } = await new API().callAPI(
        apiBaseUrls.applicationsApi,
        endpoints.applications,
        "get",
    )
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
        apiBaseUrls.applicationsApi,
        endpoints.deploy,
        "post",
        payload
        );
   
   
};

export  {
    applicationList,
    createApplication
};