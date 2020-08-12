import { format } from 'date-fns'

const sameDay = (date1, date2) => {
  return format(date1, 'dLy') === format(date2, 'dLy')
}

const currentPeriod = (date) => {
  return format(date, 'a')
}

const sameWeek = (date1, date2) => {
  return format(date1, 'w') === format(date2, 'w')
}

const samePeriod = (date1, date2) => {
  return currentPeriod(date1) === currentPeriod(date2)
}

export {
  sameDay,
  samePeriod,
  currentPeriod,
  sameWeek
}
