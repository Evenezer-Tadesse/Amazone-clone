// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {} from 'firebase/auth'
import 'firebase/copat/firebase'
import 'firebasecompat/auth'




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuwBV3bBIsym0P7H61OJAGBaY4R8Is8Fc",
  authDomain: "clone-493f6.firebaseapp.com",
  projectId: "clone-493f6",
  storageBucket: "clone-493f6.firebasestorage.app",
  messagingSenderId: "379804418677",
  appId: "1:379804418677:web:75588119af879a14b06e3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.fireStore()