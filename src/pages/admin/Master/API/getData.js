import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const getBuilding = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/building`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getWarehouse = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/wareouse`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getSampleSLocation = async (BuildingCode) => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/sampleLocation${BuildingCode ? `?BuildingCode=${BuildingCode}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getVendor = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/vendor`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getTestMethode = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/testMethode`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getTimePoint = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/timePoint`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getCustomer = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/customer`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 