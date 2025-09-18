import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // 👈 agregado setDoc
import { auth, db } from "../libs/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email:", email);
      console.log("password:", password);

      // 🔐 Login con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔎 Obtener datos del usuario desde Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // ✅ Si existe el documento, uso sus datos
        const userData = userDocSnap.data();

        localStorage.setItem("usuarioId", user.uid);
        localStorage.setItem("usuarioRol", userData.rol);

        if (userData.rol === "admin") {
          navigate("/panelAdmin");
        } else {
          navigate("/panelAlumno");
        }
      } else {
        // ⚡ Si no existe el documento, lo creo con datos mínimos
        await setDoc(userDocRef, {
          email: user.email,
          rol: "alumno",
        });

        localStorage.setItem("usuarioId", user.uid);
        localStorage.setItem("usuarioRol", "alumno");

        navigate("/panelAlumno");
      }
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      setError("Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

        <label className="block mb-2 text-gray-700">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
          required
        />

        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          required
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full mt-4 bg-gray-900 text-white p-2 rounded hover:bg-black"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;