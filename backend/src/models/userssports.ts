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
import User from "./user";

interface usersSportAttributes {
  id: number;
  userId: number;
  sportId: number;
}
interface usersSportCreationAttributes extends Optional<usersSportAttributes, "id"> { }

@Table
class userSport extends Model<usersSportAttributes, usersSportCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
    userId: number;

  @ForeignKey(() => Sport)
  @AllowNull(false)
  @Column
    sportId: number;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;
}

export default userSport;
