import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateBuilding = async (BuildingCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/building/update/${BuildingCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateQualityReference = async (QualityId, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/quality/reference/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateProduct = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/product/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateCustomer = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/customer/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTestMethod = async (MethodCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/method/update/${MethodCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTestPreparation = async (PreparationCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/testpreparation/update/${PreparationCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTimePoint = async (TimePointCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/timepoint/update/${TimePointCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateWarehouse = async (WarehouseCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/warehouse/update/${WarehouseCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateLocation = async (WarehouseCode, LocationCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/location/update/${WarehouseCode}/${LocationCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateSampleLocation = async (BuildingCode, SampleLocationCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/sampleloc/update/${BuildingCode}/${SampleLocationCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateDepartment = async (DepartmentCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/department/update/${DepartmentCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateSampleSLocation = async (BuildingCode, SampleSLocationCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/sampleLocation?BuildingCode=${BuildingCode}&LocationCode=${SampleSLocationCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateManufacture = async (ManufactureCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/manufacture/update/${ManufactureCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateVendor = async (BranchCode, VendorCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/vendor/update/${BranchCode}/${VendorCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTestMethode = async (MethodId, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/put/testMethode?methodId=${MethodId}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateEquipmentType = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/equipment/type/update`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updatePackingType = async (PackingTypeCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/unit/update/${PackingTypeCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateProductCategory = async (ProductCategoryCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/product-category/update/${ProductCategoryCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateProductType = async (ProductTypeCode, Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.put(`${baseUrl}/product-type/update/${ProductTypeCode}`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}