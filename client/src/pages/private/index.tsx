import React, { ReactElement } from 'react';

import { logout } from '../../actions/auth/authActions';
import PrivateComponent from '../../hoc/PrivateComponent';

const SuperSecretRoute = (): ReactElement => {
  return (
    <PrivateComponent>
      <div>
        SuperSecretRoute
        <button onClick={logout}>Logout</button>
      </div>
    </PrivateComponent>
  );
};

export default SuperSecretRoute;
