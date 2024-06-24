// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Added this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "enter your details here",
  authDomain: "enter your details here",
  projectId: "enter your details here",
  storageBucket: "enter your details here",
  messagingSenderId: "enter your details here",
  appId: "enter your details here",
  measurementId: "enter your details here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getFirestore(app); // Added this line

export { auth, googleProvider, db }; // Exporting db
