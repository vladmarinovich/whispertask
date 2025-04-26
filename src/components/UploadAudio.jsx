import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de tener el contexto de autenticación
import { addDoc, collection } from "firebase/firestore"; // Para agregar metadatos en Firestore
import { db } from "../../firebase"; // Asegúrate de tener configurado correctamente Firestore

export default function UploadAudio() {
  const { user } = useAuth(); // Obtener el usuario desde el contexto
  const [audioFile, setAudioFile] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!audioFile) {
      setMessage("Por favor selecciona un archivo.");
      return;
    }

    if (!user) {
      setMessage("¡Por favor, inicia sesión!");
      return;
    }

    // Crear la referencia del archivo en Firebase Storage usando el UID del usuario
    const storage = getStorage();
    const userFolderRef = ref(storage, `audios/${user.uid}/${audioFile.name}`); // Usamos el UID para crear la carpeta del usuario
    const uploadTask = uploadBytesResumable(userFolderRef, audioFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct); // Mostrar el progreso de la carga
      },
      (error) => {
        console.error("Error al subir el archivo:", error);
        setMessage("❌ Error al subir el archivo.");
      },
      async () => {
        // Obtener la URL del archivo subido
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref());

        // Guardar los metadatos del archivo en Firestore
        try {
          await addDoc(collection(db, "audios"), {
            uid: user.uid, // Guardamos el UID del usuario
            fileName: audioFile.name,
            url: downloadURL,
            createdAt: new Date(),
            type: audioFile.type,
          });
          setMessage("✅ ¡Audio subido exitosamente!");
        } catch (error) {
          console.error("Error al guardar los metadatos en Firestore:", error);
          setMessage("❌ Error al guardar los metadatos.");
        }

        // Limpiar estado después de la carga
        setProgress(0);
        setAudioFile(null);
      }
    );
  };

  return (
    <div className="upload-container">
      <h2 className="text-xl font-semibold mb-4">Presiona el botón para empezar a grabar</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!audioFile}>
        Subir archivo
      </button>
      {progress > 0 && <p>Progreso: {progress}%</p>}
      {message && <p>{message}</p>}
    </div>
  );
}