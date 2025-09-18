import { useState } from "react";

const Card = ({ title, description, image, extraInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card pequeña */}
      <div
        className="relative group w-48 h-64 rounded-lg overflow-hidden shadow-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Capa que aparece al hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
          <h5 className="text-lg font-bold text-white mb-2">{title}</h5>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Contenido del modal */}
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-11/12 max-w-lg p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-2xl"
            >
              &times;
            </button>

            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover object-[0_12%] rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {description}
            </p>

            {/* Info adicional */}
            {extraInfo && (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {extraInfo}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;