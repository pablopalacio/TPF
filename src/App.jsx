import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Vision from "./pages/Vision.jsx";
import Galeria from "./pages/Galeria.jsx";
import Turnos from "./pages/Turnos.jsx";
import PanelAdmin from "./pages/PanelAdmin.jsx";
import PanelAlumno from "./pages/PanelAlumno.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/turnos" element={<Turnos />} />
      <Route path="/panelAdmin" element={<PanelAdmin />} />
      <Route path="/panelAlumno" element={<PanelAlumno />} />
    </Routes>
  );
}

export default App;