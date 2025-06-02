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
import { Pedidos } from "./Pedidos";
import { Platos } from "./Platos";

@Table({
  tableName: "pedido_platos",
  timestamps: false,
})
export class PedidoPlato extends Model<PedidoPlato> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Pedidos)
  @Column(DataType.INTEGER)
  pedidoId!: number;

  @ForeignKey(() => Platos)
  @Column(DataType.INTEGER)
  platoId!: number;

  @Column(DataType.INTEGER)
  cantidad!: number;

  @Column(DataType.DECIMAL(10, 2))
  precioUnitario!: number;

  @Column(DataType.TEXT)
  observaciones?: string;

  @BelongsTo(() => Pedidos)
  pedido!: Pedidos;

  @BelongsTo(() => Platos)
  plato!: Platos;
}
