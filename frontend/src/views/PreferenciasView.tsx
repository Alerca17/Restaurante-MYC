import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../config/axios";
import { isAxiosError } from "axios";

type PreferenciaForm = {
    intolerancias: string[];
    estilos_preferidos: string[];
    platos_favoritos: string[];
};

type DecodedToken = {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
    exp: number;
};

const intoleranciasOpciones = [
    "Gluten",
    "Lácteos",
    "Frutos secos",
    "Mariscos",
    "Huevo",
    "Soja"
];

const estilosOpciones = [
    "Picante",
    "Vegetariano",
    "Vegano",
    "Sin sal",
    "Bajo en grasa",
    "Tradicional"
];

const platosFijos = [
    "Bandeja Paisa",
    "Arepa Rellena",
    "Arroz con Pollo",
    "Cazuela de Mariscos",
    "Churrasco",
    "Sancocho Antioqueño",
    "Sudado de Pollo",
    "Trucha al Ajillo",
    "Ensalada César",
    "Risotto de Champiñones",
    "Filete Mignon",
    "Lomo al Trapo",
    "Langostinos al Coco",
    "Pizza Artesanal",
    "Pasta Alfredo",
    "Tarta de Queso",
    "Brownie con Helado"
];


export default function PreferenciasView() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<PreferenciaForm>({
        defaultValues: {
            intolerancias: [],
            estilos_preferidos: [],
            platos_favoritos: []
        }
    });

    // 🛡️ Al montar la vista, validar si ya tiene preferencias
    useEffect(() => {
        const verificarPreferencias = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/auth/login");
                    return;
                }

                const decoded: DecodedToken = jwtDecode(token);
                const cliente_id = decoded.id;

                await api.get(`/api/preferencias/cliente/${cliente_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Si no lanza error → ya existen → redirigir
                navigate("/menu");
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    // No tiene preferencias → permitir continuar
                    return;
                }
                toast.error("Error al verificar tus preferencias");
            }
        };

        verificarPreferencias();
    }, [navigate]);

    const onSubmit = async (data: PreferenciaForm) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token no disponible");

            const decoded: DecodedToken = jwtDecode(token);
            const cliente_id = decoded.id;

            await api.post("/api/preferencias", {
                cliente_id,
                ...data
            });

            toast.success("Preferencias guardadas correctamente");
            navigate("/menu");
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar tus preferencias");
        }
    };

    return (
        <div className="bg-[#1A1A1A] border border-[#D4AF37] px-6 py-10 rounded-lg mt-10 shadow-lg">
            <h1 className="text-3xl font-bold text-[#F5F5F5] mb-8 text-center">
                Selecciona tus preferencias de comida
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-[#F5F5F5]">

                {/* Intolerancias */}
                <div>
                    <h2 className="text-xl mb-3 font-semibold">Intolerancias</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {intoleranciasOpciones.map((intolerancia) => (
                            <label key={intolerancia} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={intolerancia}
                                    {...register("intolerancias")}
                                    className="accent-[#D4AF37]"
                                />
                                {intolerancia}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Estilos Preferidos */}
                <div>
                    <h2 className="text-xl mb-3 font-semibold">Estilos preferidos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {estilosOpciones.map((estilo) => (
                            <label key={estilo} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={estilo}
                                    {...register("estilos_preferidos")}
                                    className="accent-[#D4AF37]"
                                />
                                {estilo}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Platos favoritos */}
                <div>
                    <h2 className="text-xl mb-3 font-semibold">Platos favoritos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {platosFijos.map((plato) => (
                            <label key={plato} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={plato}
                                    {...register("platos_favoritos")}
                                    className="accent-[#D4AF37]"
                                />
                                {plato}
                            </label>
                        ))}
                    </div>
                </div>

                <input
                    type="submit"
                    value="Guardar Preferencias"
                    className="bg-[#D4AF37] hover:bg-[#E8C563] p-3 text-lg w-full uppercase text-[#0D0D0D] rounded-lg font-bold cursor-pointer mt-6"
                />
            </form>
        </div>
    );
}
