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
    <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl w-full max-w-md mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-2">{nombreBloque}</h2>
        <div className="w-16 sm:w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {turnos[bloque].map((t, i) => (
          <div
            key={i}
            onClick={() => abrirModal(bloque, i)}
            className="flex justify-between items-center p-3 sm:p-4 bg-indigo-50/80 rounded-lg sm:rounded-xl border border-indigo-100 cursor-pointer hover:bg-indigo-100/80 transition-all duration-300"
          >
            <span className="text-base sm:text-lg font-medium text-indigo-900">{t.hora}</span>
            <span className={`text-xs sm:text-sm font-semibold ${t.reservados < 15 ? 'text-indigo-600' : 'text-red-500'}`}>
              {t.reservados}/15
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[url('assets/tf2.jpg')] bg-no-repeat bg-cover bg-fixed bg-[center_35%] flex flex-col">
      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 z-0 bg-black/30"></div>

      {/* Header funcional */}
      <Header />

      {/* Contenido principal */}
      <main className="flex justify-center items-center px-3 sm:px-4 py-10 sm:py-12 md:py-16 flex-grow relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl max-w-6xl w-full p-4 sm:p-6 md:p-8 lg:p-12 mx-2 sm:mx-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
              Turnos Disponibles
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              Reservá tu turno para entrenar. Seleccioná el horario que más te convenga y completá tus datos.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 justify-center">
            {renderBloque("manana", "Turno Mañana")}
            {renderBloque("tarde", "Turno Tarde")}
          </div>
        </div>
      </main>

      <footer className="bg-indigo-800 text-white relative z-10">
        <Footer />
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-4">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl w-full max-w-sm sm:max-w-md mx-auto relative max-h-[90vh] overflow-y-auto">
            {/* Botón cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-indigo-800 text-xl bg-indigo-100 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
            >
              ×
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-2">
                Reservar Turno
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-800">
                {turnos[selectedTurno.bloque][selectedTurno.index].hora}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 font-medium">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ingresá tu nombre"
                />
              </div>

              <div>
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 font-medium">Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ingresá tu apellido"
                />
              </div>
            </div>

            <button
              onClick={reservarTurno}
              className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 mt-4 sm:mt-6 font-semibold text-base sm:text-lg"
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Turnos;