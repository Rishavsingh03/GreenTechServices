// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPu-FnmK7rdJ4nMdIGHAA2s0J_ENCxA4Q",
  authDomain: "greentechservices.firebaseapp.com",
  projectId: "greentechservices",
  storageBucket: "greentechservices.appspot.com",
  messagingSenderId: "1012913383085",
  appId: "1:1012913383085:web:c928b2642c6d6776c8c824",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore();