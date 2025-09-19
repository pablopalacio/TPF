import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Body() {
  const navigate = useNavigate();
  const [loadingEmpezaHoy, setLoadingEmpezaHoy] = useState(false);
  const [loadingConoceMas, setLoadingConoceMas] = useState(false);

  const handleEmpezaHoy = () => {
    setLoadingEmpezaHoy(true);
    // Simular una pequeña demora antes de navegar
    setTimeout(() => {
      navigate("/turnos");
      setLoadingEmpezaHoy(false);
    }, 800);
  };

  const handleConoceMas = () => {
    setLoadingConoceMas(true);
    // Desplazamiento suave a la sección de beneficios
    const beneficiosSection = document.getElementById("beneficios");
    if (beneficiosSection) {
      beneficiosSection.scrollIntoView({ behavior: "smooth" });
    }
    // Quitar el estado de carga después de un breve momento
    setTimeout(() => {
      setLoadingConoceMas(false);
    }, 1000);
  };

  return (
    <main className="flex-grow">
      <section className="relative bg-[center_top_70%] bg-no-repeat bg-[url('assets/home.jpg')] bg-cover p-8 min-h-screen flex items-center justify-center">
        {/* Overlay para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-700/60"></div>
        
        <div className="px-4 mx-auto max-w-screen-xl text-center py-16 relative z-10">
          <h1 className="mb-6 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Transforma tu cuerpo, <span className="text-pink-400">transforma tu vida</span>
          </h1>
          
          <p className="mb-10 text-xl font-normal text-indigo-100 lg:text-2xl max-w-3xl mx-auto">
            Descubre tu potencial en un ambiente inclusivo donde cada logro cuenta. 
            No se trata de ser el mejor, sino de ser mejor que ayer.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleEmpezaHoy}
              disabled={loadingEmpezaHoy}
              className="inline-flex justify-center items-center py-4 px-8 text-lg font-semibold text-center text-white rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:ring-4 focus:ring-pink-300 shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {loadingEmpezaHoy ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </>
              ) : (
                <>
                  Empeza hoy!
                  <svg
                    className="w-5 h-5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Flecha indicadora para hacer scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>
      {/* Sección de beneficios */}
      <section id="beneficios" className="py-16 bg-gradient-to-b from-indigo-50 to-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">¿Por qué elegirnos?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">Comunidad Inclusiva</h3>
              <p className="text-gray-600">Un ambiente donde todos son bienvenidos sin importar su nivel de experiencia o condición física.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-dumbbell text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">Equipamiento Moderno</h3>
              <p className="text-gray-600">Contamos con equipos de última generación para optimizar tu entrenamiento y resultados.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">Enfoque Integral</h3>
              <p className="text-gray-600">No solo nos enfocamos en tu físico, sino también en tu bienestar mental y emocional.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
