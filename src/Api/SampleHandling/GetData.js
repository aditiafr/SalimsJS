import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_BASEURL;


export const getTestingOrder = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/transaction/testing-order/list?sortParam=reqnumber&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTestingOrderOne = async (Code) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/transaction/testing-order/one/0001/${Code}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data;
}

export const getPlannigTakingSample = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/transaction/planning-taking-sample/list?sortParam=tsnumber&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}


export const getTakingSample = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/transaction/taking-sample/list?sortParam=tsnumber&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTakingSampleOne = async (Code) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/transaction/taking-sample/one/0001/${Code}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data;
}

export const getSampleHandling = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/transaction/sample-handling/list?sortParam=ssnumber&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getSampleRegistration = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/transaction/sample-registration/list?sortParam=srnumber&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}