import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateMaintenanceRequest = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const user = Cookies.get('usernam');
    const response = await axios.put(`${baseUrl}/maintanance/request/update`,
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


export const updateMaintenanceProcess = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const user = Cookies.get('usernam');

    const response = await axios.put(`${baseUrl}/maintanance/process/update`, {
        ...Data,
        user: user,
        tranidx: selectedTranIdx,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}