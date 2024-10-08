import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_BASEURL;

export const getTran = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/tran/list?sortParam=tranidx&sortOrder=asc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getPrefix = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/prefix/generator-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data;
}

