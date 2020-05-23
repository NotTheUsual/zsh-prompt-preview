import { LOGGED_IN_LINE, MACHINE_HOSTNAME, USERNAME } from "../_shared/config";

export default function parsePrompt(input, { withPrivileges = false, lastCommandSuccessful = false } = {}) {
  let parsedInput = input;

  parsedInput = parsedInput.replace(/%l/g, LOGGED_IN_LINE.replace('tty', ''));
  parsedInput = parsedInput.replace(/%M/g, MACHINE_HOSTNAME);
  parsedInput = parsedInput.replace(/%m/g, MACHINE_HOSTNAME.split('.')[0]);
  parsedInput = parsedInput.replace(/%n/g, USERNAME);
  parsedInput = parsedInput.replace(/%y/g, LOGGED_IN_LINE);

  parsedInput = parsedInput.replace(/%#/g, withPrivileges ? '#' : '%');
  parsedInput = parsedInput.replace(/%\?/g, lastCommandSuccessful ? '0' : '1');

  parsedInput = parsedInput.replace(/%\)/g, ')');
  parsedInput = parsedInput.replace(/%%/g, '%');

  return parsedInput;
}
