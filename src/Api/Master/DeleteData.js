import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const deleteDepartment = async (DepartmentCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.patch(`${baseUrl}/delete/department?DeepCode=${DepartmentCode}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteEquipmentType = async (EquipmentTypeCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/v1/equipment/type/delete/${EquipmentTypeCode}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}