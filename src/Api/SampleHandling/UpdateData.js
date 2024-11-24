import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateTestingOrder = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/transaction/testing-order/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}