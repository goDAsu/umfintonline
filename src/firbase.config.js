import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCupusWyWg0OQgcCrRwZeqKyvSG20FdROA",
  authDomain: "umfint-a6096.firebaseapp.com",
  projectId: "umfint-a6096",
  storageBucket: "umfint-a6096.appspot.com",
  messagingSenderId: "600719350408",
  appId: "1:600719350408:web:b7cf8eeb6794f79a7c1d3d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a Firestore instance
const db = firebase.firestore();

export { firebase, db };
