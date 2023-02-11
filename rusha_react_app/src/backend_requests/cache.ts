import { ProjectCacheInterface } from '../types/create-project-response-type';
import { http } from '.';



// call deploy backend
const cacheHomePage = async (payload: ProjectCacheInterface, userId: string ):Promise<object> => {  

    return await http.post(payload, `save-cache/${userId}/`);
};

const retrieveHomePageCache = async (userId: string):Promise<ProjectCacheInterface> => {
    const {data} = await http.get(`home-page-cache/${userId}/`);
    return data;
};

const retrieveHomePageContentCached = async() => {
    const {data} = await http.get('content-cache/');
    return data;
    }

export  {
    cacheHomePage, 
    retrieveHomePageCache, 
    retrieveHomePageContentCached
};

// user id = "c36f8dcd-39cf-443c-a7f3-319dfc2d835b"