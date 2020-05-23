const LOGGED_IN_LINE = 's001';
const MACHINE_HOSTNAME = 'your-machine.gnu.ai.mit.edu'
const USERNAME = 'username';

export default function parsePrompt(input) {
  let parsedInput = input;

  parsedInput = parsedInput.replace(/%l/g, LOGGED_IN_LINE);
  parsedInput = parsedInput.replace(/%M/g, MACHINE_HOSTNAME);
  parsedInput = parsedInput.replace(/%m/g, MACHINE_HOSTNAME.split('.')[0]);
  parsedInput = parsedInput.replace(/%n/g, USERNAME);
  parsedInput = parsedInput.replace(/%y/g, `tty${LOGGED_IN_LINE}`);

  parsedInput = parsedInput.replace(/%\)/g, ')');
  parsedInput = parsedInput.replace(/%%/g, '%');

  return parsedInput;
}
