import { UserCache } from '../types/create-project-response-type';
import { API } from '.';



// call deploy backend
const cacheHomePage = async (payload: UserCache, userId: string ):Promise<object> => {  

    return await new API().callAPI(
        "userCacheApi",
        "cache_home_page/",
        "post",
        );
};

const retrieveHomePageCache = async (userId: string):Promise<UserCache[]> => {
    const {data} = await new API().callAPI(
        "userCacheApi",
        `home_page_cache/${userId}/`,
        "get",
        );
    return data;
};

const retrieveHomePageContentCached = async(): Promise<UserCache>  => {
   const response = await new API().callAPI(
    "userCacheApi",
    "home_page-content_cached/",
    "get",
    );
    console.log(response)
    return response;
 }

export  {
    cacheHomePage, 
    retrieveHomePageCache, 
    retrieveHomePageContentCached
};

// user id = "c36f8dcd-39cf-443c-a7f3-319dfc2d835b"