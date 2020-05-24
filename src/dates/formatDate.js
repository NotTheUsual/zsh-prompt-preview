import { format } from "date-fns";

export function getCurrentDate() {
  return format(new Date(Date.now()), 'yy-MM-dd');
}

export function getCurrentTime({ withSeconds = false } = {}) {
  const formatString = (withSeconds) ? 'HH:mm:ss' : 'HH:mm';
  return format(new Date(Date.now()), formatString);
}

export function getCurrent12HourTime() {
  // This actually appears to be ' '-padded, which isn't inherently supported by dateFns
  return format(new Date(Date.now()), 'h:mma').toLocaleLowerCase();
}

export function getCurrentDayDate() {
  return format(new Date(Date.now()), 'eee dd');
}

export function getCurrentUSDate() {
  return format(new Date(Date.now()), 'MM/dd/yy');
}
