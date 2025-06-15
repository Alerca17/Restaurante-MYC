import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Platos } from "./Platos";
import { Categoria } from "./Categoria";

@Table({ tableName: "plato_categorias", timestamps: false })
export class PlatoCategoria extends Model<PlatoCategoria> {
  @ForeignKey(() => Platos)
  @Column(DataType.INTEGER)
  declare platoId: number;

  @ForeignKey(() => Categoria)
  @Column(DataType.INTEGER)
  declare categoriaId: number;
}
