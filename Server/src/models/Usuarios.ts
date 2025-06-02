import {
  Table,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from "sequelize-typescript";
import { Reservas } from "./Reservas";
import { Pedidos } from "./Pedidos";

@Table({
  tableName: "usuarios",
  timestamps: false, // Si tu tabla no tiene createdAt / updatedAt
})
export class Usuarios extends Model<Usuarios> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  nombre!: string;

  @Unique
  @Column(DataType.STRING)
  correo!: string;

  @Column(DataType.STRING)
  contrasena!: string;

  @Column(DataType.STRING)
  telefono?: string;

  @Column(DataType.ENUM("cliente", "admin", "mesero"))
  rol!: "cliente" | "admin" | "mesero";

  @HasMany(() => Reservas)
  reservas!: Reservas[];

  @HasMany(() => Pedidos)
  pedidos!: Pedidos[];
}
