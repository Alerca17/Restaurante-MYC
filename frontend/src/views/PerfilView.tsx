import { useEffect, useState } from "react";

export default function PerfilView() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    // Puedes obtener los datos del usuario desde localStorage o hacer una petición al backend
    const user = localStorage.getItem("usuario");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  if (!usuario) return <p className="text-[#F5F5F5]">Cargando perfil...</p>;

  return (
    <div className="bg-[#1A1A1A] border border-[#D4AF37] max-w-lg mx-auto mt-10 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4">Mi Perfil</h2>
      <p className="text-[#B3B3B3] mb-2"><strong>Nombre:</strong> {usuario.nombre}</p>
      <p className="text-[#B3B3B3] mb-2"><strong>Correo:</strong> {usuario.correo}</p>
      <p className="text-[#B3B3B3] mb-2"><strong>Rol:</strong> {usuario.rol}</p>
      {/* Puedes agregar edición aquí */}
    </div>
  );
}