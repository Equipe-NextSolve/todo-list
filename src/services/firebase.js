import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnle558Stuv-yLnImsZxGrhF_H4X2prdc",
  authDomain: "todo-list-nextsolve.firebaseapp.com",
  projectId: "todo-list-nextsolve",
  storageBucket: "todo-list-nextsolve.firebasestorage.app",
  messagingSenderId: "923355504459",
  appId: "1:923355504459:web:b4ea49628ee362b3bad2ce",
  measurementId: "G-BHXYRZ2MRQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
