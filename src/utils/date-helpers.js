import { format } from 'date-fns';

const isSunday = () => {
  return format(Date.now() / 1000, 'EEEE') === 'Sunday';
}

const sameDay = (date1, date2) => {
  return format(date1, 'dLy') === format(date2, 'dLy')
}

export {
  isSunday,
  sameDay,
}
