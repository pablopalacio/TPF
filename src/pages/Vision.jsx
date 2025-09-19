import Header from "../components/Header";
import Footer from "../components/Footer";

const Vision = () => {
  return (
    <div className="min-h-screen bg-[url('assets/tf2.jpg')] bg-no-repeat bg-cover bg-fixed bg-[center_35%] flex flex-col">
      {/* Header funcional */}
      <Header />

      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 z-0"></div>

      {/* Contenido principal */}
      <main className="flex justify-center items-center px-4 py-16 flex-grow relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-800 mb-2">
              Nuestra Visión
            </h1>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1 flex-shrink-0">
                <i className="fas fa-bullseye text-indigo-600 text-xl"></i>
              </div>
              <p>
                Ser un gimnasio adaptativo e inclusivo, donde cada persona
                encuentre un espacio seguro, motivador y cercano para entrenar
                sin importar su experiencia, edad o condición física.
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1 flex-shrink-0">
                <i className="fas fa-heart text-indigo-600 text-xl"></i>
              </div>
              <p>
                Queremos que quienes nos elijan se sientan cómodos desde el
                primer día, acompañados por un equipo que promueve la confianza,
                el respeto y la superación personal.
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1 flex-shrink-0">
                <i className="fas fa-users text-indigo-600 text-xl"></i>
              </div>
              <p>
                Nuestro objetivo es derribar barreras, fomentar la diversidad y
                crear una comunidad en la que cada miembro pueda desarrollarse a
                su propio ritmo, descubriendo el poder del movimiento y el
                bienestar.
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1 flex-shrink-0">
                <i className="fas fa-rocket text-indigo-600 text-xl"></i>
              </div>
              <p>
                Aspiramos a ser más que un lugar de entrenamiento: un punto de
                encuentro donde se construyen hábitos saludables, se celebran
                logros y se impulsa la fortaleza física y emocional de manera
                integral.
              </p>
            </div>
          </div>

          {/* Cita inspiradora */}
          <div className="mt-10 p-6 bg-indigo-100 rounded-xl border-l-4 border-indigo-600">
            <p className="text-indigo-800 italic text-center font-medium">
              "El éxito no se trata de ser el mejor, sino de ser mejor de lo que
              eras ayer"
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-indigo-800 text-white relative z-10">
        <Footer />
      </footer>
    </div>
  );
};

export default Vision;
