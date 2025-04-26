import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Asegúrate que esta ruta es correcta
import { useAuth } from "../../context/AuthContext"; // Usa tu contexto de autenticación

export default function AudioList() {
  const { user, loading } = useAuth(); // Obtener el usuario desde el contexto
  const [audios, setAudios] = useState([]); // Lista de audios
  const [error, setError] = useState(null); // Error
  const [showMore, setShowMore] = useState(false); // Estado para controlar si mostrar más audios
  const [allAudios, setAllAudios] = useState([]); // Estado para almacenar todas las grabaciones

  useEffect(() => {
    if (loading) return; // Esperar a que Firebase termine de autenticar

    if (!user) {
      console.warn("⚠️ No hay usuario autenticado.");
      setError("Debes iniciar sesión para ver tus audios.");
      return;
    }

    try {
      const q = query(
        collection(db, "audios"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllAudios(data); // Guardar todas las grabaciones
          setAudios(data.slice(0, 3)); // Mostrar solo las primeras 3 grabaciones
        },
        (err) => {
          console.error("❌ Error al escuchar Firestore:", err);
          setError("No se pudo obtener tus audios. Revisa tu conexión o permisos.");
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("❌ Error al acceder a Firestore:", err);
      setError("Error inesperado al cargar audios.");
    }
  }, [user, loading]);

  const loadMore = () => {
    setShowMore(true);
    setAudios(allAudios); // Mostrar todas las grabaciones
  };

  if (loading) {
    return <p className="text-sm text-gray-500 italic">⏳ Cargando sesión de usuario...</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Tus Grabaciones</h3>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4">
          {error}
        </div>
      )}

      {!error && audios.length === 0 && (
        <p className="text-sm text-gray-500 italic">Aún no has subido ni grabado audios.</p>
      )}

      {audios.length > 0 && (
        <div className="space-y-4">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded p-4"
            >
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {audio.fileName.split("/").pop()}
                </h4>
                <p className="text-xs text-gray-600">
                  {audio.createdAt?.toDate().toLocaleString() || "Sin fecha"}
                </p>
                <span
                  className={`text-xs inline-block mt-1 px-2 py-0.5 rounded-full font-medium ${
                    audio.type === "grabado"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {audio.type === "grabado" ? "🎙️ Grabado" : "📁 Subido"}
                </span>
              </div>
              <div className="text-right">
                <p
                  className={`text-xs font-medium ${
                    audio.status === "Transcrito" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {audio.status || "pendiente"}
                </p>
                <a
                  href={audio.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-[#4A9FFF] text-xs hover:underline"
                >
                  Ver audio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showMore && audios.length < allAudios.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-[#4A9FFF] text-white px-4 py-2 rounded hover:bg-[#326DFF]"
          >
            Cargar más grabaciones
          </button>
        </div>
      )}
    </div>
  );
}