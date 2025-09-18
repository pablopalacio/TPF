import { useState } from "react";

function CrearUsuarioCard({ onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    peso: "",
    altura: "",
    email: "",
    telefono: "",
    objetivo: "",
    rol: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = () => {
    // Aquí iría lógica para crear usuario (validaciones, fetch, etc.)
    console.log("Usuario creado:", form);
    onCancel(); // cerrar formulario tras crear
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="nombre"
          placeholder="Nombre*"
          value={form.nombre}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="apellido"
          placeholder="Apellido*"
          value={form.apellido}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="peso"
          placeholder="Peso"
          value={form.peso}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="altura"
          placeholder="Altura"
          value={form.altura}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email*"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="objetivo"
          placeholder="Objetivo"
          value={form.objetivo}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="rol"
          placeholder="Rol*"
          value={form.rol}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleCrear}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crear
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CrearUsuarioCard;