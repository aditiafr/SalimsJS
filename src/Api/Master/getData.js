import axios from "axios";
import Cookies from "js-cookie";
import { EquipmentTypeMapFromHttp } from "../../mapper/EquipmentType";
import { DepartmentMapFromHttp } from "../../mapper/Department";
import { PackingTypeMapFromHttp } from "../../mapper/PackingType";
import { ProductCategoryMapFromHttp } from "../../mapper/ProductCategory";
import { ProductTypeMapFromHttp } from "../../mapper/ProductType";
import { ParameterCategoryMapFromHttp } from "../../mapper/ParameterCategory";
import { OtherExpenseMapFromHttp } from "../../mapper/OtherExpense";
import { selectedTranIdx } from "../../components/Dashboard/Global/Helper";

const baseURL = process.env.REACT_APP_BASEURL;


export const getBuilding = async (Suspend) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/building/list?sortParam=buildingcode&sortOrder=asc${Suspend ? `&isSuspend=${Suspend}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getProduct = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/product/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getBuildingNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/building/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getWarehouse = async (Suspend) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/warehouse/list${Suspend ? `?isSuspend=${Suspend}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getZona = async (Suspend) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/zona/list${Suspend ? `?isSuspend=${Suspend}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getZonaNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/zona/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.zona;
}

export const getSubZona = async (Suspend) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/subzona/list${Suspend ? `?isSuspend=${Suspend}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getSubZonaNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/subzona/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.subzonacode;
}

export const getWarehouseNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/warehouse/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getVendor = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/vendor/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getVendorNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/vendor/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getLocation = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/location/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getLocationNextCode = async (WarehouseCode) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/location/next-code?tranidx=${selectedTranIdx}&warehousecode=${WarehouseCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getSampleLocation = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/sampleloc/list?sortParam=locationcode&sortOrder=asc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getSampleLocationNextCode = async (BuildingCode) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/sampleloc/next-code?tranidx=${selectedTranIdx}&buildingcode=${BuildingCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getManufacture = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/manufacture/list?sortParam=manufacturecode&sortOrder=desc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getParameter = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter/list?sortParam=parcode&sortOrder=desc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getParameterNextCode = async (WarehouseCode) => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/parameter/next-code?tranidx=${selectedTranIdx}&warehousecode=${WarehouseCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getManufactureNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/manufacture/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getTestMethod = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/method/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTestMethodNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/method/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getTestPreparation = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/testpreparation/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTestPreparationNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/testpreparation/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getTimePoint = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/timepoint/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTimePointNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/timepoint/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getCustomer = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/customer/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
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

export const getParameterCategory = async (params) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter-category/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });

    return ParameterCategoryMapFromHttp(response.data.data);
}

export const getParameterCategoryNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter-category/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.parameterCategoryCode;
}

export const getOtherExpense = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/expense/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return OtherExpenseMapFromHttp(response.data.data);
}

export const getOtherExpenseNextCode = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/expense/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.expenseCode;
}

export const getEquipment = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/equipment/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getEquipmentNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/equipment/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            tranidx: selectedTranIdx,
            branchcode: '0001' // dont know what is this
        }
    });

    return response.data.data.equipment;
}

export const getPriceList = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/pricelist/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getPriceListNextCode = async () => {
    const token = Cookies.get('access_token');
    const selectedTranIdx = localStorage.getItem('selectedMenuKey');
    const response = await axios.get(`${baseURL}/pricelist/next-code`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            tranidx: selectedTranIdx,
            branchcode: '0001' // dont know what is this
        }
    });

    return response.data.data.pricecode;
}