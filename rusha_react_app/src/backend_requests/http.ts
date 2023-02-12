import axios from 'axios';


interface APIBaseURLS {
    userCacheApi: string;
    applicationsApi: string;
    default: string;
}

interface API {
    typeOfRequest: string;
    // getBaseUrl: () => string;
}

const apiBaseUrls: APIBaseURLS  = {
    userCacheApi: 'http://localhost:8000/user_cache_api/v1',
    applicationsApi: 'http://localhost:8000/applications_api/v1',
    default: 'http://localhost:8000/user_cache_api/v1',
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
        api: 'applicationsApi' | "userCacheApi" | "default", 
        endpoint: string,
        method: 'get' | 'post' | 'put' | 'delete',
        data?: object

        ): Promise<any> => {
        const url = `${apiBaseUrls[api]}/${endpoint}`;
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


