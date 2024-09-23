export const ProductCategoryMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    ProductCategoryCode: row.productCategoryCode,
    ProductCategoryName: row.productCategoryName,
    IsCategorySample: row.isCategorySample,
    Description: row.description,
    IsSuspend: row.isSuspend,
    key: index + 1 
  }));
}

export const ProductCategoryMapToHttp = (data) => {
  const result = {
    productCategoryName: data.ProductCategoryName,
    isCategorySample: data.IsCategorySample,
    description: data.Description,
    isSuspend: data.IsSuspend
  }

  // The field is not exist in form
  result.isCategorySample = false;

  if (!!data.ProductCategoryCode) {
    result.productCategoryCode = data.ProductCategoryCode;
  }

  return result;
}