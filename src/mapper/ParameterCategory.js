export const ParameterCategoryMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    ParameterCategoryCode: row.parameterCategoryCode,
    ParameterCategoryName: row.parameterCategoryName,
    Description: row.description,
    IsSuspend: row.isSuspend,
    key: index + 1 
  }));
}

export const ParameterCategoryMapToHttp = (data) => {
  const result = {
    parameterCategoryName: data.ParameterCategoryName,
    description: data.Description,
    isSuspend: data.IsSuspend
  }

  if (!!data.ParameterCategoryCode) {
    result.parameterCategoryCode = data.ParameterCategoryCode;
  }

  return result;
}