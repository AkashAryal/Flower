import React, { ReactElement, useState } from 'react';

import { signIn } from '../../actions/auth/authActions';

const Login = (): ReactElement => {
  const [error, setError] = useState('');
  return (
    <div>
      LOGIN
      <button type="submit" onClick={() => signIn(setError)}>
        Login
      </button>
      {error && <p>{`Authentication Failed: ${error}`}</p>}
    </div>
  );
};
export default Login;
