// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration for your client app
const firebaseConfig = {
  apiKey: "AIzaSyB8qzBBpnINce9E5tOskGQqkNMHLglO8vs",
  authDomain: "restauracjapracownik.firebaseapp.com",
  projectId: "restauracjapracownik",
  storageBucket: "restauracjapracownik.appspot.com",
  messagingSenderId: "544492857440",
  appId: "1:544492857440:web:c950173dd55d272a2abb05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore for database access

// Export the initialized Firebase app and Firestore database
export { app, db };
