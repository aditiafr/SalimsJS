import axios from "axios";
import Cookies from "js-cookie";
import { mapFromHttp } from "../../mapper/EquipmentType";

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

export const getSampleSLocation = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/samplelocation`, {
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
    const response = await axios.get(`${baseUrl}/get/testmethode`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getTimePoint = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/get/timepoint`, {
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

export const getEquipmentType = async () => {
    const token = Cookies.get('accessToken');
    const response = await axios.get(`${baseUrl}/v1/equipment/type/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return mapFromHttp(response.data.data);
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