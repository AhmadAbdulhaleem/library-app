import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD-gb161R2W29JO5jACOm9IE9RPqWuv4sA',
  authDomain: 'library-app-d9840.firebaseapp.com',
  databaseURL: 'https://library-app-d9840.firebaseio.com',
  projectId: 'library-app-d9840',
  storageBucket: 'library-app-d9840.appspot.com',
  messagingSenderId: '1040629297618',
  appId: '1:1040629297618:web:095c34c072b5a4da',
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseBooks = firebaseDB.ref('books');
const firebaseCovers = firebaseDB.ref('covers');

export { firebase, firebaseDB, firebaseBooks, firebaseCovers };
