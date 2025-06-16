import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Tipos para mejor type safety
type UserRole = "cliente" | "mesero" | "admin";

interface MenuOption {
  to: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

interface UserInfo {
  nombre?: string;
  correo?: string;
  rol: UserRole;
}

const menuOptions: Record<UserRole, MenuOption[]> = {
  cliente: [
    { 
      to: "/platos", 
      label: "Ver Platos", 
      description: "Explora nuestro delicioso menú",
      icon: "🍽️",
      color: "from-orange-500 to-orange-600"
    },
    { 
      to: "/reservas", 
      label: "Mis Reservas", 
      description: "Gestiona tus reservaciones",
      icon: "📅",
      color: "from-blue-500 to-blue-600"
    },
    { 
      to: "/mesas", 
      label: "Mesas Disponibles", 
      description: "Encuentra la mesa perfecta",
      icon: "🪑",
      color: "from-green-500 to-green-600"
    },
  ],
  mesero: [
    { 
      to: "/mesas", 
      label: "Mesas", 
      description: "Administra las mesas del restaurante",
      icon: "🏪",
      color: "from-purple-500 to-purple-600"
    },
    { 
      to: "/pedidos", 
      label: "Pedidos", 
      description: "Gestiona los pedidos de clientes",
      icon: "📋",
      color: "from-indigo-500 to-indigo-600"
    },
  ],
  admin: [
    { 
      to: "/usuarios", 
      label: "Usuarios", 
      description: "Administra usuarios del sistema",
      icon: "👥",
      color: "from-red-500 to-red-600"
    },
    { 
      to: "/platos", 
      label: "Platos", 
      description: "Gestiona el menú del restaurante",
      icon: "🍽️",
      color: "from-orange-500 to-orange-600"
    },
    { 
      to: "/mesas", 
      label: "Mesas", 
      description: "Configura mesas y capacidad",
      icon: "🪑",
      color: "from-green-500 to-green-600"
    },
    { 
      to: "/reservas", 
      label: "Reservas", 
      description: "Supervisa todas las reservaciones",
      icon: "📅",
      color: "from-blue-500 to-blue-600"
    },
  ],
};

const roleDisplayNames = {
  cliente: "Cliente",
  mesero: "Mesero",
  admin: "Administrador"
};

export default function MenuView() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({ rol: "cliente" });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRol = localStorage.getItem("rol") as UserRole;
    const userName = localStorage.getItem("userName") || "Usuario";
    const userEmail = localStorage.getItem("userEmail") || "";

    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (userRol && menuOptions[userRol]) {
      setUserInfo({
        nombre: userName,
        correo: userEmail,
        rol: userRol
      });
    }

    setIsLoading(false);
  }, [navigate]);

  // Actualizar hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      navigate("/auth/login");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-[#D4AF37] text-2xl font-semibold">
          Cargando...
        </div>
      </div>
    );
  }

  const currentMenuOptions = menuOptions[userInfo.rol] || menuOptions.cliente;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-[#1A1A1A] border border-[#D4AF37] rounded-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img 
                  src="/logo.png" 
                  alt="Logotipo" 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-[#F5F5F5]">
                    Bienvenido, {userInfo.nombre || "Usuario"}
                  </h1>
                  <p className="text-[#D4AF37] text-lg font-semibold">
                    {roleDisplayNames[userInfo.rol]}
                  </p>
                </div>
              </div>
              
              <div className="text-right text-[#F5F5F5]">
                <div className="text-2xl font-bold text-[#D4AF37]">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm capitalize">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentMenuOptions.map((item, index) => (
            <div
              key={item.to}
              className="bg-[#1A1A1A] border border-[#333] hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer group"
              onClick={() => navigate(item.to)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.label}
                </h3>
                <p className="text-[#B3B3B3] text-sm mb-4">
                  {item.description}
                </p>
                <div className={`w-full h-1 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37] rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-4 text-center">
            Acciones Rápidas
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/perfil")}
              className="flex items-center justify-center space-x-2 bg-[#D4AF37] hover:bg-[#E8C563] px-6 py-3 text-[#0D0D0D] rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
            >
              <span>👤</span>
              <span>Mi Perfil</span>
            </button>
            
            {userInfo.rol === "admin" && (
              <button
                onClick={() => navigate("/reportes")}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
              >
                <span>📊</span>
                <span>Reportes</span>
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#B3B3B3] text-sm">
          <p>© 2024 Sistema de Restaurante - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}