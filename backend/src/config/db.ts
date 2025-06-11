import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Usuarios } from "../models/Usuarios";
import { Reservas } from "../models/Reservas";
import { Pedidos } from "../models/Pedidos";
import { Platos } from "../models/Platos";
import { Mesas } from "../models/Mesas";
import { PedidoPlato } from "../models/PedidoPlato";
import { Categorias } from "../models/Categoria";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  models: [Usuarios, Reservas, Pedidos, Platos, Mesas, PedidoPlato, Categorias],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /TIMEOUT/,
    ],
    max: 3,
  },
});
