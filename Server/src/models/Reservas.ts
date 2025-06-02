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
import { Usuarios } from "./usuarios";
import { Mesas } from "./Mesa";

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
  clienteId!: number;

  @ForeignKey(() => Mesas)
  @Column(DataType.INTEGER)
  mesaId!: number;

  @Column(DataType.DATE)
  fecha!: Date;

  @Column(DataType.TIME)
  hora!: string;

  @Column(DataType.INTEGER)
  personas!: number;

  @BelongsTo(() => Usuarios)
  cliente!: Usuarios;

  @BelongsTo(() => Mesas)
  mesa!: Mesas;
}
