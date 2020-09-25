import React, { ReactElement, useEffect, useState } from 'react';

import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const HomePage = (): ReactElement => {
  const user = useUser();
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
      <div>
        <i>According to frontend,</i> you are {user.displayName} with email: {user.email}.
      </div>
      {basicUserInformation == null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <i>According to backend,</i> you are {basicUserInformation.name} with email:{' '}
          {basicUserInformation.email}.
        </div>
      )}
    </div>
  );
};

export default HomePage;
