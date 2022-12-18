import axios from 'axios';
import { CreateProjectResponseInterface } from '../types';

const apiUrl = 'http://localhost:8000/app-api/v1'

interface deployArgs {
    payload: {
        [key: string]: string
    };
}


// call deploy backend
const deploy = async (args: deployArgs):Promise<CreateProjectResponseInterface> => {
    const { payload } = args;
    const { data } = await axios.post(`${apiUrl}/deploy/`,payload, {});
    console.log(data);
    return data;
};

export  {
    deploy
};