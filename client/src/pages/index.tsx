import React, { ReactElement, useEffect, useState } from 'react';

import firebase from '../fbConfig';
import PrivateComponent from '../hoc/PrivateComponent';

const HomePage = (): ReactElement => {
  const [basicUserInformation, setBasicUserInformation] = useState<
    { readonly name: string; readonly email: string } | undefined
  >();

  useEffect(() => {
    firebase
      .functions()
      .httpsCallable('getUserNameForTesting')()
      .then((r) => setBasicUserInformation(r.data));
  }, []);

  return (
    <PrivateComponent>
      <>
        <div>Home Page</div>
        {basicUserInformation == null ? (
          <div>Loading...</div>
        ) : (
          <div>
            You are {basicUserInformation.name} with email: {basicUserInformation.email}.
          </div>
        )}
      </>
    </PrivateComponent>
  );
};

export default HomePage;
