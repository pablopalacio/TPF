import { useEffect, useState } from "react";
import ModalAlumno from "./ModalAlumno"; // lo crearemos

function Tabla({ tipo, horario }) {
  const [datos, setDatos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  useEffect(() => {
    // Simulación: cargar alumnos
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const filtrados = horario
      ? alumnos.filter((a) => a.horario === horario)
      : alumnos;
    setDatos(filtrados);
  }, [tipo, horario]);

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Nombre</th>
            <th className="text-left px-4 py-2">Apellido</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((alumno, index) => (
            <tr
              key={index}
              onClick={() => setAlumnoSeleccionado(alumno)}
              className="cursor-pointer hover:bg-pink-100 transition"
            >
              <td className="px-4 py-2">{alumno.nombre}</td>
              <td className="px-4 py-2">{alumno.apellido}</td>
              <td className="px-4 py-2">{alumno.email}</td>
              <td className="px-4 py-2">{alumno.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal con información completa */}
      {alumnoSeleccionado && (
        <ModalAlumno
          alumno={alumnoSeleccionado}
          onClose={() => setAlumnoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default Tabla;