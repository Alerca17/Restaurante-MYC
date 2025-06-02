import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Platos } from "./Platos";

@Table({
  tableName: "categorias",
  timestamps: false,
})
export class Categorias extends Model<Categorias> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  nombre!: string;

  @HasMany(() => Platos)
  platos!: Platos[];
}
