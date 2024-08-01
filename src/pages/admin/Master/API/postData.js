import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


// MASTER DATA
export const postBuilding = async (BuildingData) => {
    const token = Cookies.get('accessToken');
    const response = await axios.post(`${baseUrl}/post/building`, BuildingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postDepartment = async (DepartmentData) => {
    const token = Cookies.get('accessToken');
    const response = await axios.post(`${baseUrl}/post/department`, DepartmentData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}