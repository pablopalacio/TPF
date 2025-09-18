import { useState } from "react";

function ModalAlumno({ alumno, onClose }) {
  const [horario, setHorario] = useState(alumno.horario || "");
  const [rol, setRol] = useState(alumno.rol || "");

  const horariosDisponibles = Array.from({ length: 16 }, (_, i) => 7 + i); // 7 a 22
  const rolesDisponibles = ["admin", "headCoach", "secretaria", "coach", "alumno"];

  const handleGuardar = () => {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    const actualizados = alumnos.map((u) =>
      u.email === alumno.email
        ? { ...u, horario, rol }
        : u
    );

    localStorage.setItem("alumnos", JSON.stringify(actualizados));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Información de {alumno.nombre} {alumno.apellido}
        </h2>

        <ul className="space-y-1 mb-4 text-sm">
          <li><strong>Nombre:</strong> {alumno.nombre}</li>
          <li><strong>Apellido:</strong> {alumno.apellido}</li>
          <li><strong>Edad:</strong> {alumno.edad}</li>
          <li><strong>Peso:</strong> {alumno.peso}</li>
          <li><strong>Altura:</strong> {alumno.altura}</li>
          <li><strong>Email:</strong> {alumno.email}</li>
          <li><strong>Teléfono:</strong> {alumno.telefono}</li>
          <li><strong>Objetivo:</strong> {alumno.objetivo}</li>
        </ul>

        {/* Asignar turno */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">
            Asignar turno horario:
          </label>
          <select
            value={horario}
            onChange={(e) => setHorario(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccionar horario</option>
            {horariosDisponibles.map((h) => (
              <option key={h} value={h}>
                {h}:00 hs
              </option>
            ))}
          </select>
        </div>

        {/* Asignar rol */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">Asignar Rol:</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Rol</option>
            {rolesDisponibles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAlumno;