import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const deleteMaintenanceRequest = async (branchcode, mrnumber, detail) => {
    const token = Cookies.get('access_token');
    const user = Cookies.get('usernam');
    const response = await axios.patch(`${baseUrl}/maintanance/request/set-suspend/${branchcode}/${mrnumber}`,
        {
            user: user,
            issuspend: true,
            detail: detail
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    return response;
}


export const deleteMaintenanceProcess = async (branchcode, mrnumber, detail) => {
    const user = Cookies.get('usernam');
    const token = Cookies.get('access_token');
    const response = await axios.patch(`${baseUrl}/maintanance/process/set-suspend/${branchcode}/${mrnumber}`,
        {
            user: user,
            issuspend: true,
            detail: detail
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    return response;
}