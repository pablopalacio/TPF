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

  // Función para cargar usuarios
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
    return <p className="text-center mt-10">Cargando...</p>;
  }

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
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Alumnos
          </button>
          <button
            onClick={handleCrearUsuario}
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
          >
            Crear Usuario
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 ml-64">
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Bienvenido/a, {nombreUsuario}
          </h1>

          {/* Vista de alumnos */}
          {vista === "alumnos" && (
            <>
              <FiltroHorario
                onChange={(hora) => setHorarioSeleccionado(hora)}
              />
              <Tabla tipo="alumnos" horario={horarioSeleccionado} usuarios={usuarios} />
            </>
          )}

          {/* Vista de creación de usuario */}
          {vista === "crear" && mostrarCrearUsuario && (
            <CrearUsuarioCard
              onCancel={handleCancelarCrear}
              refreshUsers={loadUsers} // 👈 pasa la función de refresco
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PanelAdmin;