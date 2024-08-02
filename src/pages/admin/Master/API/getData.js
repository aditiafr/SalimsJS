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

export const getDepartments = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/department`, {
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

export const getEquipmentType = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/equipmentType`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
}