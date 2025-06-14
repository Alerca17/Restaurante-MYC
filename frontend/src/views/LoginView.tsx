import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from '../components/ErrorMessage'
import type { LoginForm } from "../types"
import api from "../config/axios"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export default function LoginView() {

    const initialValues: LoginForm = {

        correo: "",
        contrasena: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = async (formData: LoginForm) => {

        try {

            const { data } = await api.post(`/api/auth/login`, formData)
            toast.success(data.mensaje)

        } catch (error) {

            if (isAxiosError(error) && error.response) {

                toast.error(error.response?.data.error)
            }
        }
    }

    return (
        <>
            <h1 className='text-4xl text-[#F5F5F5] font-bold'>Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-[#1A1A1A] border border-[#D4AF37] shadow-lg px-5 py-20 rounded-lg space-y-10 mt-10"
                noValidate
            >
                {/* Campo correo */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="correo" className="text-2xl text-[#F5F5F5]">E-mail</label>
                    <input
                        id="correo"
                        type="email"
                        placeholder="Email de registro"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register("correo", {
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Correo no válido",
                            },
                        })}
                    />
                    {errors.correo && (
                        <ErrorMessage>{errors.correo.message}</ErrorMessage>
                    )}
                </div>

                {/* Campo contraseña */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="contrasena" className="text-2xl text-[#F5F5F5]">Contraseña</label>
                    <input
                        id="contrasena"
                        type="password"
                        placeholder="Tu contraseña"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register("contrasena", {
                            required: "La contraseña es obligatoria",
                        })}
                    />
                    {errors.contrasena && (
                        <ErrorMessage>{errors.contrasena.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#E8C563] p-3 text-lg w-full uppercase text-[#0D0D0D] rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>


            <nav className="mt-10 py-2 bg-[#1A1A1A]">

                <Link to="/auth/register" className="text-[#D4AF37] hover:text-[#E8C563] text-center text-lg block">
                    ¿No Tienes Cuenta? Regístrate Aquí
                </Link>

            </nav>
        </>
    );
}
