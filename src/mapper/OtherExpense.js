export const OtherExpenseMapFromHttp = (data) => {
  return data.map((row, index) => ({ 
    OtherExpenseCode: row.expenseCode,
    OtherExpenseName: row.expenseName,
    DefaultValue: row.defaultValue,
    Description: row.description,
    IsDefaultTakingSample: row.isDefaultTakingSample,
    IsSuspend: row.isSuspend,
    key: index + 1 
  }));
}

export const OtherExpenseMapToHttp = (data) => {
  const result = {
    expenseName: data.OtherExpenseName,
    defaultValue: data.DefaultValue,
    description: data.Description,
    isDefaultTakingSample: data.IsDefaultTakingSample,
    isSuspend: data.IsSuspend
  }
  console.log('adadadwad aaa', result.defaultValue)

  if (!!result.defaultValue) {
  console.log('adadadwad dadadada', result.defaultValue)

    result.defaultValue = result.defaultValue.replace(/\./g, '');
  }

  console.log('adadadwad dddd', result.defaultValue)

  if (!!data.OtherExpenseCode) {
    result.expenseCode = data.OtherExpenseCode;
  }

  return result;
}