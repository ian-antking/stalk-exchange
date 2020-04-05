import { format } from 'date-fns';

const sameDay = (date1, date2) => {
  return format(date1, 'dLy') === format(date2, 'dLy');
}

const currentPeriod = (date) => {
  return format(date, 'a');
}

const samePeriod = (date1, date2) => {
  return currentPeriod(date1) === currentPeriod(date2);
}

export {
  sameDay,
  samePeriod,
  currentPeriod,
}
