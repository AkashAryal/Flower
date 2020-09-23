import React, { ReactElement, useState } from 'react';

import { signUp } from '../../actions/auth/authActions';
const Register = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={() => signUp(email, password)}></button>
    </div>
  );
};
export default Register;
