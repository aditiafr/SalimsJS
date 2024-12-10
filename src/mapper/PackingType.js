export const PackingTypeMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    PackingTypeCode: row.unitcode,
    PackingTypeName: row.unitname,
    Description: row.description,
    IsSuspend: row.issuspend,
    key: index + 1 
  }));
}

export const PackingTypeMapToHttp = (data) => {
  const result = {
    unitName: data.PackingTypeName,
    description: data.Description,
    isSuspend: data.IsSuspend
  }

  if (!!data.PackingTypeCode) {
    result.unitCode = data.PackingTypeCode;
  }

  return result;
}