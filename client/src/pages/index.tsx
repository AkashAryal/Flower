import React, { ReactElement, useEffect, useState } from 'react';

import firebase from '../fbConfig';

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
    <div>
      <div>Home Page</div>
      <button onClick={() => firebase.auth().signOut()}>Log out</button>
      {basicUserInformation == null ? (
        <div>Loading...</div>
      ) : (
        <div>
          You are {basicUserInformation.name} with email: {basicUserInformation.email}.
        </div>
      )}
    </div>
  );
};

export default HomePage;
