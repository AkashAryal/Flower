import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyC5qvTeVaoj2KPSzGlqGvDd78fKilXao-c',
  authDomain: 'flower-99e48.firebaseapp.com',
  databaseURL: 'https://flower-99e48.firebaseio.com',
  projectId: 'flower-99e48',
  storageBucket: 'flower-99e48.appspot.com',
  messagingSenderId: '998394920383',
  appId: '1:998394920383:web:cf5b1152ff79d2621f350a',
  measurementId: 'G-HQFPM48TK8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.functions();
}

export default firebase;
