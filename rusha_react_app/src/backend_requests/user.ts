import axios from 'axios';
import { ProjectCacheInterface } from '../types/create-project-response-type';

const apiUrl = 'http://localhost:8000/app-api/v1'


// call deploy backend
const cacheHomePage = async (payload: ProjectCacheInterface):Promise<number> => {  

    return await axios.post(`${apiUrl}/user/`, {...payload}, {});
};

const retrieveHomePageCache = async ():Promise<ProjectCacheInterface> => {
    const {data} = await axios.get(`${apiUrl}/get-home-page-cache/123/`);
    return data;
};

export  {
    cacheHomePage, retrieveHomePageCache
};