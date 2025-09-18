import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase";
import ModalAlumno from "./ModalAlumno";

function Tabla({ tipo, horario, usuarios }) {
  const [datos, setDatos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        let alumnos = [];

        if (usuarios && usuarios.length > 0) {
          alumnos = usuarios.filter(u => tipo === "alumnos" ? u.rol === "alumno" : true);
        } else {
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach(doc => {
            const data = doc.data();
            if (tipo === "alumnos" && data.rol === "alumno") {
              alumnos.push({ id: doc.id, ...data });
            }
          });
        }

        if (horario) {
          alumnos = alumnos.filter(a => a.horario === horario);
        }

        setDatos(alumnos);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, [tipo, horario, usuarios]);

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Nombre</th>
            <th className="text-left px-4 py-2">Apellido</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Teléfono</th>
            <th className="text-left px-4 py-2">Horario</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(alumno => (
            <tr
              key={alumno.id}
              onClick={() => setAlumnoSeleccionado(alumno)}
              className="cursor-pointer hover:bg-pink-100 transition"
            >
              <td className="px-4 py-2">{alumno.nombre}</td>
              <td className="px-4 py-2">{alumno.apellido}</td>
              <td className="px-4 py-2">{alumno.email}</td>
              <td className="px-4 py-2">{alumno.telefono}</td>
              <td className="px-4 py-2">{alumno.horario || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

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