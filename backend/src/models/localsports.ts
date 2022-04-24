import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Sport from "./sport";
import Local from "./local";

interface localSportAttributes {
  id: number;
  localId: number;
  sportId: number;
}
interface localSportCreationAttributes extends Optional<localSportAttributes, "id"> { }

@Table
class localSport extends Model<localSportAttributes, localSportCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @ForeignKey(() => Local)
  @AllowNull(false)
  @Column
    localId: number;

  @ForeignKey(() => Sport)
  @AllowNull(false)
  @Column
    sportId: number;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;
}

export default localSport;
