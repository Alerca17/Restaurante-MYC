import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Usuarios } from "./Usuarios";
import { Mesas } from "./Mesas";

@Table({
  tableName: "reservas",
  timestamps: false,
})
export class Reservas extends Model<Reservas> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Usuarios)
  @Column(DataType.INTEGER)
  declare clienteId: number;

  @ForeignKey(() => Mesas)
  @Column(DataType.INTEGER)
  declare mesaId: number;

  @Column(DataType.DATE)
  declare fecha: Date;

  @Column(DataType.TIME)
  declare hora: string;

  @Column(DataType.INTEGER)
  declare personas: number;

  @BelongsTo(() => Usuarios)
  declare cliente: Usuarios;

  @BelongsTo(() => Mesas)
  declare mesa: Mesas;
}
