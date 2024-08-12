// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Enter details",
  authDomain: "Enter details",
  projectId: "Enter details",
  storageBucket: "Enter details",
  messagingSenderId: "Enter details",
  appId: "Enter details",
  measurementId: "Enter details"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Initialize Analytics
const auth = getAuth(app);  // Initialize Firebase Authentication
const googleProvider = new GoogleAuthProvider();  // Initialize Google Auth Provider
const db = getFirestore(app);  // Initialize Firestore

export { auth, googleProvider, db, analytics };  // Exporting Firestore and other services
