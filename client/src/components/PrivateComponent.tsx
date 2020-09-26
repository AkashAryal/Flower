import React, { ReactElement, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { signIn } from '../actions/auth-actions';
import firebase from '../fbConfig';
import useProfileFromFirestore from '../hooks/profile';
import { useSetUser } from '../hooks/user';

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

/** Prevent children from being rendered if profile is empty. */
const OnboardingGuard = ({ children }: { readonly children: ReactElement }): ReactElement => {
  const profile = useProfileFromFirestore();
  const router = useRouter();

  if (profile == null) return <div>Loading...</div>;
  if (
    router.asPath !== '/profile' &&
    (profile.classYear.trim() === '' ||
      profile.birthday.trim() === '' ||
      profile.major.trim() === '' ||
      profile.selfIntroduction.trim() === '' ||
      profile.interests.length === 0 ||
      profile.skills.length === 0)
  ) {
    router.push('/profile');
    return <div>Redirecting</div>;
  }
  return children;
};

const PrivateComponent = ({ children }: { readonly children: ReactElement }): ReactElement => {
  const [status, setStatus] = useState<'LOADING' | 'SIGNED_IN' | 'SIGNED_OUT'>('LOADING');
  const setUser = useSetUser();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email, photoURL } = authUser;
        if (displayName == null || email == null) {
          throw new Error('Impossible for google user');
        }
        setUser({
          displayName,
          email,
          profilePicture: photoURL ?? 'https://i.stack.imgur.com/34AD2.jpg',
        });
        setStatus('SIGNED_IN');
      } else {
        setStatus('SIGNED_OUT');
      }
    });
  }, [setUser]);

  if (status === 'LOADING') {
    return <h1>Loading ......</h1>;
  } else if (status === 'SIGNED_OUT') {
    return <Login />;
  } else {
    return <OnboardingGuard>{children}</OnboardingGuard>;
  }
};

export default PrivateComponent;
