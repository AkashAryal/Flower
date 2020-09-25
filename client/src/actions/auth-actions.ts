import firebase from '../fbConfig';

// eslint-disable-next-line import/prefer-default-export
const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = (setError: React.Dispatch<React.SetStateAction<string>>): void => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch((e) => {
          setError(e.message);
        });
    });
};

export const logout = (): void => {
  firebase.auth().signOut();
};

export const hasIRB = (): boolean => {
  // use firebase to see if user has IRB on file.

  // for now return true;
  return true;
};
