import { toNumber } from 'lodash';

export const months: string[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const currentYear: string = new Date().getFullYear().toString().slice(2);

export const years: string[] = Array.from({ length: 51 }, (_, index) =>
  (toNumber(currentYear) + index).toString()
);
