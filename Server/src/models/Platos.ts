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
  declare nombre: string;

  @ForeignKey(() => Categorias)
  @Column(DataType.INTEGER)
  declare categoriaId: number;

  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @Column(DataType.BOOLEAN)
  declare disponible: boolean;

  @Column(DataType.TEXT)
  declare descripcion?: string;

  @Column({ type: DataType.STRING, field: "imagen_url" })
  declare imagenUrl?: string;

  @BelongsTo(() => Categorias)
  declare categoria: Categorias;

  @HasMany(() => PedidoPlato)
  declare pedidoPlatos: PedidoPlato[];
}
