import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
} from "sequelize-typescript";
import { Reservas } from "./Reservas";
import { Pedidos } from "./Pedidos";

@Table({
  tableName: "mesas",
  timestamps: false,
})
export class Mesas extends Model<Mesas> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @Column(DataType.INTEGER)
  numero!: number;

  @Column(DataType.INTEGER)
  capacidad!: number;

  @HasMany(() => Reservas)
  reservas!: Reservas[];

  @HasMany(() => Pedidos)
  pedidos!: Pedidos[];
}
