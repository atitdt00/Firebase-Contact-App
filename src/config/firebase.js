// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAN5ATjl77NiBCWX78DVYcclRFOWdGrBI",
  authDomain: "contact-details-e5406.firebaseapp.com",
  projectId: "contact-details-e5406",
  storageBucket: "contact-details-e5406.firebasestorage.app",
  messagingSenderId: "690037114836",
  appId: "1:690037114836:web:86c0cf24010d280771b841"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);