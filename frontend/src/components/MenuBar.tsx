import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Tipos para mejor type safety
type UserRole = "cliente" | "mesero" | "admin";

interface MenuOption {
  to: string;
  label: string;
  icon?: string; // Para agregar iconos en el futuro
}

const menuOptions: Record<UserRole, MenuOption[]> = {
  cliente: [
    { to: "/menu", label: "Inicio" },
    { to: "/platos", label: "Platos" },
    { to: "/reservas", label: "Mis Reservas" },
  ],
  mesero: [
    { to: "/menu", label: "Inicio" },
    { to: "/mesas", label: "Mesas" },
    { to: "/pedidos", label: "Pedidos" },
  ],
  admin: [
    { to: "/menu", label: "Inicio" },
    { to: "/usuarios", label: "Usuarios" },
    { to: "/platos", label: "Platos" },
    { to: "/mesas", label: "Mesas" },
    { to: "/reservas", label: "Reservas" },
  ],
};

export default function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rol, setRol] = useState<UserRole>("cliente");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userRol = localStorage.getItem("rol") as UserRole;
    if (userRol && menuOptions[userRol]) {
      setRol(userRol);
    }
  }, []);

  const handleLogout = () => {
    // Confirmación antes de cerrar sesión
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      navigate("/", { replace: true });
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const currentMenuOptions = menuOptions[rol] || menuOptions.cliente;

  return (
    <nav className="bg-[#1A1A1A] border-b border-[#D4AF37] py-6 px-4 md:px-8 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link 
          to="/menu" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-12 h-12 object-contain"
            onError={(e) => {
              // Fallback si no se encuentra la imagen
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-[#D4AF37] font-bold text-2xl hidden sm:block">
            Restaurante
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {currentMenuOptions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 text-lg font-semibold transition-all duration-200 ${
                isActiveRoute(item.to)
                  ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                  : "text-[#F5F5F5] hover:text-[#D4AF37]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Link
            to="/perfil"
            className={`px-4 py-2 text-lg font-semibold transition-all duration-200 ${
              isActiveRoute("/perfil")
                ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                : "text-[#F5F5F5] hover:text-[#D4AF37]"
            }`}
          >
            Perfil
          </Link>
          
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors duration-200 border border-[#333] rounded-lg hover:border-[#D4AF37]"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-6 pb-6 border-t border-[#D4AF37]/30 bg-[#0D0D0D] rounded-lg mx-2">
          <div className="flex flex-col space-y-1 pt-6 px-4">
            {currentMenuOptions.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                  isActiveRoute(item.to)
                    ? "text-[#D4AF37] bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]"
                    : "text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#333]/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              to="/perfil"
              onClick={() => setIsMenuOpen(false)}
              className={`px-4 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                isActiveRoute("/perfil")
                  ? "text-[#D4AF37] bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]"
                  : "text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#333]/20"
              }`}
            >
              Perfil
            </Link>
            
            <button
              onClick={handleLogout}
              className="mx-1 mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-lg transition-all duration-200 shadow-md"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}