import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface sportAttributes {
  id: number;
  name: string,
}
interface sportCreationAttributes extends Optional<sportAttributes, "id"> { }

@Table
class Sport extends Model<sportAttributes, sportCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @AllowNull(false)
  @Column
    name: string;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;
}

export default Sport;
