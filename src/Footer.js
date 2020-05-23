import React from 'react';
import { MACHINE_HOSTNAME, USERNAME, LOGGED_IN_LINE } from "./_shared/config";


function Footer({ withPrivileges, setWithPrivileges }) {
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
      </dl>
    </footer>
  );
}

export default Footer;
