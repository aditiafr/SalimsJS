import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const postMaintenanceRequest = async (Data) => {
    const token = Cookies.get('access_token');
    const user = Cookies.get('usernam');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.post(`${baseUrl}/maintanance/request/store`,
        {
            ...Data,
            tranidx: selectedTranIdx,
            user: user,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return response;
}

export const postMaintenanceProcess = async (Data) => {
    const token = Cookies.get('access_token');
    const user = Cookies.get('usernam');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.post(`${baseUrl}/maintanance/process/store`,
        {
            ...Data,
            user: user,
            tranidx: selectedTranIdx,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return response;
}