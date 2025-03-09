import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh-SmqT2hKsVku1dzLNPADfJ9xk7ksHgs",
  authDomain: "saudimorothplatform.firebaseapp.com",
  projectId: "saudimorothplatform",
  storageBucket: "saudimorothplatform.firebasestorage.app",
  messagingSenderId: "877553029884",
  appId: "1:877553029884:web:6751868112c89b6d793d79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
export const auth=getAuth(app);