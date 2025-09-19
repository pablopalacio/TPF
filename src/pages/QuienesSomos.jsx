import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

// Import de imágenes locales
import duenioImg from "../assets/2.jpg";
import gerenteImg from "../assets/3.jpg";
import headcoachImg from "../assets/2.jpg";
import secretariaImg from "../assets/2.jpg";
import communityImg from "../assets/3.jpg";
import coach1Img from "../assets/Mauri.jpg";
import coach2Img from "../assets/tf.jpg";

export default function QuienesSomos() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('assets/tf2.jpg')] bg-no-repeat bg-cover bg-fixed bg-[center_35%] flex flex-col justify-center items-center">
        <div className="absolute inset-0 z-0 bg-black/40"></div>
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="w-16 h-16 border-t-4 border-r-4 border-indigo-600 rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Cargando equipo...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('assets/tf2.jpg')] bg-no-repeat bg-cover bg-fixed bg-[center_35%] flex flex-col">
      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 z-0 bg-black/40"></div>

      {/* Header funcional */}
      <Header />

      {/* Contenido principal */}
      <main className="flex justify-center items-center px-4 py-16 flex-grow relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-6xl w-full p-6 md:p-8 lg:p-12">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
              Nuestro Equipo
            </h1>
            <div className="w-20 md:w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
              Conoce al equipo de profesionales que hace posible nuestro gimnasio. 
              Cada miembro aporta su experiencia y pasión para brindarte el mejor servicio.
            </p>
          </div>

          {/* Nivel 1: Dueño */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-800 text-center mb-6 md:mb-8">
              Liderazgo
            </h2>
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <Card
                  title="Dueño"
                  description="Responsable máximo de la organización"
                  image={duenioImg}
                  extraInfo="Encargado de la visión general y decisiones estratégicas."
                />
              </div>
            </div>
          </div>

          {/* Nivel 2: Gerente y HeadCoach - Corregido para alinear las tarjetas */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-800 text-center mb-6 md:mb-8">
              Dirección
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8">
              <div className="flex-1 max-w-md mx-auto">
                <Card
                  title="Gerente"
                  description="Gestión administrativa y operativa"
                  image={gerenteImg}
                  extraInfo="Coordina la administración y el área financiera de la organización."
                  className="h-full"
                />
              </div>
              <div className="flex-1 max-w-md mx-auto">
                <Card
                  title="Head Coach"
                  description="Lidera el equipo de entrenadores"
                  image={headcoachImg}
                  extraInfo="Cuenta con más de 10 años de experiencia en entrenamiento de alto rendimiento."
                  className="h-full"
                />
              </div>
            </div>
          </div>

          {/* Nivel 3: Secretaria, Community Manager, Coach1, Coach2 */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-800 text-center mb-6 md:mb-8">
              Equipo Especializado
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              <Card
                title="Secretaria"
                description="Asistencia administrativa"
                image={secretariaImg}
                extraInfo="Gestiona citas, documentos y soporte administrativo."
              />
              <Card
                title="Community Manager"
                description="Gestión de redes sociales y marketing"
                image={communityImg}
                extraInfo="Se encarga de la comunicación y visibilidad en redes sociales."
              />
              <Card
                title="Coach 1"
                description="Entrenador especializado"
                image={coach1Img}
                extraInfo="Entrenador en área de fuerza y acondicionamiento."
              />
              <Card
                title="Coach 2"
                description="Entrenador especializado"
                image={coach2Img}
                extraInfo="Entrenador en área de técnica y desarrollo físico."
              />
            </div>
          </div>

          {/* Sección de información adicional */}
          <div className="mt-12 md:mt-16 p-6 md:p-8 bg-indigo-50 rounded-xl md:rounded-2xl border border-indigo-100">
            <h2 className="text-xl md:text-2xl font-bold text-indigo-800 text-center mb-4">
              Nuestra Filosofía
            </h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto text-base md:text-lg">
              Creemos en el trabajo en equipo y en la constante mejora. Cada miembro de nuestro 
              equipo está comprometido con tu progreso y bienestar, brindándote la atención 
              personalizada que necesitas para alcanzar tus objetivos.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-indigo-800 text-white relative z-10">
        <Footer />
      </footer>
    </div>
  );
}