export const ProductTypeMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    ProductTypeCode: row.productTypeCode,
    ProductTypeName: row.productTypeName,
    Description: row.description,
    IsSuspend: row.issuspend,
    key: index + 1 
  }));
}

export const ProductTypeMapToHttp = (data) => {
  const result = {
    productTypeName: data.ProductTypeName,
    description: data.Description,
    isSuspend: data.IsSuspend
  }

  if (!!data.ProductTypeCode) {
    result.productTypeCode = data.ProductTypeCode;
  }

  return result;
}