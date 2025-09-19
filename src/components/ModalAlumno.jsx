import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../libs/firebase";

function ModalAlumno({ alumno, onClose, refreshUsers }) {
  const [nombre, setNombre] = useState(alumno.nombre || "");
  const [apellido, setApellido] = useState(alumno.apellido || "");
  const [edad, setEdad] = useState(alumno.edad || "");
  const [peso, setPeso] = useState(alumno.peso || "");
  const [altura, setAltura] = useState(alumno.altura || "");
  const [telefono, setTelefono] = useState(alumno.telefono || "");
  const [objetivo, setObjetivo] = useState(alumno.objetivo || "");
  const [horario, setHorario] = useState(alumno.horario || "");
  const [rol, setRol] = useState(alumno.rol || "");

  const [pressBranch, setPressBranch] = useState(alumno.pressBranch || "");
  const [frontSquat, setFrontSquat] = useState(alumno.frontSquat || "");
  const [backSquat, setBackSquat] = useState(alumno.backSquat || "");
  const [deadlift, setDeadlift] = useState(alumno.deadlift || "");
  const [snatch, setSnatch] = useState(alumno.snatch || "");
  const [cleen, setCleen] = useState(alumno.cleen || "");
  const [cleenAndJerk, setCleenAndJerk] = useState(alumno.cleenAndJerk || "");

  const horariosDisponibles = Array.from({ length: 16 }, (_, i) => 7 + i);
  const rolesDisponibles = ["admin", "headCoach", "secretaria", "coach", "alumno"];

  const handleGuardar = async () => {
    try {
      await updateDoc(doc(db, "users", alumno.id), {
        nombre,
        apellido,
        edad: Number(edad),
        peso: Number(peso),
        altura: Number(altura),
        telefono,
        objetivo,
        horario,
        rol,
        pressBranch,
        frontSquat,
        backSquat,
        deadlift,
        snatch,
        cleen,
        cleenAndJerk,
      });

      if (refreshUsers) await refreshUsers();
      onClose();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-2 md:p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-2xl lg:max-w-4xl relative max-h-[95vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg md:text-base"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
          Editar información de {alumno.nombre} {alumno.apellido}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
          {/* Columna izquierda */}
          <div>
            <label className="block font-medium mb-1">Nombre:</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Apellido:</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Peso:</label>
            <input value={peso} onChange={(e) => setPeso(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Altura:</label>
            <input value={altura} onChange={(e) => setAltura(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Teléfono:</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Objetivo:</label>
            <input value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Press Branch:</label>
            <input value={pressBranch} onChange={(e) => setPressBranch(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Front Squat:</label>
            <input value={frontSquat} onChange={(e) => setFrontSquat(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Back Squat:</label>
            <input value={backSquat} onChange={(e) => setBackSquat(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Deadlift:</label>
            <input value={deadlift} onChange={(e) => setDeadlift(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Snatch:</label>
            <input value={snatch} onChange={(e) => setSnatch(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Cleen:</label>
            <input value={cleen} onChange={(e) => setCleen(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Cleen & Jerk:</label>
            <input value={cleenAndJerk} onChange={(e) => setCleenAndJerk(e.target.value)} className="w-full border p-2 rounded text-sm" />
          </div>

          <div>
            <label className="block font-medium mb-1">Asignar turno horario:</label>
            <select value={horario} onChange={(e) => setHorario(Number(e.target.value))} className="w-full border p-2 rounded text-sm">
              <option value="">Seleccionar horario</option>
              {horariosDisponibles.map((h) => (
                <option key={h} value={h}>{h}:00 hs</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Asignar Rol:</label>
            <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full border p-2 rounded text-sm">
              <option value="">Rol</option>
              {rolesDisponibles.map((r) => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4 md:mt-6">
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm order-2 sm:order-1"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm order-1 sm:order-2 mb-2 sm:mb-0"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAlumno;