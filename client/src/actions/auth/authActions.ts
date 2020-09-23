import firebase from '../../fbConfig';

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
        .then(() => console.log('user logedd in'))
        .catch((e) => {
          console.log('error', e);
          setError(e.message);
        });
    });
};

export const logout = (): void => {
  firebase.auth().signOut();
};
