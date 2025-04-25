import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { saveAudioToFirestore } from "../utils/firestoreHelpers";

export default function UploadAudio() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `audios/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(pct));
      },
      (error) => {
        console.error("Upload error:", error);
        setMessage("❌ Error al subir el archivo.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await saveAudioToFirestore({
          fileName: storageRef.fullPath,
          url: downloadURL,
          type: "subido",
        });
        setMessage("✅ Audio subido y guardado en Firestore.");
        setProgress(null);
        setFile(null);
      }
    );
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Subir archivo de audio</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-[#4A9FFF] text-white px-4 py-2 rounded hover:bg-[#326DFF] disabled:opacity-50"
      >
        Subir audio
      </button>

      {progress !== null && (
        <div className="mt-2 text-sm text-gray-700">Progreso: {progress}%</div>
      )}

      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
}