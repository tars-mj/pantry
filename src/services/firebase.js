import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAk7MhJWl_D1IeGc_ujwlc9s8bMiJ4wFq8',
  authDomain: 'pantry-e461a.firebaseapp.com',
  databaseURL: 'https://pantry-e461a.firebaseio.com',
  projectId: 'pantry-e461a',
  storageBucket: 'pantry-e461a.appspot.com',
  messagingSenderId: '405837585702',
  appId: '1:405837585702:web:8cf0649bbd4c09778c35e7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
