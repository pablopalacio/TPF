import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase";

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);

  const MAX_POR_CLASE = 15;

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const alumnos = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.rol === "alumno" && user.horario);

        // Agrupar por horario
        const conteoPorHorario = {};
        alumnos.forEach(alumno => {
          const turno = alumno.horario;
          conteoPorHorario[turno] = (conteoPorHorario[turno] || 0) + 1;
        });

        // Transformar a arreglo con porcentaje
        const resultado = Object.entries(conteoPorHorario)
          .sort((a, b) => a[0] - b[0]) // Ordenar por hora
          .map(([horario, cantidad]) => ({
            horario: `${horario}:00`,
            cantidad,
            porcentaje: ((cantidad / MAX_POR_CLASE) * 100).toFixed(1),
          }));

        setEstadisticas(resultado);
      } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEstadisticas();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando estadísticas...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Estadísticas de Alumnos por Turno
      </h2>

      {estadisticas.length === 0 ? (
        <p className="text-center text-gray-500">No hay datos de alumnos con horarios asignados.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="p-2 border">Turno</th>
              <th className="p-2 border">Alumnos</th>
              <th className="p-2 border">Ocupación</th>
            </tr>
          </thead>
          <tbody>
            {estadisticas.map(({ horario, cantidad, porcentaje }) => (
              <tr key={horario} className="bg-white hover:bg-gray-50">
                <td className="p-2 border font-semibold">{horario}</td>
                <td className="p-2 border">{cantidad} / {MAX_POR_CLASE}</td>
                <td className="p-2 border">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-500 h-4 rounded-full"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{porcentaje}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Estadisticas;