import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Categoria } from "./Categoria";
import { PedidoPlato } from "./PedidoPlato";
import { PlatoCategoria } from "./PlatoCategorias";

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

  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @Column(DataType.BOOLEAN)
  declare disponible: boolean;

  @Column(DataType.TEXT)
  declare descripcion?: string;

  @Column({ type: DataType.STRING, field: "imagen_url" })
  declare imagenUrl?: string;

  @BelongsToMany(() => Categoria, () => PlatoCategoria)
  categorias: Categoria[];

  @HasMany(() => PedidoPlato)
  declare pedidoPlatos: PedidoPlato[];
}
