// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5oVkNOjOrqDpLriH26fpBjGUWEehuCRg",
  authDomain: "ascendmentor-6d81d.firebaseapp.com",
  projectId: "ascendmentor-6d81d",
  storageBucket: "ascendmentor-6d81d.appspot.com",
  messagingSenderId: "921121541813",
  appId: "1:921121541813:web:573f674229ff36fc54b8fc",
  measurementId: "G-L7F0XE69EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Initialize Analytics
const auth = getAuth(app);  // Initialize Firebase Authentication
const googleProvider = new GoogleAuthProvider();  // Initialize Google Auth Provider
const db = getFirestore(app);  // Initialize Firestore

export { auth, googleProvider, db, analytics };  // Exporting Firestore and other services
