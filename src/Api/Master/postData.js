import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;

// DATA
export const postBuilding = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/building/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postDepartment = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/department/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postWarehouse = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/warehouse/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postLocation = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/location/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postSampleLocation = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/sampleloc/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postManufacture = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/manufacture/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postVendor = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/vendor/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postTimePoint = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/timepoint/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postTestMethod = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/method/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postTestPreparation = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/testpreparation/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postCustomer = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.post(`${baseUrl}/customer/store`,
        {
            ...Data,
            tranidx: selectedTranIdx
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return response;
}

export const postEquipmentType = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/equipment/type/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postPackingType = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/unit/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postProductCategory = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product-category/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postProductType = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product-type/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postProduct = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}