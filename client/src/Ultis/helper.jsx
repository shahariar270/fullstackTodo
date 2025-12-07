import axios from 'axios';

export const apiRoute = import.meta.env.API_URL ?? 'http://localhost:3000/api';

export const fetchApi = async (url) => {
    try {
        const response = await axios.get(`${apiRoute}/${url}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("API Error:", error);
    }
};
