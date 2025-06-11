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
  declare nombre: string;

  @Unique
  @Column(DataType.STRING)
  declare correo: string;

  @Column(DataType.STRING)
  declare contrasena: string;

  @Column(DataType.STRING)
  declare telefono?: string;

  @Column(DataType.ENUM("cliente", "admin", "mesero"))
  declare rol: "cliente" | "admin" | "mesero";

  @HasMany(() => Reservas)
  declare reservas: Reservas[];

  @HasMany(() => Pedidos)
  declare pedidos: Pedidos[];
}
