import { useState } from "react";
import MenuHamburguesa from "./MenuHamburguesa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-700 to-indigo-600 text-white p-4 flex items-center justify-between shadow-lg z-50">
        <div className="flex items-center">
          <i className="fas fa-dumbbell text-2xl text-white mr-3"></i>
          <h1 className="text-xl font-bold">La Logia Box</h1>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/"
            className="px-3 py-2 text-white hover:text-indigo-200 transition font-medium"
          >
            Home
          </a>
          <a
            href="/quienes-somos"
            className="px-3 py-2 text-white hover:text-indigo-200 transition font-medium"
          >
            Quienes Somos
          </a>
          <a
            href="/vision"
            className="px-3 py-2 text-white hover:text-indigo-200 transition font-medium"
          >
            Visión
          </a>
          <a
            href="/turnos"
            className="px-3 py-2 text-white hover:text-indigo-200 transition font-medium"
          >
            Turnos
          </a>
          <a
            href="/login"
            className="px-3 py-2 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition"
          >
            Login
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 bg-indigo-800 text-white rounded-lg focus:outline-none hover:bg-indigo-900 transition"
            aria-label="Abrir menú"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-16" />

      {/* Menú hamburguesa */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex justify-end md:hidden">
          {/* Fondo oscuro semitransparente */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
          
          {/* Panel del menú */}
          <div className="relative w-4/5 max-w-sm h-full bg-gradient-to-b from-indigo-800 to-indigo-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out pointer-events-auto">
            <div className="p-4 flex justify-between items-center border-b border-indigo-600">
              <h2 className="text-xl font-bold">Menú</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl hover:text-indigo-200 transition"
                aria-label="Cerrar menú"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4">
              <MenuHamburguesa onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;