export const mapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    EquipmentTypeCode: row.equipmenttypecode,
    EquipmentTypeName: row.equipmenttypename,
    Description: row.description,
    IsSuspend: row.issuspend,
    key: index + 1 
  }));
}

export const mapToHttp = (data) => {
  return {
    equipmenttypecode: data.EquipmentTypeCode,
    equipmenttypename: data.EquipmentTypeName,
    description: data.Description,
    issuspend: data.IsSuspend
  };
}