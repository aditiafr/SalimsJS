import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

export const deleteBuilding = async (BuildingCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.patch(`${baseUrl}/building/set-suspend/${BuildingCode}`,
        {
            issuspend: true
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    return response;
}

export const deleteWarehouse = async (WarehouseCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/warehouse/change-status/${WarehouseCode}`, {
        warehousecode: WarehouseCode,
        issuspend: true
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteDepartment = async (DepartmentCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/department/delete/${DepartmentCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteEquipmentType = async (EquipmentTypeCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/equipment/type/delete/${EquipmentTypeCode}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deletePackingType = async (PackingTypeCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/unit/delete/${PackingTypeCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteProductCategory = async (ProductCategoryCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/product-category/delete/${ProductCategoryCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteProductType = async (ProductTypeCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(`${baseUrl}/product-type/delete/${ProductTypeCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}