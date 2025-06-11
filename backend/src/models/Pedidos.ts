import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Usuarios } from "./Usuarios";
import { Mesas } from "./Mesas";
import { PedidoPlato } from "./PedidoPlato";

@Table({
  tableName: "pedidos",
  timestamps: false,
})
export class Pedidos extends Model<Pedidos> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Usuarios)
  @Column(DataType.INTEGER)
  declare clienteId: number;

  @ForeignKey(() => Mesas)
  @Column(DataType.INTEGER)
  declare mesaId?: number;

  @Column(DataType.DATE)
  declare fecha: Date;

  @Column(DataType.DECIMAL(10, 2))
  declare total: number;

  @BelongsTo(() => Usuarios)
  declare cliente: Usuarios;

  @BelongsTo(() => Mesas)
  declare mesa: Mesas;

  @HasMany(() => PedidoPlato)
  declare pedidoPlatos: PedidoPlato[];
}
