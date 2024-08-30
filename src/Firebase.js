// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQMb3jSiVYpIe6BV8pb0kjYJOiK-7BT_0",
  authDomain: "csblog-1aa18.firebaseapp.com",
  projectId: "csblog-1aa18",
  storageBucket: "csblog-1aa18.appspot.com",
  messagingSenderId: "299586585662",
  appId: "1:299586585662:web:d06924d0a5ee57e9fdbd6f",
  measurementId: "G-RQRQSSB38F",
  storageBucket: 'gs://csblog-1aa18.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);