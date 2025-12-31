import axios from 'axios';

export const apiRoute = 'https://fullstacktodo-v3bz.onrender.com/api';


export const fetchApi = async (url) => {
    try {
        const response = await axios.get(`${apiRoute}/${url}`);
        return response.data;
    }
    catch (error) {
        console.error("API Error:", error);
    }
};
export const initialValuesData = (data = {}) => {
    if (data) {
        return data;
    }
    return {
        title: '',
        description: '',
        isCompleted: false,
    }
}