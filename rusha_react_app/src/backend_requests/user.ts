import axios from 'axios';

const apiUrl = 'http://localhost:8000/app-api/v1'

interface Payload {
    payload?: {
        [key: string]: string
    };
    path?: string;
}

// call deploy backend
const cacheHomePage = async (payload: Payload):Promise<number> => {  

    return await axios.post(`${apiUrl}/user/`, {...payload}, {});
};

const retrieveHomePageCache = async (payload: Payload):Promise<object> => {
    return await axios.get(`${apiUrl}/${payload.path}/`);
}

export  {
    cacheHomePage, retrieveHomePageCache
};