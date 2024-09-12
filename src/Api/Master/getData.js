import axios from "axios";
import Cookies from "js-cookie";
import { EquipmentTypeMapFromHttp } from "../../mapper/EquipmentType";
import { DepartmentMapFromHttp } from "../../mapper/Department";
import { PackingTypeMapFromHttp } from "../../mapper/PackingType";
import { ProductCategoryMapFromHttp } from "../../mapper/ProductCategory";

const baseURL = process.env.REACT_APP_BASEURL;

export const getBuilding = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/building`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getWarehouse = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/wareouse`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getSampleSLocation = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/samplelocation`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getVendor = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/vendor/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getTestMethode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/testmethode`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getTimePoint = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/timepoint`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getCustomer = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/get/customer`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((row, index) => ({ ...row, key: index + 1 }));
} 

export const getEquipmentType = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/equipment/type/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return EquipmentTypeMapFromHttp(response.data.data);
} 

export const getDepartments = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/department/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return DepartmentMapFromHttp(response.data.data);
} 

export const getDepartmentNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/department/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.departmentCode;
}

export const getPackingTypes = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/unit/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return PackingTypeMapFromHttp(response.data.data);
}

export const getPackingTypeNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/unit/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.unitCode;
}

export const getProductCategories = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/product-category/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return ProductCategoryMapFromHttp(response.data.data);
}

export const getProductCategoryNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/v1/product-category/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.productCategoryCode;
}