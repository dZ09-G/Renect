// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyComvWqbHZ-6oB8E6cN_tvOKWkgDQr1NJE",
  authDomain: "social-media-react-1eae8.firebaseapp.com",
  projectId: "social-media-react-1eae8",
  storageBucket: "social-media-react-1eae8.appspot.com",
  messagingSenderId: "181015686121",
  appId: "1:181015686121:web:3ebb119e9b31572a28f978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const database=getFirestore(app);