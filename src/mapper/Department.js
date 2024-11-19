export const DepartmentMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    DepartmentCode: row.departmentcode,
    DepartmentName: row.departmentname,
    Description: row.description,
    IsSuspend: row.isSuspend,
    key: index + 1 
  }));
}

export const DepartmentMapToHttp = (data) => {
  const result = {
    departmentName: data.DepartmentName,
    description: data.Description,
    isSuspend: data.IsSuspend
  }

  if (!!data.DepartmentCode) {
    result.departmentCode = data.DepartmentCode;
  }

  return result;
}