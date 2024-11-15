// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3MW4UxGSLgNIdLnUdBCHj4irbsFFFfv0",
    authDomain: "dtc-05-30a98.firebaseapp.com",
    projectId: "dtc-05-30a98",
    storageBucket: "dtc-05-30a98.firebasestorage.app",
    messagingSenderId: "449221937375",
    appId: "1:449221937375:web:2f23ac39c791c83298016a"
};

// Initialize Firebase
// initialize Firestore database if using it
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();