import React from 'react';

import { logout } from '../../actions/auth/authActions';
import withAuth from '../../hoc/PrivateComponent';

const SuperSecretRoute = () => {
  return (
    <div>
      SuperSecretRoute
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(SuperSecretRoute);
