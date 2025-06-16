import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const menuOptions = {
  cliente: [
    { to: "/platos", label: "Ver Platos" },
    { to: "/reservas", label: "Mis Reservas" },
    { to: "/mesas", label: "Mesas Disponibles" },
  ],
  mesero: [
    { to: "/mesas", label: "Mesas" },
    { to: "/pedidos", label: "Pedidos" },
  ],
  admin: [
    { to: "/usuarios", label: "Usuarios" },
    { to: "/platos", label: "Platos" },
    { to: "/mesas", label: "Mesas" },
    { to: "/reservas", label: "Reservas" },
  ],
};

export default function MenuView() {
  const navigate = useNavigate();
  const [rol, setRol] = useState("cliente");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRol = localStorage.getItem("rol");
    if (!token) {
      navigate("/auth/login");
    } else if (userRol) {
      setRol(userRol);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
      <div className="bg-[#1A1A1A] border border-[#D4AF37] px-8 py-12 rounded-lg text-center w-full max-w-lg">
        <img src="/logo.png" alt="Logotipo MyC" className="w-20 h-20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-6">Menú Principal</h1>
        <nav className="flex flex-col gap-4 w-full">
          {menuOptions[rol as keyof typeof menuOptions].map((item) => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className="bg-[#D4AF37] hover:bg-[#E8C563] p-3 text-lg w-full uppercase text-[#0D0D0D] rounded-lg font-bold text-center transition"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}