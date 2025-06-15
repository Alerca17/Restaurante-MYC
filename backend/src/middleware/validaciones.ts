import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
    return;
  }
  next(); // solo se llama si no hay errores
};

export const validarUsuario = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("Debe ser un correo válido"),
  body("contrasena")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("telefono")
    .optional()
    .isMobilePhone("any")
    .withMessage("Teléfono no válido"),
  body("rol")
    .optional()
    .isIn(["cliente", "admin", "mesero"])
    .withMessage("Rol no válido"),
];

export const validarMesa = [
  body("numero")
    .isInt({ gt: 0 })
    .withMessage("Número de mesa debe ser un entero positivo"),
  body("capacidad")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser al menos 1 persona"),
];

export const validarPlato = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("categorias")
    .isArray({ min: 1 })
    .withMessage("Debes asignar al menos una categoría"),
  body("categorias.*")
    .isInt({ min: 1 })
    .withMessage("Cada categoría debe ser un ID válido"),
  body("precio").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0"),
  body("disponible")
    .optional()
    .isBoolean()
    .withMessage("El campo disponible debe ser booleano"),
  body("imagenUrl").optional().trim().isURL().withMessage("URL inválida"),
];

export const validarReserva = [
  body("clienteId").isInt().withMessage("ID de cliente inválido"),
  body("mesaId").isInt().withMessage("ID de mesa inválido"),
  body("fecha").isISO8601().withMessage("Fecha inválida"),
  body("hora")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Hora inválida"),
  body("personas")
    .isInt({ min: 1 })
    .withMessage("Debe haber al menos una persona"),
];

export const validarPedido = [
  // Validar clienteId (requerido, entero positivo)
  body("clienteId").isInt({ min: 1 }).withMessage("ID de cliente inválido"),

  // Validar mesaId (opcional, entero positivo)
  body("mesaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de mesa inválido"),

  // Validar fecha (requerida, formato ISO)
  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener formato válido"),

  // Validar que platos sea un array con al menos un elemento
  body("platos")
    .isArray({ min: 1 })
    .withMessage("Debes incluir al menos un plato en el pedido"),

  // Validar cada plato del array
  body("platos.*.platoId")
    .isInt({ min: 1 })
    .withMessage("ID de plato inválido"),

  body("platos.*.cantidad")
    .isInt({ min: 1 })
    .withMessage("Cantidad mínima por plato es 1"),

  // Validar observaciones (opcional, string)
  body("platos.*.observaciones")
    .optional()
    .isString()
    .withMessage("Las observaciones deben ser texto"),
];

export const validarCategoria = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres"),
];
