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

export const postSample = async (Data) => {
    console.log(Data);
    
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/sample/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postQualityReference = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/quality/reference/store`, Data, {
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

export const postParameterCategory = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/parameter-category/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postOtherExpense = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/expense/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postParameter = async (ParameterData) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        ParameterData.tranidx = selectedTranIdx;
    }
    const response = await axios.post(`${baseUrl}/parameter/store`, ParameterData, {
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

export const postProduct = async (Data) => {
    const token = Cookies.get('access_token');
    const response = await axios.post(`${baseUrl}/product/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postZona = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        Data.tranidx = selectedTranIdx;
    }
    const response = await axios.post(`${baseUrl}/zona/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postSubZona = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        Data.tranidx = selectedTranIdx;
    }
    const response = await axios.post(`${baseUrl}/subzona/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postEquipment = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        Data.tranidx = selectedTranIdx;
    }
    Data.branchcode = "0001";
    const response = await axios.post(`${baseUrl}/equipment/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postPriceList = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        Data.tranidx = selectedTranIdx;
    }
    Data.branchcode = "0001";
    const response = await axios.post(`${baseUrl}/pricelist/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const postLabour = async (Data) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    if (selectedTranIdx) {
        Data.tranidx = selectedTranIdx;
    }
    Data.branchcode = "0001";
    const response = await axios.post(`${baseUrl}/labour/store`, Data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}   