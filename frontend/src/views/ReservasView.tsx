import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CalendarDays, Users, Loader2, AlertCircle, ListChecks } from "lucide-react";
import api from "../config/axios";

type DecodedToken = {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
    exp: number;
};

type Reserva = {
    id: number;
    fecha: string;
    hora: string;
    personas: number;
    estado: string;
};

export default function MisReservas() {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No hay sesión activa.");
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const userId = decoded.id;

            api.get(`/api/reservas?cliente_id=${userId}`)
                .then(res => setReservas(res.data))
                .catch(() => setError("No se pudieron cargar las reservas"))
                .finally(() => setLoading(false));
        } catch (e) {
            setError("Token inválido.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex justify-center items-center">
                <Loader2 className="animate-spin text-[#D4AF37] w-10 h-10" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-[#F5F5F5]">
                <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-[#D4AF37]">Mis Reservas</h1>

                {reservas.length === 0 ? (
                    <p className="text-center text-[#B3B3B3]">No tienes reservas registradas.</p>
                ) : (
                    <div className="space-y-6">
                        {reservas.map((reserva) => (
                            <div key={reserva.id} className="bg-[#1A1A1A] rounded-lg p-6 shadow-lg border border-[#333]">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-[#D4AF37] flex items-center gap-2">
                                        <ListChecks size={20} />
                                        Reserva #{reserva.id}
                                    </h2>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${reserva.estado === "confirmada"
                                            ? "bg-green-600"
                                            : reserva.estado === "pendiente"
                                                ? "bg-yellow-600"
                                                : "bg-red-600"
                                            } text-white`}
                                    >
                                        {reserva.estado}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={18} className="text-[#C9A63A]" />
                                        <p className="text-[#F5F5F5]">
                                            Fecha:{" "}
                                            <span className="text-[#B3B3B3]">
                                                {new Date(reserva.fecha).toLocaleDateString()} - {reserva.hora}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users size={18} className="text-[#C9A63A]" />
                                        <p className="text-[#F5F5F5]">
                                            Personas: <span className="text-[#B3B3B3]">{reserva.personas}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
