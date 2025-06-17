import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Loader2, AlertCircle, Mail, Phone, Shield, User } from "lucide-react";
import api from "../config/axios";

// Tipos
type DecodedToken = {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  exp: number;
};

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  rol: string;
};

export default function PerfilView() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token disponible");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.id;

      api.get(`/api/usuarios/${userId}`)
        .then((res) => setUsuario(res.data))
        .catch(() => setError("Error al cargar los datos del usuario"))
        .finally(() => setLoading(false));
    } catch (err) {
      setError("Token inválido");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="animate-spin w-14 h-14 text-[#D4AF37]" />
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-[#F5F5F5]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
        <p className="text-lg">{error || "Error al cargar el perfil"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-2xl shadow-2xl p-10 md:p-16 text-center md:text-left">
        {/* Avatar */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-36 h-36 rounded-full bg-[#D4AF37] text-[#0D0D0D] flex items-center justify-center text-5xl font-bold shadow-xl">
            {usuario.nombre
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-[#F5F5F5]">{usuario.nombre}</h1>
            <p className="text-[#C9A63A] mt-2 text-xl font-semibold capitalize">
              {usuario.rol}
            </p>
            <p className="text-sm text-[#B3B3B3] mt-1">ID #{usuario.id}</p>
          </div>
        </div>

        {/* Datos */}
        <div className="space-y-8 text-lg">
          <div className="flex items-center gap-4">
            <Mail className="text-[#C9A63A]" size={28} />
            <div>
              <p className="text-[#B3B3B3] text-base">Correo electrónico</p>
              <p className="text-xl">{usuario.correo}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-[#C9A63A]" size={28} />
            <div>
              <p className="text-[#B3B3B3] text-base">Teléfono</p>
              <p className="text-xl">{usuario.telefono || "No registrado"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Shield className="text-[#C9A63A]" size={28} />
            <div>
              <p className="text-[#B3B3B3] text-base">Rol asignado</p>
              <span className="bg-[#D4AF37] text-[#0D0D0D] px-4 py-1 rounded-full text-lg font-medium shadow-md">
                {usuario.rol.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
