export const ParameterCategoryMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    ParameterCategoryCode: row.parcatcode,
    ParameterCategoryName: row.parcatname,
    Description: row.description,
    IsSuspend: row.issuspend,
    key: index + 1 
  }));
}

export const ParameterCategoryMapToHttp = (data) => {
  const result = {
    parcatname: data.ParameterCategoryName,
    description: data.Description,
    issuspend: data.IsSuspend
  }

  if (!!data.ParameterCategoryCode) {
    result.parcatcode = data.ParameterCategoryCode;
  }

  return result;
}