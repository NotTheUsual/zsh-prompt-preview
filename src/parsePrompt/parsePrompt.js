import { LOGGED_IN_LINE, MACHINE_HOSTNAME, USERNAME, WORKING_DIRECTORY } from "../_shared/config";
import { getCurrentDate, getCurrentTime, getCurrent12HourTime } from "../dates/formatDate";

export default function parsePrompt(input, { withPrivileges = false, lastCommandSuccessful = false } = {}) {
  let parsedInput = input;

  parsedInput = parsedInput.replace(/%l/g, LOGGED_IN_LINE.replace('tty', ''));
  parsedInput = parsedInput.replace(/%M/g, MACHINE_HOSTNAME);
  parsedInput = parsedInput.replace(/%m/g, MACHINE_HOSTNAME.split('.')[0]);
  parsedInput = parsedInput.replace(/%n/g, USERNAME);
  parsedInput = parsedInput.replace(/%y/g, LOGGED_IN_LINE);

  parsedInput = parsedInput.replace(/%#/g, withPrivileges ? '#' : '%');
  parsedInput = parsedInput.replace(/%\?/g, lastCommandSuccessful ? '0' : '1');
  parsedInput = parsedInput.replace(/%(d|\/)/g, WORKING_DIRECTORY);
  parsedInput = parsedInput.replace(/%(\d+)(d|\/)/g, (match, count) => WORKING_DIRECTORY.split('/').slice(-Number(count)).join('/'));
  parsedInput = parsedInput.replace(/%~/g, WORKING_DIRECTORY.replace('/Users/username', '~'));

  parsedInput = parsedInput.replace(/%D/g, () => getCurrentDate());
  parsedInput = parsedInput.replace(/%T/g, () => getCurrentTime());
  parsedInput = parsedInput.replace(/%(t|@)/g, () => getCurrent12HourTime());
  parsedInput = parsedInput.replace(/%\*/g, () => getCurrentTime({ withSeconds: true }));

  parsedInput = parsedInput.replace(/%\)/g, ')');
  parsedInput = parsedInput.replace(/%%/g, '%');

  return parsedInput;
}
