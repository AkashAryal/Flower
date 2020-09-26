import React, { ReactElement, useEffect, useState } from 'react';

import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const HomePage = (): ReactElement => {
  const user = useUser();
  const [basicUserInformation, setBasicUserInformation] = useState<
    { readonly name: string; readonly email: string } | undefined
  >();
  const [interestedStudies, setInterestedStudies] = useState<readonly AppStudy[] | undefined>();

  useEffect(() => {
    firebase
      .functions()
      .httpsCallable('getUserNameForTesting')()
      .then((r) => setBasicUserInformation(r.data));
    firebase
      .functions()
      .httpsCallable('getInterested')()
      .then((r) => setInterestedStudies(r.data));
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
      {interestedStudies && (
        <div>
          <h3>Studies you might be interested in</h3>
          {interestedStudies.map((it) => (
            <div key={it.id}>
              <div>{it.projectName}</div>
              <div>{it.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
