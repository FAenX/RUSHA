import { UserHomePageCache } from '../types/create-project-response-type';
import { API } from '.';
import {apiBaseUrls, endpoints} from './http';


// export const retrieveHomePageContentCached = async() => {
//     const {data} = await axios.get(`${apiUrl}/get_home_page_content_cache/`);
//     return data;
//     }


export const createApplicationOptions = async() => {
    const response = await new API().callAPI(
        apiBaseUrls.contentCache,
        endpoints.createApplicationOptions,
        "get",
    );
      
    return response;
}