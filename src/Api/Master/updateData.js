import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateBuilding = async (BuildingCode, BuildingData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/building/update/${BuildingCode}`, BuildingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateWarehouse = async (WarehouseCode, WarehouseData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/warehouse/update/${WarehouseCode}`, WarehouseData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateDepartment = async (DepartmentCode, DepartmentData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/department/update/${DepartmentCode}`, DepartmentData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateSampleSLocation = async (BuildingCode, SampleSLocationCode, SampleSLocationData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/sampleLocation?BuildingCode=${BuildingCode}&LocationCode=${SampleSLocationCode}`, SampleSLocationData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateVendor = async (BranchCode, VendorCode, VendorData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/vendor?branchCode=${BranchCode}&vendorCode=${VendorCode}`, VendorData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTestMethode = async (MethodId, TestMethodeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/testMethode?methodId=${MethodId}`, TestMethodeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateCustomer = async (CustomerCode, CustomerData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/customer?CustomerCode=${CustomerCode}`, CustomerData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateEquipmentType = async (EquipmentTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/equipment/type/update`, EquipmentTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updatePackingType = async (PackingTypeCode, PackingTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/unit/update/${PackingTypeCode}`, PackingTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateProductCategory = async (ProductCategoryCode, ProductCategoryData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/product-category/update/${ProductCategoryCode}`, ProductCategoryData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateProductType = async (ProductTypeCode, ProductTypeData) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/product-type/update/${ProductTypeCode}`, ProductTypeData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}