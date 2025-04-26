import { useState } from "react";
import { storage } from "../firebase"; // Corrige la ruta a "firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadAudio() {
  const [archivo, setArchivo] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [mensaje, setMensaje] = useState("");

  // Manejo de cambio de archivo (drag & drop)
  const handleFileChange = (e) => {
    const file = e.target.files[0] || e.dataTransfer.files[0];
    setArchivo(file);
  };

  const handleUpload = () => {
    if (!archivo) {
      alert("Por favor selecciona un archivo primero.");
      return;
    }

    const storageRef = ref(storage, `audios/${archivo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, archivo);

    // Monitorizar el progreso de la carga
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgreso(prog);
        setMensaje(`Subiendo archivo... ${Math.round(prog)}%`);
      },
      (error) => {
        console.error("Error subiendo el archivo: ", error);
        setMensaje("Error subiendo el archivo.");
      },
      () => {
        // Subida exitosa
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Archivo subido con éxito:", downloadURL);
          setMensaje("Archivo subido exitosamente.");
        });
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Subir archivo de audio
      </h3>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            onDrop={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            {/* Ícono de upload */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-[#4A9FFF]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V8m0 0l-4 4m4-4l4 4m-8 8h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-600 text-sm">
              {archivo ? archivo.name : "Arrastra y suelta el archivo aquí o selecciona un archivo"}
            </span>
          </div>
        </label>

        {/* Barra de progreso */}
        {progreso > 0 && (
          <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
            <div
              className="bg-[#4A9FFF] h-2 rounded-full"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        )}

        {/* Mensaje de estado */}
        {mensaje && <p className="text-sm text-gray-500 mt-2">{mensaje}</p>}

        {/* Botón de subir */}
        <button
          type="button"
          onClick={handleUpload}
          className="bg-[#4A9FFF] hover:bg-[#3787E0] text-white font-semibold py-3 px-6 rounded-full transition-colors self-start mt-4"
        >
          Subir archivo
        </button>
      </div>
    </div>
  );
}