import { UserHomePageCache } from '../types/create-project-response-type';
import { API } from '.';




const cacheHomePage = async (payload: UserHomePageCache, userId: string ):Promise<object> => {  

    return await new API().callAPI(
        "UserHomePageCacheApi",
        "cache_home_page/",
        "post",
        );
};

const retrieveHomePageCache = async (userId: string):Promise<UserHomePageCache[]> => {
    const {data} = await new API().callAPI(
        "UserHomePageCacheApi",
        `home_page_cache/${userId}/`,
        "get",
        );
    return data;
};

const retrieveHomePageContentCached = async(): Promise<UserHomePageCache>  => {
   const response = await new API().callAPI(
    "UserHomePageCacheApi",
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