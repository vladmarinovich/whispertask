// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUBwm6HQLee6aKVThlt_n1yingGASZCq4",
  authDomain: "whispertask-hosting.firebaseapp.com",
  projectId: "whispertask-hosting",
  storageBucket: "whispertask-hosting.firebasestorage.app",
  messagingSenderId: "564980706107",
  appId: "1:564980706107:web:ab90dee8b44c183f99251e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();