import axios from 'axios';




interface API {
    typeOfRequest: string;
    // getBaseUrl: () => string;
}

export const apiBaseUrls  = {
    UserHomePageCacheApi: 'http://localhost:8000/user_cache_api/v1',
    applicationsApi: 'http://localhost:8000/applications_api/v1',
    default: 'http://localhost:8000/user_cache_api/v1',
    contentCache: 'http://localhost:8000/content_api/v1',
    users: 'http://localhost:8000/users_api/v1',
}

export const endpoints = {
    homePageCache: 'home_page_cache/',
    homePageContentCached: 'home_page-content_cached/',
    createApplicationPageContentCache: 'create_application_page_content_cache/',
    deploy: 'deploy/',
    applications: 'applications/',
    login: 'login/',
    register: 'register/',
    logout: 'logout/',
}

const config = {
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
}

function errorHandler(error: any): object {
    if (error.response) {
      return {
        errored: true,
        message: 'Server responded with an error',
        data: error.response.data,
      };
    } 
    if (error.request) {
      return {
        errored: true,
        message: 'Request failed, check your internet connection',
      };
    }
    return {
      message: 'Application failure.',
      errored: true,
    };
  }
  

 


class API {

    callAPI = async (
        api: string, 
        endpoint: string,
        method: 'get' | 'post' | 'put' | 'delete',
        data?: object

        ): Promise<any> => {
        const url = `${api}/${endpoint}`;
        try {
            if (method.toLocaleLowerCase() === 'get') {
                const response = await axios[method](url, config);
                return response;
            }
            else if (method.toLocaleLowerCase() === 'post') {
                const response = await axios[method](url, data, config);
                return response;
            }
            return {
                "message": "method not supported"
            }
            
        } catch (error) {
            return errorHandler(error);
        }
    }
}

export default API;


