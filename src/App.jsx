import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Vision from "./pages/Vision.jsx";
import Galeria from "./pages/Galeria.jsx";
import Turnos from "./pages/Turnos.jsx";
import PanelAdmin from "./pages/PanelAdmin.jsx";
import PanelAlumno from "./pages/PanelAlumno.jsx";
import { useProtectedRoute } from "./hooks/useProtectedRoute.js";

function App() {
  const adminRoute = useProtectedRoute("admin");
  const alumnoRoute = useProtectedRoute("alumno");

  if (adminRoute.loading || alumnoRoute.loading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/turnos" element={<Turnos />} />

      <Route
        path="/panelAdmin"
        element={
          adminRoute.authorized ? (
            <PanelAdmin />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/panelAlumno"
        element={
          alumnoRoute.authorized ? (
            <PanelAlumno />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;