import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBMUNfDqZuOdkKm18GnPBwCHLcIkve9tE4',
  authDomain: 'pantry-8e8b9.firebaseapp.com',
  databaseURL: 'https://pantry-8e8b9.firebaseio.com',
  projectId: 'pantry-8e8b9',
  storageBucket: 'pantry-8e8b9.appspot.com',
  messagingSenderId: '635803579841',
  appId: '1:635803579841:web:157b8bbe31014ba9eb6b40',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
