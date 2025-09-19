import { Link } from "react-router-dom";
import { useState } from "react";

function MenuHamburguesa({ onNavigate }) {
  const [loadingStates, setLoadingStates] = useState({
    home: false,
    quienesSomos: false,
    vision: false,
    turnos: false,
    login: false
  });

  const handleNavigation = (page) => {
    // Activar el estado de carga para la página específica
    setLoadingStates(prev => ({
      ...prev,
      [page]: true
    }));

    // Ejecutar la función de navegación
    if (onNavigate) onNavigate();

    // Simular tiempo de carga (en una app real, esto sería la carga real de la página)
    setTimeout(() => {
      setLoadingStates(prev => ({
        ...prev,
        [page]: false
      }));
    }, 800);
  };

  return (
    <nav className="mt-4">
      <ul className="flex flex-col space-y-3">
        <li>
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-white bg-indigo-700 bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-300 group relative"
            onClick={() => handleNavigation("home")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition">
              {loadingStates.home ? (
                <i className="fas fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fas fa-home text-sm"></i>
              )}
            </div>
            <span className="font-medium">Home</span>
            {loadingStates.home && (
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/quienes-somos"
            className="flex items-center px-4 py-3 text-white bg-indigo-700 bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-300 group relative"
            onClick={() => handleNavigation("quienesSomos")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition">
              {loadingStates.quienesSomos ? (
                <i className="fas fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fas fa-info-circle text-sm"></i>
              )}
            </div>
            <span className="font-medium">Quienes Somos</span>
            {loadingStates.quienesSomos && (
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/vision"
            className="flex items-center px-4 py-3 text-white bg-indigo-700 bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-300 group relative"
            onClick={() => handleNavigation("vision")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition">
              {loadingStates.vision ? (
                <i className="fas fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fas fa-eye text-sm"></i>
              )}
            </div>
            <span className="font-medium">Visión</span>
            {loadingStates.vision && (
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/turnos"
            className="flex items-center px-4 py-3 text-white bg-indigo-700 bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-300 group relative"
            onClick={() => handleNavigation("turnos")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition">
              {loadingStates.turnos ? (
                <i className="fas fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fas fa-calendar-alt text-sm"></i>
              )}
            </div>
            <span className="font-medium">Turnos</span>
            {loadingStates.turnos && (
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="flex items-center px-4 py-3 text-white bg-indigo-700 bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-300 group relative"
            onClick={() => handleNavigation("login")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition">
              {loadingStates.login ? (
                <i className="fas fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fas fa-sign-in-alt text-sm"></i>
              )}
            </div>
            <span className="font-medium">Login</span>
            {loadingStates.login && (
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuHamburguesa;