import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabla from "../components/Tabla";
import CrearUsuarioCard from "../components/CrearUsuarioCard";
import FiltroHorario from "../components/FiltroHorario";

function PanelAdmin() {
  const [vista, setVista] = useState("alumnos");
  const [mostrarCrearUsuario, setMostrarCrearUsuario] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Obtener nombre del admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCargando(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNombreUsuario(data.nombre?.split(" ")[0] || "");
        }
      } catch (err) {
        console.error("Error al obtener usuario admin:", err);
      } finally {
        setCargando(false);
      }
    });

    return () => unsub();
  }, []);

  // Función para cargar usuarios desde Firestore
  const loadUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsuarios(usersData);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  // Cargar usuarios al iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  const handleCrearUsuario = () => {
    setMostrarCrearUsuario(true);
    setVista("crear");
  };

  const handleCancelarCrear = () => {
    setMostrarCrearUsuario(false);
    setVista("alumnos");
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-indigo-800 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Aside fijo */}
      <aside className="w-64 bg-white shadow-lg h-screen fixed top-0 left-0 z-10 pt-16">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-indigo-800 flex items-center">
            <i className="fas fa-user-shield mr-2"></i> Panel Admin
          </h2>
          <p className="text-sm text-gray-600 mt-1">Gestión completa</p>
        </div>
        <nav className="flex flex-col p-4 gap-3 mt-4">
          <button
            onClick={() => setVista("alumnos")}
            className={`px-4 py-3 rounded-xl font-medium transition flex items-center ${
              vista === "alumnos" 
                ? "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="fas fa-users mr-3"></i> Alumnos
          </button>
          <button
            onClick={handleCrearUsuario}
            className="px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center"
          >
            <i className="fas fa-user-plus mr-3"></i> Crear Usuario
          </button>
          {/* <button
            className="px-4 py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition flex items-center"
          >
            <i className="fas fa-chart-line mr-3"></i> Estadísticas
          </button> */}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-indigo-600"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{nombreUsuario}</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Hola, <span className="text-indigo-600">{nombreUsuario}</span>
            </h1>
            <p className="text-gray-600 mt-2">Gestiona los usuarios y administra el sistema</p>
          </div>

          {/* Vista de alumnos */}
          {vista === "alumnos" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Alumnos</h2>
                <div className="flex items-center space-x-4">
                  <FiltroHorario
                    onChange={(hora) => setHorarioSeleccionado(hora)}
                  />
                </div>
              </div>
              
              <Tabla
                tipo="alumnos"
                horario={horarioSeleccionado}
                usuarios={usuarios}
                refreshUsers={loadUsers}
              />
            </div>
          )}

          {/* Vista de creación de usuario */}
          {vista === "crear" && mostrarCrearUsuario && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Usuario</h2>
                <button
                  onClick={handleCancelarCrear}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Volver
                </button>
              </div>
              
              <CrearUsuarioCard
                onCancel={handleCancelarCrear}
                refreshUsers={loadUsers}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PanelAdmin;