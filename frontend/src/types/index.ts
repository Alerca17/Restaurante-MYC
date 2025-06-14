export type User = {
    id: number;
    nombre: string;
    correo: string;
    telefono?: string;
    rol: 'cliente' | 'admin' | 'mesero';
    contrasena: string; 
}

export type RegisterForm = Pick<User, 'nombre' | 'correo' | 'telefono' | 'rol'> & {

    contrasena: string,
    confirmPassword: string
}

export type LoginForm = Pick<User, 'correo'> & {

    contrasena: string
}