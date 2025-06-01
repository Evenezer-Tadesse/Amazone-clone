
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU3lfNtoAPSbCJScpdgCiQxx3WAQKP7fg",
  authDomain: "fir-af6c5.firebaseapp.com",
  projectId: "fir-af6c5",
  storageBucket: "fir-af6c5.firebasestorage.app",
  messagingSenderId: "1093819217462",
  appId: "1:1093819217462:web:3194b9c11a4ed77e77ca97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
