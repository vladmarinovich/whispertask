// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Asegúrate de importar Firestore
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUBwm6HQLee6aKVThlt_n1yingGASZCq4",
  authDomain: "whispertask-hosting.firebaseapp.com",
  projectId: "whispertask-hosting",
  storageBucket: "whispertask-hosting.appspot.com",
  messagingSenderId: "564980706107",
  appId: "1:564980706107:web:ab90dee8b44c183f99251e",
};

const app = initializeApp(firebaseConfig);

// Exportando correctamente la instancia de Firestore
const db = getFirestore(app);  // Inicialización correcta de Firestore

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { db };  // Asegúrate de exportar db aquí
export { app };