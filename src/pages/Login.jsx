import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosData from "../data/usuarios.json";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegar

const handleSubmit = (e) => {
  e.preventDefault();
  const usuario = usuariosData.find(
    (u) => u.email === email && u.password === password
  );

if (usuario) {
  setError("");

  // Guardamos el ID en localStorage
  localStorage.setItem("usuarioId", usuario.id);

  if (usuario.role === "admin") {
    navigate("/panelAdmin");
  } else {
    navigate("/panelAlumno", { state: { usuario } });
  }
} else {
  setError("Email o contraseña incorrectos");
}
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <p className="mb-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600">
            Get started
          </a>
        </p>

        <label className="block mb-2 text-gray-700">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Password</label>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded hover:bg-black transition-colors">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login
