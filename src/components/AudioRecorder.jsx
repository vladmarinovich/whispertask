import React, { useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de tener el contexto de autenticación
import { addDoc, collection } from "firebase/firestore"; // Para agregar metadatos en Firestore
import { db } from "../../firebase"; // Asegúrate de tener configurado correctamente Firestore

export default function AudioRecorder() {
  const { user } = useAuth(); // Obtener el usuario desde el contexto
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(""); // Estado para mostrar mensaje
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const mediaStreamRef = useRef(null); // Para gestionar la captura de la pantalla

  // Iniciar la grabación de audio y pantalla
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta grabación de audio.");
        return;
      }

      // Solicitar acceso al micrófono y la pantalla
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();

      // Conectar la fuente de audio del micrófono y pantalla
      const micSource = audioContext.createMediaStreamSource(micStream);
      const screenSource = audioContext.createMediaStreamSource(screenStream);

      micSource.connect(destination);
      screenSource.connect(destination);

      const combinedStream = destination.stream;

      // Crear MediaRecorder para grabar el audio combinado
      const mediaRecorder = new MediaRecorder(combinedStream);
      mediaRecorderRef.current = mediaRecorder;
      mediaStreamRef.current = screenStream; // Guardamos la referencia del stream de pantalla

      chunks.current = []; // Limpiar fragmentos anteriores
      mediaRecorder.start();
      setIsRecording(true); // Indicamos que la grabación está activa

      mediaRecorder.ondataavailable = (event) => {
        chunks.current.push(event.data); // Recopilar los datos de audio
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob); // Guardamos el audio grabado
        setAudioURL(audioURL); // Establecemos el enlace para reproducir el audio
        setIsRecording(false);

        // Subir a Firebase Storage
        const storage = getStorage();
        const fileName = `grabaciones/${Date.now()}_audio.wav`; // Nombre único para cada archivo
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, audioBlob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(pct); // Mostrar el progreso de carga
          },
          (error) => {
            console.error("❌ Error al subir archivo:", error);
            setMessage("❌ Error al subir archivo");
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Guardar los metadatos en Firestore
            try {
              await addDoc(collection(db, "audios"), {
                uid: user.uid, // Guardamos el UID del usuario
                fileName: fileName,
                url: downloadURL,
                createdAt: new Date(),
                type: "grabado",
              });
              setMessage("✅ ¡Grabación subida correctamente!");
            } catch (error) {
              console.error("❌ Error al guardar los metadatos en Firestore:", error);
              setMessage("❌ Error al guardar los metadatos.");
            }

            setProgress(0);
            setAudioBlob(null);
            setAudioURL(null);
          }
        );
      };
    } catch (err) {
      console.error("Error al acceder al micrófono o pantalla:", err);
      alert("⚠️ Ocurrió un error al acceder al micrófono.");
      setIsRecording(false);
    }
  };

  // Detener la grabación
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Detener la grabación de audio
      setIsRecording(false);

      // Detener la grabación de la pantalla
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Grabar audio desde el navegador</h3>

      {!isRecording ? (
        <button
          onClick={startRecording}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          🎙️ Comenzar grabación
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          ⏹️ Detener grabación
        </button>
      )}

      {progress > 0 && <div className="mt-2 text-sm">Progreso de subida: {progress}%</div>}

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} className="w-full" />
          <button
            onClick={handleUpload}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ⬆️ Subir grabación
          </button>
        </div>
      )}

      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
}