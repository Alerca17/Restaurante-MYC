import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import type { RegisterForm } from '../types';
import { isAxiosError } from 'axios';
import api from '../config/axios';
import { toast } from 'sonner';

export default function RegisterView() {
    const navigate = useNavigate();

    const initialValues: RegisterForm = {
        nombre: '',
        correo: '',
        telefono: '',
        rol: 'cliente',
        contrasena: '',
        confirmPassword: ''
    };

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    const contrasena = watch('contrasena');

    const submitRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post(`/api/auth/register`, formData);
            toast.success(data.mensaje || data.message);
            reset();
            navigate("/auth/login"); // Redirigir al login tras el registro
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <>
            <h1 className='text-4xl text-[#F5F5F5] font-bold'>Crear Cuenta</h1>

            <form
                onSubmit={handleSubmit(submitRegister)}
                className="bg-[#1A1A1A] border border-[#D4AF37] shadow-lg px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                {/* Nombre */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="nombre" className="text-2xl text-[#F5F5F5]">Nombre completo</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre completo"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register('nombre', {
                            required: 'El nombre es obligatorio'
                        })}
                    />
                    {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="correo" className="text-2xl text-[#F5F5F5]">E-mail</label>
                    <input
                        id="correo"
                        type="email"
                        placeholder="Correo electrónico"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register('correo', {
                            required: 'El correo electrónico es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Correo no válido",
                            },
                        })}
                    />
                    {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}
                </div>

                {/* Teléfono */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="telefono" className="text-2xl text-[#F5F5F5]">Teléfono</label>
                    <input
                        id="telefono"
                        type="tel"
                        placeholder="Número de teléfono"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register('telefono', {
                            required: 'El número de teléfono es obligatorio',
                        })}
                    />
                    {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
                </div>

                {/* Contraseña */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="contrasena" className="text-2xl text-[#F5F5F5]">Contraseña</label>
                    <input
                        id="contrasena"
                        type="password"
                        placeholder="Tu contraseña"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register('contrasena', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            }
                        })}
                    />
                    {errors.contrasena && <ErrorMessage>{errors.contrasena.message}</ErrorMessage>}
                </div>

                {/* Confirmar contraseña */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="confirmPassword" className="text-2xl text-[#F5F5F5]">Confirmar contraseña</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repite tu contraseña"
                        className="bg-[#0D0D0D] border border-[#333] p-3 rounded-lg placeholder-[#B3B3B3] text-[#F5F5F5]"
                        {...register('confirmPassword', {
                            required: 'Por favor, confirma tu contraseña',
                            validate: (value) => value === contrasena || 'Las contraseñas no coinciden'
                        })}
                    />
                    {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                </div>

                {/* Botón */}
                <input
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#E8C563] p-3 text-lg w-full uppercase text-[#0D0D0D] rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <nav className="mt-10 py-2 bg-[#1A1A1A]">
                <Link to="/auth/login" className="text-[#D4AF37] hover:text-[#E8C563] text-center text-lg block">
                    ¿Ya tienes cuenta? Inicia Sesión Aquí
                </Link>
            </nav>
        </>
    );
}
