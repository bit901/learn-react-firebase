// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFrwudOPZr41kJEQezmCs35Q86gf2qvZA",
  authDomain: "learn-react-firebase-158db.firebaseapp.com",
  projectId: "learn-react-firebase-158db",
  storageBucket: "learn-react-firebase-158db.appspot.com",
  messagingSenderId: "998765757628",
  appId: "1:998765757628:web:e1ace3cea1c5e81f667cb9",
  measurementId: "G-WJ4MFDC0NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();