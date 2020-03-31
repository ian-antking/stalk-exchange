import { format } from 'date-fns';

const isSunday = () => {
  return format(Date.now() / 1000, 'EEEE') === 'Sunday';
}

const sameDay = (date1, date2) => {
  return format(date1, 'dLy') === format(date2, 'dLy');
}

const samePeriod = (date1, date2) => {
  return format(date1, 'a..aaa') === format(date2, 'a..aaa');
}

export {
  isSunday,
  sameDay,
  samePeriod,
}
