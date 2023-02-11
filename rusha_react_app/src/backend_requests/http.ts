import axios from 'axios';


const baseURL = 'http://localhost:8000/application-api/v1'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
  

  export default {
    get: async (endpoint: string): Promise<any> => {
     
      
      
  
      const url = `${baseURL}/${endpoint}`;
  
      try {
        const response = await axios.get(url, config);
        return response;
      } catch (error) {
        return errorHandler(error);
      }
    },
    
    post: async (data: any, endpoint: string): Promise<any> => {
      const url = `${baseURL}/${endpoint}`;
  
      try {
        const response = await axios.post(`${url}`, data, config);
        return response
      } catch (error) {
        return errorHandler(error);
      }
    },
  };
