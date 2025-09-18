import { useEffect, useRef, useState } from 'react';

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

  return (
    <footer
      ref={footerRef}
      className={`
        bg-secondary text-secondary-foreground transition-all duration-1000 ease-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Address */}
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-semibold">Dirección</p>
              <p className="text-sm opacity-90">Email</p>
            </div>
          </div>
          {/* Map */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-12 bg-muted rounded border-2 border-accent flex items-center justify-center">
              <span className="text-xs text-muted-foreground">map</span>
            </div>
          </div>
          {/* Phone & Social */}
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-semibold">teléfono</p>
              <p className="text-sm opacity-90">y Fb</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm opacity-75">© 2024 LA Logia Box. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
