import axios from 'axios';

const apiUrl = 'http://localhost:8000/app-api/v1'



// call deploy backend
const applicationList = async () => {  
    const { data } = await axios.get(`${apiUrl}/applications/`);
    console.log(data)
    return data;
};

export  {
    applicationList
};