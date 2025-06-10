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
  declare pedidoId: number;

  @ForeignKey(() => Platos)
  @Column(DataType.INTEGER)
  declare platoId: number;

  @Column(DataType.INTEGER)
  declare cantidad: number;

  @Column(DataType.DECIMAL(10, 2))
  declare precioUnitario: number;

  @Column(DataType.TEXT)
  declare observaciones?: string;

  @BelongsTo(() => Pedidos)
  declare pedido: Pedidos;

  @BelongsTo(() => Platos)
  declare plato: Platos;
}
