import axios from 'axios';

const URL = 'https://shopycart.onrender.com/api'; //  Render URL with api prefix

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log("Error while calling signup api", error);
        throw error;
    }
};

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log("Error while calling login api", error);
        return error.response;
    }
};