import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDUBwm6HQLee6aKVThlt_n1yingGASZCq4",
  authDomain: "whispertask-hosting.firebaseapp.com",
  projectId: "whispertask-hosting",
  storageBucket: "whispertask-hosting.appspot.com", // ← CORREGIDO
  messagingSenderId: "564980706107",
  appId: "1:564980706107:web:ab90dee8b44c183f99251e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app); // ← por si lo necesitas directo
export const db = getFirestore(app);