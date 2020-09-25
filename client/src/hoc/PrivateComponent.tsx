import React, { ReactElement, useState, useEffect } from 'react';

import router from 'next/router';

import firebase from '../fbConfig';

const PrivateComponent = ({ children }: { readonly children: ReactElement }): ReactElement => {
  const [status, setStatus] = useState<'LOADING' | 'SIGNED_IN'>('LOADING');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setStatus('SIGNED_IN');
      } else {
        router.push('/');
      }
    });
  }, []);

  if (status === 'LOADING') {
    return <h1>Loading ......</h1>;
  } else {
    return children;
  }
};

export default PrivateComponent;
