// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUBwm6HQLee6aKVThlt_n1yingGASZCq4",
  authDomain: "whispertask-hosting.firebaseapp.com",
  projectId: "whispertask-hosting",
  storageBucket: "whispertask-hosting.firebasestorage.app",
  messagingSenderId: "564980706107",
  appId: "1:564980706107:web:ab90dee8b44c183f99251e",
};

// Inicializar app de Firebase
const app = initializeApp(firebaseConfig);

// ✅ Exportar correctamente las instancias
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
export { app };