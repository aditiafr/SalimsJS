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