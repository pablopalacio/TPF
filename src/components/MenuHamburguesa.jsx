import { Link } from "react-router-dom";

function MenuHamburguesa({ onNavigate }) {
  return (
    <nav className="mt-4">
      <ul className="flex flex-col space-y-2 ">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/quienes-somos"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Quienes Somos
          </Link>
        </li>
        <li>
          <Link
            to="/vision"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Visión
          </Link>
        </li>
        <li>
          <Link
            to="/galeria"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Galería
          </Link>
        </li>
        <li>
          <Link
            to="/turnos"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Turnos
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            onClick={onNavigate}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuHamburguesa;