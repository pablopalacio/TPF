import { useState } from "react";
import MenuHamburguesa from "./MenuHamburguesa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-black text-white p-7 flex items-center justify-center z-50">
        <h1 className="text-xl font-bold mx-auto text-center w-full sm:w-auto">
          La Logia Box
        </h1>

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 bg-gray-800 text-white rounded-md focus:outline-none"
            aria-label="Abrir menú"
          >
            &#9776;
          </button>
        </div>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-20" />

      {/* Menú hamburguesa solo ocupa su contenido */}
{menuOpen && (
  <div className="fixed top-8 right-0 z-40 flex justify-end">
    <div className="w-64 sm:w-80 h-full bg-black text-amber-50 shadow-lg p-4 pointer-events-auto transition-transform duration-300 ease-in-out">
      <div className="flex justify-end">
        <button
          onClick={() => setMenuOpen(false)}
          className="text-gray-500 text-3xl hover:text-red-500"
          aria-label="Cerrar menú"
        >
          &times;
        </button>
      </div>
      <MenuHamburguesa onNavigate={() => setMenuOpen(false)} />
    </div>
  </div>
)}
    </>
  );
}

export default Header;