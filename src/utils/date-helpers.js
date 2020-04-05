import { format } from 'date-fns';

const sameDay = (date1, date2) => {
  return format(date1, 'dLy') === format(date2, 'dLy');
}

const currentPeriod = () => {
  return format(Date.now(), 'a..aaa');
}

const samePeriod = (date1, date2) => {
  return format(date1, 'a..aaa') === format(date2, 'a..aaa');
}

export {
  sameDay,
  samePeriod,
  currentPeriod,
}
