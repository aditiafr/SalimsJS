import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const postTestingOrder = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/transaction/testing-order/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}