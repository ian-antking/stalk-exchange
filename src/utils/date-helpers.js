import { format } from 'date-fns';

const isSunday = () => {
  return format(Date.now() / 1000, 'EEEE') === 'Sunday';
}

export {
  isSunday,
}
