import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TablaDeEjercicios from "../components/TablaDeEjercicios";

function PanelAlumno() {
  const [alumno, setAlumno] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setAlumno({ id: user.uid, ...userDoc.data() });
        } else {
          console.error("El usuario no existe en Firestore");
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        setCargando(false);
      }
    });

    return () => unsub();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno({ ...alumno, [name]: value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAlumno({ ...alumno, foto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleGuardar = async () => {
    try {
      const ref = doc(db, "users", alumno.id);
      await updateDoc(ref, {
        nombre: alumno.nombre || "",
        apellido: alumno.apellido || "",
        edad: Number(alumno.edad) || 0,
        altura: Number(alumno.altura) || 0,
        peso: Number(alumno.peso) || 0,
        telefono: alumno.telefono || "",
        objetivo: alumno.objetivo || "",
        foto: alumno.foto || "",
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
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

  if (!alumno) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Usuario no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            No se pudo cargar la información del usuario.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const primerNombre = alumno.nombre?.split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        {primerNombre && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Bienvenido/a,{" "}
              <span className="text-indigo-600">{primerNombre}</span> 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona tu perfil y revisa tu plan de ejercicios
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Panel de perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>
              <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                Alumno
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {alumno.foto ? (
                      <img
                        src={alumno.foto}
                        alt="Foto del alumno"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-4xl text-indigo-400">
                          {alumno.nombre?.charAt(0) || ""}
                          {alumno.apellido?.charAt(0) || ""}
                        </span>
                      </div>
                    )}
                  </div>
                  {editMode && (
                    <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-indigo-700 transition">
                      <i className="fas fa-camera"></i>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={alumno.nombre || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={alumno.apellido || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={alumno.edad || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="altura"
                    value={alumno.altura || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    value={alumno.peso || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={alumno.telefono || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      !editMode
                        ? "bg-gray-100 text-gray-600"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    } transition`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo
                </label>
                <input
                  type="text"
                  name="objetivo"
                  value={alumno.objetivo || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    !editMode
                      ? "bg-gray-100 text-gray-600"
                      : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  } transition`}
                />
              </div>
            </div>

            <button
              onClick={() => (editMode ? handleGuardar() : setEditMode(true))}
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                editMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}>
              {editMode ? (
                <>
                  <i className="fas fa-save mr-2"></i> Guardar cambios
                </>
              ) : (
                <>
                  <i className="fas fa-edit mr-2"></i> Editar perfil
                </>
              )}
            </button>

            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="mt-3 w-full py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition">
                Cancelar
              </button>
            )}
          </div>

          {/* Tabla de ejercicios */}
          <div className="flex-grow bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Tus Records!:
              </h2>
            </div>

            <TablaDeEjercicios />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PanelAlumno;
