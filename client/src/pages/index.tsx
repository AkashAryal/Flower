import React, { ReactElement, useEffect, useState } from 'react';

import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const HomePage = (): ReactElement => {
  const user = useUser();

  return (
    <div>
      <div>Home Page</div>
      <button onClick={() => firebase.auth().signOut()}>Log out</button>
      <div>
        You are {user.displayName} with email: {user.email}.
      </div>
    </div>
  );
};

export default HomePage;
