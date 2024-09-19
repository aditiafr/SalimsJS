import axios from "axios";
import Cookies from "js-cookie";
import { EquipmentTypeMapFromHttp } from "../../mapper/EquipmentType";
import { DepartmentMapFromHttp } from "../../mapper/Department";
import { PackingTypeMapFromHttp } from "../../mapper/PackingType";
import { ProductCategoryMapFromHttp } from "../../mapper/ProductCategory";
import { ProductTypeMapFromHttp } from "../../mapper/ProductType";

const baseURL = process.env.REACT_APP_BASEURL;

export const getBuilding = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/building/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getBuildingNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/building/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getWarehouse = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/warehouse/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getWarehouseNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/warehouse/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getCity = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/city/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getStorageLocation = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/location/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
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
    const response = await axios.get(`${baseURL}/vendor/list`, {
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
    const response = await axios.get(`${baseURL}/equipment/type/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return EquipmentTypeMapFromHttp(response.data.data);
}

export const getDepartments = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/department/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return DepartmentMapFromHttp(response.data.data);
}

export const getDepartmentNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/department/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.departmentCode;
}

export const getPackingTypes = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/unit/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return PackingTypeMapFromHttp(response.data.data);
}

export const getPackingTypeNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/unit/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.unitCode;
}

export const getProductCategories = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/product-category/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return ProductCategoryMapFromHttp(response.data.data);
}

export const getProductCategoryNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/product-category/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.productCategoryCode;
}

export const getProductTypes = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/product-type/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return ProductTypeMapFromHttp(response.data.data);
}

export const getProductTypeNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/product-type/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.productTypeCode;
}