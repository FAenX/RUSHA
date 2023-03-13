import { UserHomePageCache } from '../types/create-project-response-type';
import { API } from '.';
import {apiBaseUrls, endpoints} from './http';




// const cacheHomePage = async (payload: UserHomePageCache, userId: string ):Promise<object> => {  

//     return await new API().callAPI(
//         apiBaseUrls.UserHomePageCacheApi,
//         endpoints.homePageCache + userId ,
//         "post",
//         );
// };

const retrieveUserHomePageCache = async ():Promise<UserHomePageCache[]> => {
    const {data} = await new API().callAPI(
        apiBaseUrls.contentCache,
        endpoints.homePageCache,
        "get",
        );
    return data;
};

// const retrieveHomePageContentCached = async(): Promise<UserHomePageCache>  => {
//    const response = await new API().callAPI(
//     apiBaseUrls.contentCache,
//     endpoints.homePageCache + "content",
//     "get",
//     );
//     console.log(response)
//     return response;
//  }

export  {
    // cacheHomePage, 
    retrieveUserHomePageCache, 
    // retrieveHomePageContentCached
};

// user id = "c36f8dcd-39cf-443c-a7f3-319dfc2d835b"