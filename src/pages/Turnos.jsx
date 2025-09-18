import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Turnos() {
  const [turnos, setTurnos] = useState({
    manana: [
      { hora: "7hs - 8hs", reservados: 0 },
      { hora: "8hs - 9hs", reservados: 0 },
      { hora: "9hs - 10hs", reservados: 0 },
    ],
    tarde: [
      { hora: "14hs - 15hs", reservados: 0 },
      { hora: "15hs - 16hs", reservados: 0 },
      { hora: "16hs - 17hs", reservados: 0 },
      { hora: "17hs - 18hs", reservados: 0 },
      { hora: "18hs - 19hs", reservados: 0 },
      { hora: "19hs - 20hs", reservados: 0 },
      { hora: "20hs - 21hs", reservados: 0 },
      { hora: "21hs - 22hs", reservados: 0 },
    ],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const abrirModal = (bloque, index) => {
    setSelectedTurno({ bloque, index });
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setNombre("");
    setApellido("");
    setSelectedTurno(null);
  };

  const reservarTurno = () => {
    if (!nombre || !apellido) return alert("Completá todos los campos");

    const { bloque, index } = selectedTurno;
    const copiaTurnos = { ...turnos };
    const turnoActual = copiaTurnos[bloque][index];

    if (turnoActual.reservados < 15) {
      turnoActual.reservados += 1;
      setTurnos(copiaTurnos);
      cerrarModal();
      alert("Reserva realizada con éxito ✅");
    } else {
      alert("Este turno ya está completo ❌");
    }
  };

  const renderBloque = (bloque, nombreBloque) => (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">{nombreBloque}</h2>
      <div className="space-y-3">
        {turnos[bloque].map((t, i) => (
          <div
            key={i}
            onClick={() => abrirModal(bloque, i)}
            className="flex justify-between items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="text-lg font-medium">{t.hora}</span>
            <span className="text-sm text-gray-600 ml-6">{t.reservados}/15</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-500 flex flex-col">
      <Header />

      <main className="flex-1 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-white">Turnos Disponibles</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {renderBloque("manana", "Turno Mañana")}
          {renderBloque("tarde", "Turno Tarde")}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Botón cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Turno de{" "}
              {turnos[selectedTurno.bloque][selectedTurno.index].hora}
            </h2>

            <label className="block mb-2 text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 text-gray-700">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />

            <button
              onClick={reservarTurno}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Reservar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Turnos;