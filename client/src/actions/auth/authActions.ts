import firebase from '../../fbConfig';

// eslint-disable-next-line import/prefer-default-export
export const signIn = (email: string, password: string): void => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((e) => console.log('user logedd in', e))
        .catch((e) => console.log('error', e));
    });
};

export const logout = (): void => {
  firebase.auth().signOut();
};

export const signUp = (email: string, password: string): void => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    })
    .then(() => console.log('user created', firebase.auth().currentUser));
};
