import React, { ReactElement } from 'react';

import { logout } from '../../actions/auth/authActions';

const SuperSecretRoute = (): ReactElement => {
  return (
    <div>
      SuperSecretRoute
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default SuperSecretRoute;
