import axios from 'axios';

const apiUrl = 'http://localhost:8000/app-api/v1'


export const retrieveHomePageContentCached = async() => {
    const {data} = await axios.get(`${apiUrl}/get-home-page--content-cache/`);
    return data;
    }