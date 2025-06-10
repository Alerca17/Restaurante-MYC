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
  body("categoriaId").isInt().withMessage("ID de categoría inválido"),
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
  body("clienteId").isInt({ min: 1 }).withMessage("ID de cliente inválido"),

  body("mesaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de mesa inválido"),

  body("platos")
    .isArray({ min: 1 })
    .withMessage("Debes incluir al menos un plato en el pedido"),

  body("platos.*.platoId")
    .isInt({ min: 1 })
    .withMessage("ID de plato inválido en la lista de platos"),

  body("platos.*.cantidad")
    .isInt({ min: 1 })
    .withMessage("Cantidad mínima por plato es 1"),
];

export const validarPedidoPlato = [
  body("pedidoId").isInt({ min: 1 }).withMessage("ID de pedido inválido"),

  body("platoId").isInt({ min: 1 }).withMessage("ID de plato inválido"),

  body("cantidad").isInt({ min: 1 }).withMessage("Cantidad mínima es 1"),

  body("precioUnitario")
    .isFloat({ gt: 0 })
    .withMessage("Precio debe ser mayor a 0"),
];

export const validarCategoria = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres"),
];
