import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabla from "../components/Tabla";
import CrearUsuarioCard from "../components/CrearUsuarioCard"; // lo crearemos
import FiltroHorario from "../components/FiltroHorario"; // lo crearemos

function PanelAdmin() {
  const [vista, setVista] = useState("alumnos");
  const [mostrarCrearUsuario, setMostrarCrearUsuario] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  // Suponiendo que obtienes al usuario de localStorage:
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.nombre) {
      setNombreUsuario(usuario.nombre.split(" ")[0]); // primer nombre
    }
  }, []);

  const handleCrearUsuario = () => {
    setMostrarCrearUsuario(true);
    setVista("crear");
  };

  const handleCancelarCrear = () => {
    setMostrarCrearUsuario(false);
    setVista("alumnos");
  };

  return (
    <div className="min-h-screen bg-pink-500 flex">
      {/* Aside fijo */}
      <aside className="w-64 bg-white shadow-md h-screen fixed top-0 left-0 z-10 pt-16">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Admin</h2>
        </div>
        <nav className="flex flex-col p-4 gap-2 mt-2">
          <button
            onClick={() => setVista("alumnos")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
            Alumnos
          </button>
          <button
            onClick={handleCrearUsuario}
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
            Crear Usuario
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Bienvenido/a, {nombreUsuario}
          </h1>

          {/* Mostrar vista de alumnos */}
          {vista === "alumnos" && (
            <>
              <FiltroHorario
                onChange={(hora) => setHorarioSeleccionado(hora)}
              />
              <Tabla tipo="alumnos" horario={horarioSeleccionado} />
            </>
          )}

          {/* Mostrar formulario de creación */}
          {vista === "crear" && mostrarCrearUsuario && (
            <CrearUsuarioCard onCancel={handleCancelarCrear} />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PanelAdmin;
