import React from 'react';
import { MACHINE_HOSTNAME, USERNAME, LOGGED_IN_LINE, WORKING_DIRECTORY } from "./_shared/config";


function Footer({ withPrivileges, setWithPrivileges, lastCommandSuccessful, setLastCommandSuccessful }) {
  return (
    <footer className="footer">
      <dl>
        <dt>The line (tty) the user is logged in on</dt>
        <dd>{LOGGED_IN_LINE}</dd>
        <dt>Machine hostname</dt>
        <dd>{MACHINE_HOSTNAME}</dd>
        <dt>Username</dt>
        <dd>{USERNAME}</dd>
        <dt>With privileges</dt>
        <dd><input type='checkbox' checked={withPrivileges} onChange={event => setWithPrivileges(event.target.checked)} /></dd>
        <dt>Last command successful</dt>
        <dd><input type='checkbox' checked={lastCommandSuccessful} onChange={event => setLastCommandSuccessful(event.target.checked)} /></dd>
        <dt>Working directory</dt>
        <dd>{WORKING_DIRECTORY}</dd>
      </dl>
    </footer>
  );
}

export default Footer;
