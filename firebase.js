import firebase from 'firebase';
require('@firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_C_Yf6Hodf0KTuErqOgAIg8HuschVyQc",
  authDomain: "reminder-app-9e63b.firebaseapp.com",
  projectId: "reminder-app-9e63b",
  storageBucket: "reminder-app-9e63b.appspot.com",
  messagingSenderId: "110326141448",
  appId: "1:110326141448:web:a4022bdd48950a163037bd"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export default db;
