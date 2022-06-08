import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./user";
import userSport from "./userssports";
import Local from "./local";
import localSport from "./localsports";

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

  @BelongsToMany(() => User, () => userSport)
    users: Array<User & { userSport: userSport }>;

  // @BelongsToMany(() => Local, () => localSport)
  //   locals: Array<Local & { localSport: localSport }>;
}

export default Sport;
