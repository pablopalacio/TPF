import { useState } from "react";
import { auth, db } from "../libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function CrearUsuarioCard({ onCancel, refreshUsers }) {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const {
      email,
      password,
      nombre,
      apellido,
      edad,
      peso,
      altura,
      telefono,
      objetivo,
      rol,
      pressBranch,
      frontSquat,
      backSquat,
      deadlift,
      snatch,
      cleen,
      cleenAndJerk,
    } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        edad: Number(edad),
        peso: Number(peso),
        altura: Number(altura),
        telefono,
        objetivo,
        rol: rol?.toLowerCase() || "alumno",
        email,
        horario: "",
        pressBranch,
        frontSquat,
        backSquat,
        deadlift,
        snatch,
        cleen,
        cleenAndJerk,
      });

      onCancel(); // ✅ Cierra el modal
      if (refreshUsers) refreshUsers(); // ✅ Actualiza lista en PanelAdmin
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("No se pudo crear el usuario.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="nombre"
          placeholder="Nombre*"
          required
          className="p-2 border rounded"
        />
        <input
          name="apellido"
          placeholder="Apellido*"
          required
          className="p-2 border rounded"
        />
        <input name="edad" placeholder="Edad" className="p-2 border rounded" />
        <input name="peso" placeholder="Peso" className="p-2 border rounded" />
        <input
          name="altura"
          placeholder="Altura"
          className="p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email*"
          required
          className="p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña*"
          required
          className="p-2 border rounded"
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          className="p-2 border rounded"
        />
        <input
          name="objetivo"
          placeholder="Objetivo"
          className="p-2 border rounded"
        />
        <input
          name="rol"
          placeholder="Rol*"
          required
          className="p-2 border rounded"
        />

        {/* Nuevos campos adicionales */}
        <input
          name="pressBranch"
          placeholder="Press Branch"
          className="p-2 border rounded"
        />
        <input
          name="frontSquat"
          placeholder="Front Squat"
          className="p-2 border rounded"
        />
        <input
          name="backSquat"
          placeholder="Back Squat"
          className="p-2 border rounded"
        />
        <input
          name="deadlift"
          placeholder="Deadlift"
          className="p-2 border rounded"
        />
        <input
          name="snatch"
          placeholder="Snatch"
          className="p-2 border rounded"
        />
        <input
          name="cleen"
          placeholder="Cleen"
          className="p-2 border rounded"
        />
        <input
          name="cleenAndJerk"
          placeholder="Cleen & Jerk"
          className="p-2 border rounded"
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 flex justify-between">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Crear
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CrearUsuarioCard;
