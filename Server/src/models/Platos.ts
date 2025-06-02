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
import { Categorias } from "./Categoria";
import { PedidoPlato } from "./PedidoPlato";

@Table({
  tableName: "platos",
  timestamps: false,
})
export class Platos extends Model<Platos> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  nombre!: string;

  @ForeignKey(() => Categorias)
  @Column(DataType.INTEGER)
  categoriaId!: number;

  @Column(DataType.DECIMAL(10, 2))
  precio!: number;

  @Column(DataType.BOOLEAN)
  disponible!: boolean;

  @Column(DataType.TEXT)
  descripcion?: string;

  @Column(DataType.STRING)
  imagenUrl?: string;

  @BelongsTo(() => Categorias)
  categoria!: Categorias;

  @HasMany(() => PedidoPlato)
  pedidoPlatos!: PedidoPlato[];
}
