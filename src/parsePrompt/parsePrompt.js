import { LOGGED_IN_LINE, MACHINE_HOSTNAME, USERNAME } from "../_shared/config";

export default function parsePrompt(input, { withPrivileges = false } = {}) {
  let parsedInput = input;

  parsedInput = parsedInput.replace(/%l/g, LOGGED_IN_LINE.replace('tty', ''));
  parsedInput = parsedInput.replace(/%M/g, MACHINE_HOSTNAME);
  parsedInput = parsedInput.replace(/%m/g, MACHINE_HOSTNAME.split('.')[0]);
  parsedInput = parsedInput.replace(/%n/g, USERNAME);
  parsedInput = parsedInput.replace(/%y/g, LOGGED_IN_LINE);

  if (parsedInput.match(/%#/)) {
    parsedInput = (withPrivileges)
      ? parsedInput.replace(/%#/g, '#')
      : parsedInput.replace(/%#/g, '%');
  }

  parsedInput = parsedInput.replace(/%\)/g, ')');
  parsedInput = parsedInput.replace(/%%/g, '%');

  return parsedInput;
}
