import axios from "axios";
import Cookies from "js-cookie";
import { EquipmentTypeMapFromHttp } from "../../mapper/EquipmentType";
import { DepartmentMapFromHttp } from "../../mapper/Department";
import { PackingTypeMapFromHttp } from "../../mapper/PackingType";
import { ProductCategoryMapFromHttp } from "../../mapper/ProductCategory";
import { ProductTypeMapFromHttp } from "../../mapper/ProductType";
import { selectedTranIdx } from "../../components/Dashboard/Global/Helper";

const baseURL = process.env.REACT_APP_BASEURL;


export const getBuilding = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/building/list?sortParam=buildingcode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getLabour = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/labour/list?sortParam=labourcode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getExpense = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/expense/list?sortParam=expensecode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getEquipment = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/equipment/list?sortParam=equipmentcode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getTempCondition = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/temp/list?sortParam=tempcode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getQualityReference = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/quality/reference/list?sortParam=qrid&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getUnit = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/unit/list?sortParam=unitcode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getFormula = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/formula/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getSample = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/sample/list?sortParam=samplecode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getSampleOne = async (Code) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/sample/one/0001/${Code}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data;
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
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/warehouse/list?sortParam=warehousecode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getZona = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=${true || 1}` : ''
    const response = await axios.get(`${baseURL}/zona/list?sortParam=zonacode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getSubZona = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=${true || 1}` : ''
    const response = await axios.get(`${baseURL}/subzona/list?sortParam=subzonacode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ key: index + 1, ...row }));
}

export const getWarehouseNextCode = async () => {
    const token = Cookies.get('access_token');
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
    const response = await axios.get(`${baseURL}/sampleloc/next-code?tranidx=${selectedTranIdx}&buildingcode=${BuildingCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getManufacture = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/manufacture/list?sortParam=manufacturecode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getParameter = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter/list?sortParam=parcode&sortOrder=asc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getParameterCategory = async () => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter-category/list?sortParam=parcatcode&sortOrder=asc`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getParameterNextCode = async (WarehouseCode) => {
    const token = Cookies.get('access_token');
    const response = await axios.get(`${baseURL}/parameter/next-code?tranidx=${selectedTranIdx}&warehousecode=${WarehouseCode}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getManufactureNextCode = async () => {
    const token = Cookies.get('access_token');
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
    const response = await axios.get(`${baseURL}/timepoint/next-code?tranidx=${selectedTranIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data
}

export const getCustomer = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/customer/list?sortParam=customercode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getproductType = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/product-type/list?sortParam=prodtypecode&sortOrder=asc${isSuspend}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.map((row, index) => ({ ...row, key: index + 1 }));
}

export const getProductCat = async (Suspend) => {
    const token = Cookies.get('access_token');
    const isSuspend = Suspend ? `&isSuspend=0` : ''
    const response = await axios.get(`${baseURL}/product-category/list?sortParam=prodcatcode&sortOrder=asc${isSuspend}`, {
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

    console.log("res", response);


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