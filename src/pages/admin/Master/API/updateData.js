import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASEURL;


export const updateBuilding = async (BuildingCode, BuildingData) => {
    const token = Cookies.get('accessToken');
    const response = await axios.patch(`${baseUrl}/put/building?BuildingCode=${BuildingCode}`, BuildingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateWarehouse = async (WarehouseCode, WarehouseData) => {
    const token = Cookies.get('accessToken');
    const response = await axios.patch(`${baseUrl}/put/warehouse?WarehouseCode=${WarehouseCode}`, WarehouseData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}