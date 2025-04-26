// ✅ src/pages/Summary.jsx
import MainLayout from "../components/layout/MainLayout";

export default function Summary() {
  return (
    <MainLayout>
      <div className="flex flex-col flex-1 items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Reuniones</h1>
        <p className="text-gray-500">Esta sección estará disponible pronto.</p>
      </div>
    </MainLayout>
  );
}
