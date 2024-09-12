import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const deleteDepartment = async (DepartmentCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/v1/department/delete/${DepartmentCode}`,  {
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

export const deletePackingType = async (PackingTypeCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/v1/unit/delete/${PackingTypeCode}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteProductCategory = async (ProductCategoryCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/v1/product-category/delete/${ProductCategoryCode}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}