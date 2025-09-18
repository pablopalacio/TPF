import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PanelAlumno() {
  const [alumno, setAlumno] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // 📌 Cargar los datos del usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/"); // si no hay usuario logueado, lo mandamos al login
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
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        edad: Number(alumno.edad),
        altura: Number(alumno.altura),
        peso: Number(alumno.peso),
        telefono: alumno.telefono,
        objetivo: alumno.objetivo,
        foto: alumno.foto || "",
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;
  if (!alumno) return <p className="text-center mt-10">No se encontró el usuario.</p>;

  const primerNombre = alumno.nombre?.split(" ")[0] || "";

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
            <div>
              <label className="block text-gray-700">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={alumno.nombre || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={alumno.apellido || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Edad</label>
              <input
                type="number"
                name="edad"
                value={alumno.edad || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Altura (cm)</label>
              <input
                type="number"
                name="altura"
                value={alumno.altura || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Peso (kg)</label>
              <input
                type="number"
                name="peso"
                value={alumno.peso || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Número de teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={alumno.telefono || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700">Objetivo</label>
              <input
                type="text"
                name="objetivo"
                value={alumno.objetivo || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-2 border rounded ${!editMode ? "bg-gray-200" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Foto</label>
              {editMode && <input type="file" accept="image/*" onChange={handleFotoChange} />}
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
            onClick={() => (editMode ? handleGuardar() : setEditMode(true))}
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