import axios from "axios";
import Cookies from "js-cookie";
import { selectedTranIdx } from "../../components/Dashboard/Global/Helper";

const baseURL = process.env.REACT_APP_BASEURL;


export const getMaintenanceRequest = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/maintanance/request/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}


export const getMaintenanceRequestOne = async (branchcode, mrnumber) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/maintanance/request/one/${branchcode}/${mrnumber}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getMaintenanceRequestNextCode = async (branchcode) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/maintanance/request/next-code?tranidx=${selectedTranIdx}&branchcode=${branchcode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}


export const getMaintenanceProcess = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/maintanance/process/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}


export const getMaintenanceProcessNextCode = async (branchcode) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/maintanance/process/next-code?tranidx=${selectedTranIdx}&branchcode=${branchcode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}