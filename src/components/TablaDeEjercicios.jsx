import { useEffect, useState } from "react";
import { db, auth } from "../libs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const TablaDeEjercicios = () => {
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    pressBranch: "",
    frontSquat: "",
    backSquat: "",
    deadlift: "",
    snatch: "",
    cleen: "",
    cleenAndJerk: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // No hay usuario logueado
          setError("No hay usuario autenticado");
          setLoading(false);
          return;
        }
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUsuarioData(data);

          // Inicializar formValues con los valores actuales
          setFormValues({
            pressBranch: data.pressBranch || "",
            frontSquat: data.frontSquat || "",
            backSquat: data.backSquat || "",
            deadlift: data.deadlift || "",
            snatch: data.snatch || "",
            cleen: data.cleen || "",
            cleenAndJerk: data.cleenAndJerk || "",
          });
        } else {
          setError("Usuario no encontrado en la base de datos");
        }
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError("Error al obtener datos");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleGuardar = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No hay usuario autenticado");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        pressBranch: formValues.pressBranch,
        frontSquat: formValues.frontSquat,
        backSquat: formValues.backSquat,
        deadlift: formValues.deadlift,
        snatch: formValues.snatch,
        cleen: formValues.cleen,
        cleenAndJerk: formValues.cleenAndJerk,
      });
      // Actualizar estado local
      setUsuarioData((prev) => ({
        ...prev,
        ...formValues,
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Error guardando los ejercicios:", err);
      setError("Error al guardar los cambios");
    }
  };

  if (loading) {
    return <p className="text-center">Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Se tu mejor version!</h2>

      <table className="min-w-full border text-sm text-left mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Ejercicio</th>
            <th className="border p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {["pressBranch","frontSquat","backSquat","deadlift","snatch","cleen","cleenAndJerk"].map((campo) => (
            <tr key={campo} className="bg-white hover:bg-gray-50">
              <td className="border p-2 font-semibold">{campo}</td>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="text"
                    value={formValues[campo]}
                    onChange={handleChange(campo)}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  usuarioData[campo] || "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMode ? (
        <div className="flex justify-end gap-2">
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar cambios
          </button>
          <button
            onClick={() => {
              // cancelar edición, restaurar valores previos
              setFormValues({
                pressBranch: usuarioData.pressBranch || "",
                frontSquat: usuarioData.frontSquat || "",
                backSquat: usuarioData.backSquat || "",
                deadlift: usuarioData.deadlift || "",
                snatch: usuarioData.snatch || "",
                cleen: usuarioData.cleen || "",
                cleenAndJerk: usuarioData.cleenAndJerk || "",
              });
              setEditMode(false);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default TablaDeEjercicios;