import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function WelcomeView() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/menu", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="max-w-lg mx-auto pt-10 px-5 flex flex-col items-center">
        <img src="/logo.png" alt="Logotipo MyC" className="mb-6" />
        <div className="bg-[#1A1A1A] border border-[#D4AF37] shadow-lg px-8 py-12 rounded-lg flex flex-col items-center w-full">
          <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2 text-center">
            ¡Bienvenido a Restaurante MYC!
          </h1>
          <p className="text-lg text-[#B3B3B3] mb-8 text-center">
            Disfruta de la mejor experiencia gastronómica.<br />
            Reserva tu mesa, explora nuestro menú y realiza tus pedidos de forma fácil y rápida.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to="/auth/login"
              className="bg-[#D4AF37] hover:bg-[#E8C563] p-3 text-lg w-full uppercase text-[#0D0D0D] rounded-lg font-bold text-center transition"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/auth/register"
              className="bg-[#1A1A1A] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#222] p-3 text-lg w-full uppercase rounded-lg font-bold text-center transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}