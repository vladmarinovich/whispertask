import React, { useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { saveAudioToFirestore } from "../utils/firestoreHelpers";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const chunks = useRef([]);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta grabación de audio.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      chunks.current = [];
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);
        setIsRecording(false);
      };
    } catch (err) {
      console.error("❌ Error al iniciar grabación:", err);
      alert("⚠️ Ocurrió un error al acceder al micrófono.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) return;

    const storage = getStorage();
    const fileName = `grabaciones/${Date.now()}.webm`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, audioBlob);

    uploadTask.on(
      "state_changed",
      null,
      (error) => console.error("❌ Error al subir:", error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await saveAudioToFirestore({
          fileName,
          url: downloadURL,
          type: "grabado",
        });
        alert("✅ Grabación subida correctamente.");
        setAudioBlob(null);
        setAudioURL(null);
      }
    );
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
    </div>
  );
}