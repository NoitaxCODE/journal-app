
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyA9i7hVZL5OBQ7R5a_4iHWsTTt8CxGYNFw",
  authDomain: "react-cursos-4043d.firebaseapp.com",
  projectId: "react-cursos-4043d",
  storageBucket: "react-cursos-4043d.appspot.com",
  messagingSenderId: "493571142321",
  appId: "1:493571142321:web:ba1fc8d4aaea4879256890"
};

// Initialize Firebase
 export const FirebaseApp = initializeApp( firebaseConfig );
 
 export const FirebaseAuth = getAuth( FirebaseApp );
 export const FirebaseDB = getFirestore( FirebaseApp );