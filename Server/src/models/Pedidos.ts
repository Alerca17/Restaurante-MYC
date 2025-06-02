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
import { Usuarios } from "./usuarios";
import { Mesas } from "./Mesa";
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
  clienteId!: number;

  @ForeignKey(() => Mesas)
  @Column(DataType.INTEGER)
  mesaId?: number;

  @Column(DataType.DATE)
  fecha!: Date;

  @Column(DataType.DECIMAL(10, 2))
  total!: number;

  @BelongsTo(() => Usuarios)
  cliente!: Usuarios;

  @BelongsTo(() => Mesas)
  mesa!: Mesas;

  @HasMany(() => PedidoPlato)
  pedidoPlatos!: PedidoPlato[];
}
