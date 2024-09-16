import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


// MASTER DATA
export const postBuilding = async (BuildingData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/building/store`, BuildingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postDepartment = async (DepartmentData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/department/store`, DepartmentData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postWarehouse = async (WarehouseData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/warehouse/store`, WarehouseData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postSampleSLocation = async (SampleSLocationData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/post/sampleLocation`, SampleSLocationData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postVendor = async (VendorData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/vendor/store`, VendorData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postTestMethode = async (TestMethodeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/post/testMethode`, TestMethodeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postCustomer = async (CustomerData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/post/customer`, CustomerData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postEquipmentType = async (EquipmentTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/equipment/type/store`, EquipmentTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postPackingType = async (PackingTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/unit/store`, PackingTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postProductCategory = async (ProductCategoryData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product-category/store`, ProductCategoryData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postProductType = async (ProductTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product-type/store`, ProductTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}