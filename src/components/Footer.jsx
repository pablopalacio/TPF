import { useEffect, useRef, useState } from "react";

function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:contacto@lalogiabox.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+5491123456789";
  };

  return (
    <footer
      ref={footerRef}
      className={`
        bg-gradient-to-r from-indigo-800 to-indigo-700 text-white transition-all duration-1000 ease-out 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <i className="fas fa-dumbbell text-2xl text-white mr-3"></i>
              <h3 className="text-xl font-bold">La Logia Box</h3>
            </div>
            <p className="text-indigo-100 mb-4 max-w-md">
              Transformamos vidas a través del fitness. Nuestro compromiso es
              brindarte un espacio inclusivo donde puedas alcanzar tus metas
              físicas y mentales.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/LaLogiaBox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-facebook-f text-white">f</i>
              </a>
              <a
                href="https://instagram.com"
                target=""
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-instagram text-white">i</i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-twitter text-white">x</i>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-indigo-100 hover:text-white transition">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/quienes-somos"
                  className="text-indigo-100 hover:text-white transition">
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a
                  href="/vision"
                  className="text-indigo-100 hover:text-white transition">
                  Visión
                </a>
              </li>
              <li>
                <a
                  href="/galeria"
                  className="text-indigo-100 hover:text-white transition">
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="/turnos"
                  className="text-indigo-100 hover:text-white transition">
                  Turnos
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div
                className="flex items-center text-indigo-100 hover:text-white transition cursor-pointer"
                onClick={handlePhoneClick}>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-phone text-sm">w</i>
                </div>
                <span>+5493764814310</span>
              </div>
              <div
                className="flex items-center text-indigo-100 hover:text-white transition cursor-pointer"
                onClick={handleEmailClick}>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-envelope text-sm">a</i>
                </div>
                <span>www.crossfyapp.com/boxes/lalogiabox</span>
              </div>
              <div className="flex items-center text-indigo-100">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-map-marker-alt text-sm">m</i>
                </div>
                <span>catamarca 1744 Posadas, Misiones 3300</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-indigo-600 text-center">
          <p className="text-indigo-200 text-sm">
            © 2024 La Logia Box. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
