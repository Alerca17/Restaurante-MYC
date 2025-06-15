import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";
import { Platos } from "./Platos";
import { PlatoCategoria } from "./PlatoCategorias";

@Table({ tableName: "categorias", timestamps: false })
export class Categoria extends Model<Categoria> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare nombre: string;

  @BelongsToMany(() => Platos, () => PlatoCategoria)
  platos: Platos[];
}
