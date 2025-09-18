import Header from "../components/Header";
import Footer from "../components/Footer";

const Vision = () => {
  return (
    <div className="min-h-screen bg-[url('assets/tf2.jpg')] bg-no-repeat bg-cover bg-[center_35%] flex flex-col">
      {/* Header funcional */}
      <Header />

      {/* Contenido principal */}
      <main className="flex justify-center px-4 py-10 flex-grow">
        <div className="bg-pink-300/35 rounded-xl shadow-md max-w-3xl w-full p-28">
          <h1 className="text-xl font-bold mb-4 text-gray-800">Visión</h1>
          <p className="text-gray-900 leading-relaxed mb-3">
            Ser un gimnasio adaptativo e inclusivo, donde cada persona encuentre un espacio seguro,
            motivador y cercano para entrenar sin importar su experiencia, edad o condición física.
          </p>
          <p className="text-gray-900 leading-relaxed mb-3">
            Queremos que quienes nos elijan se sientan cómodos desde el primer día,
            acompañados por un equipo que promueve la confianza, el respeto y la superación personal.
          </p>
          <p className="text-gray-900 leading-relaxed mb-3">
            Nuestro objetivo es derribar barreras, fomentar la diversidad y crear una comunidad en la que cada miembro
            pueda desarrollarse a su propio ritmo, descubriendo el poder del movimiento y el bienestar.
          </p>
          <p className="text-gray-900 leading-relaxed">
            Aspiramos a ser más que un lugar de entrenamiento: un punto de encuentro donde se construyen hábitos saludables,
            se celebran logros y se impulsa la fortaleza física y emocional de manera integral.
          </p>
        </div>
      </main>
      <footer className="bg-pink-500 text-white">
        <Footer />
      </footer>
    </div>
  );
};
export default Vision