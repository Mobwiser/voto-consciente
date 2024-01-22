// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBT2l0KFJhy00w1wjyMZJCgcx-lyvhklUU",
    authDomain: "voto-consciente.firebaseapp.com",
    projectId: "voto-consciente",
    storageBucket: "voto-consciente.appspot.com",
    messagingSenderId: "658550108867",
    appId: "1:658550108867:web:f6fe188fc2296facc0e876",
    measurementId: "G-Q4RC1SY1JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const appFirebaseDb = getFirestore(app);

