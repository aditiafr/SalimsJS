export const PackingTypeMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    PackingTypeCode: row.unitCode,
    PackingTypeName: row.unitName,
    Description: row.description,
    IsSuspend: row.isSuspend,
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