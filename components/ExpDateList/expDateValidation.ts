import { toNumber } from 'lodash';

export const expDateValidation = (
  selectedItem: string,
  field: 'month' | 'year',
  expDate: { year: string; month: string }
) => {
  const currentYear = new Date().getFullYear().toString().slice(2);
  const currentMonth = new Date().getMonth() + 1;

  if (
    field === 'year' &&
    currentYear === selectedItem &&
    expDate.month &&
    toNumber(expDate.month) < currentMonth
  )
    return false;
  if (
    field === 'month' &&
    currentYear === expDate.year &&
    toNumber(selectedItem) < currentMonth
  )
    return false;
  return true;
};
