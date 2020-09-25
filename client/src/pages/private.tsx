import React, { ReactElement } from 'react';

import { logout } from '../actions/auth-actions';

const SuperSecretRoute = (): ReactElement => {
  return (
    <div>
      SuperSecretRoute
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default SuperSecretRoute;
