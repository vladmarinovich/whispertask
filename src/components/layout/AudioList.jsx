import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Importamos el contexto de autenticación
import { db } from "../../firebase"; // Verifica que la ruta es correcta
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore

export default function AudioList() {
  const { usuario } = useAuth(); // Usamos el hook `useAuth` para acceder al usuario autenticado
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    if (!usuario) {
      console.log("⚠️ No hay usuario autenticado.");
      return; // Si no hay usuario autenticado, no cargamos nada
    }

    const fetchAudios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "audios"));
        const audiosList = querySnapshot.docs.map((doc) => doc.data());
        setAudios(audiosList);
      } catch (error) {
        console.error("Error al cargar audios: ", error);
      }
    };

    fetchAudios();
  }, [usuario]); // Solo cargar audios si hay un usuario autenticado

  return (
    <div>
      <h3>Lista de audios</h3>
      <ul>
        {audios.length > 0 ? (
          audios.map((audio, index) => (
            <li key={index}>{audio.name}</li>
          ))
        ) : (
          <p>No hay audios disponibles.</p>
        )}
      </ul>
    </div>
  );
}