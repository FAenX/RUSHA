import axios from 'axios';
import { UserHomePageCache } from '../types/create-project-response-type';
import { API } from '.';
import {apiBaseUrls, endpoints} from './http';


export const login = async (email: string, password: string): Promise<string> => {
    const response = await new API().callAPI(
        apiBaseUrls.users,
        endpoints.login,
        "post",
        {email, password}
    );
    return response;
}