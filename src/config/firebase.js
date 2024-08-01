import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyComvWqbHZ-6oB8E6cN_tvOKWkgDQr1NJE",
  authDomain: "social-media-react-1eae8.firebaseapp.com",
  projectId: "social-media-react-1eae8",
  storageBucket: "social-media-react-1eae8.appspot.com",
  messagingSenderId: "181015686121",
  appId: "1:181015686121:web:3ebb119e9b31572a28f978"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const database=getFirestore(app);
