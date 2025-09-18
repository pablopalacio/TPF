import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import usuariosInfo from "../data/usuarios_info.json";

function PanelAlumno() {
  const location = useLocation();
  const [alumno, setAlumno] = useState({
    id: "",
    nombre: "",
    apellido: "",
    edad: "",
    altura: "",
    peso: "",
    telefono: "",
    objetivo: "",
    foto: null,
  });

  useEffect(() => {
    if (location.state?.usuario) {
      setAlumno(location.state.usuario);
    } else {
      // Si no viene por state, buscar por ID en localStorage
      const idGuardado = localStorage.getItem("usuarioId");
      if (idGuardado) {
        const encontrado = usuariosInfo.find(
          (u) => u.id.toString() === idGuardado
        );
        if (encontrado) {
          setAlumno(encontrado);
        }
      }
    }
  }, [location.state]);

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno({ ...alumno, [name]: value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAlumno({ ...alumno, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const primerNombre = alumno.nombre ? alumno.nombre.split(" ")[0] : "";

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      {primerNombre && (
        <div className="text-center text-xl font-semibold text-gray-800 mt-6">
          Bienvenido, {primerNombre} 👋
        </div>
      )}

      <div className="flex justify-start items-start flex-grow px-8 pt-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>

          <div className="space-y-3">
            {/* Campos de edición */}
            <div>
              <label className="block text-gray-700">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={alumno.nombre}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
                placeholder="Nombre(s)"
              />
            </div>

            <div>
              <label className="block text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={alumno.apellido}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
                placeholder="Apellido(s)"
              />
            </div>

            <div>
              <label className="block text-gray-700">Edad</label>
              <input
                type="number"
                name="edad"
                value={alumno.edad}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Altura (cm)</label>
              <input
                type="number"
                name="altura"
                value={alumno.altura}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Peso (kg)</label>
              <input
                type="number"
                name="peso"
                value={alumno.peso}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Número de teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={alumno.telefono}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
                placeholder="Ej: +54 9 11 1234-5678"
              />
            </div>

            <div>
              <label className="block text-gray-700">Objetivo</label>
              <input
                type="text"
                name="objetivo"
                value={alumno.objetivo}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? "bg-gray-200" : ""
                }`}
                placeholder="Ej: Ganar masa muscular"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Foto</label>
              {editMode && (
                <input type="file" accept="image/*" onChange={handleFotoChange} />
              )}
              <div className="mt-2 w-40 h-40 bg-gray-200 flex items-center justify-center overflow-hidden rounded mx-auto">
                {alumno.foto ? (
                  <img
                    src={alumno.foto}
                    alt="Foto del alumno"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No hay foto</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            {editMode ? "Guardar" : "Editar"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PanelAlumno;