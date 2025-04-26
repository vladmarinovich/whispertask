// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Necesario para usar Firebase Storage
import { getFirestore } from "firebase/firestore"; // Para Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUBwm6HQLee6aKVThlt_n1yingGASZCq4",
  authDomain: "whispertask-hosting.firebaseapp.com",
  projectId: "whispertask-hosting",
  storageBucket: "whispertask-hosting.firebasestorage.app",  // Esto está correcto para Firebase Storage
  messagingSenderId: "564980706107",
  appId: "1:564980706107:web:ab90dee8b44c183f99251e",
};

const app = initializeApp(firebaseConfig); // Inicializamos Firebase con la configuración

// Exportamos los servicios necesarios
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app); // Para Storage
export const db = getFirestore(app); // Para Firestore
export { app }; // Exportamos la instancia de la app de Firebase