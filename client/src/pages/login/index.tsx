import React, { ReactElement, useState } from 'react';

import { signIn } from '../../actions/auth/authActions';

const Login = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      LOGIN
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={() => signIn(email, password)}></button>
    </div>
  );
};
export default Login;
