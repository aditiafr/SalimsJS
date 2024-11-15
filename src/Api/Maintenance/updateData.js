import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateMaintenanceRequest = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/maintanance/request/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}


export const updateMaintenanceProcess = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/maintanance/process/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}