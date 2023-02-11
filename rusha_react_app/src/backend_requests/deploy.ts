
import { CreateProjectResponseInterface } from '../types';
import { http } from '.';

interface deployArgs {
    payload: {
        [key: string]: string
    };
}


// call deploy backend
const deploy = async (args: deployArgs):Promise<CreateProjectResponseInterface> => {
    const { payload } = args;
    const { data } = await http.post(payload, 'deploy/');
    console.log(data);
    return data;
};

export  {
    deploy
};