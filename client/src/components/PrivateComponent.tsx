import React, { ReactElement, useState, useEffect } from 'react';

import { signIn } from '../actions/auth/authActions';
import firebase from '../fbConfig';

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

const PrivateComponent = ({ children }: { readonly children: ReactElement }): ReactElement => {
  const [status, setStatus] = useState<'LOADING' | 'SIGNED_IN' | 'SIGNED_OUT'>('LOADING');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setStatus('SIGNED_IN');
      } else {
        setStatus('SIGNED_OUT');
      }
    });
  }, []);

  if (status === 'LOADING') {
    return <h1>Loading ......</h1>;
  } else if (status === 'SIGNED_OUT') {
    return <Login />;
  } else {
    return children;
  }
};

export default PrivateComponent;
