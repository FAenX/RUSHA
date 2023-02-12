
import { CreateProjectResponseInterface } from '../types';
import { API } from '.';

interface deployArgs {
    payload: {
        [key: string]: string
    };
}


// call deploy backend
const deploy = async (args: deployArgs):Promise<CreateProjectResponseInterface> => {
    const { payload } = args;
    return await new API().callAPI(
        "UserHomePageCacheApi",
        "'deploy/",
        "post",
        payload
        );
   
   
};

export  {
    deploy
};