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
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex flex-col items-center gap-16 p-8 flex-grow">

        {/* Nivel 1: Dueño */}
        <div className="flex justify-center">
          <Card
            title="Dueño"
            description="Responsable máximo de la organización"
            image={duenioImg}
            extraInfo="Encargado de la visión general y decisiones estratégicas."
          />
        </div>

        {/* Nivel 2: Gerente y HeadCoach */}
        <div className="flex justify-center gap-12">
          <Card
            title="Gerente"
            description="Gestión administrativa y operativa"
            image={gerenteImg}
            extraInfo="Coordina la administración y el área financiera de la organización."
          />
          <Card
            title="Head Coach"
            description="Lidera el equipo de entrenadores"
            image={headcoachImg}
            extraInfo="Cuenta con más de 10 años de experiencia en entrenamiento de alto rendimiento."
          />
        </div>

        {/* Nivel 3: Secretaria, Community Manager, Coach1, Coach2 */}
        <div className="grid grid-cols-4 gap-8">
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
      </main>

      <Footer />
    </div>
  );
}