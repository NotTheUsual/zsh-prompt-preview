import { format } from "date-fns";

export function getCurrentDate() {
  return format(new Date(Date.now()), 'yy-MM-dd');
}

export function getCurrentTime({ withSeconds = false } = {}) {
  const formatString = (withSeconds) ? 'HH:mm:ss' : 'HH:mm';
  return format(new Date(Date.now()), formatString);
}

export function getCurrent12HourTime() {
  // `hh` if it needs to be 02:12
  return format(new Date(Date.now()), 'h:mma').toLocaleLowerCase();
}
