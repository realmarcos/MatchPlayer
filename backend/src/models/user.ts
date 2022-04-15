import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Unique,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface userAttributes {
  id: number;
  name: string,
  username?: string,
  email: string,
  phone: string,
  password: string,
  picture?: string,
  createdAt?: Date;
  updatedAt?: Date;
}
interface userCreationAttributes extends Optional<userAttributes, "id"> {}

@Table
class User extends Model<userAttributes, userCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  // @AllowNull(false)
  @Column
    name: string;

  // @AllowNull(false)
  @Unique
  @Column
    username: string;

  // @AllowNull(false)
  @Unique
  @Column
    email: string;

  @Unique
  @Column
    phone: string;

  // @AllowNull(false)
  @Column
    password: string;

  @Column
    picture: string;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;
}

export default User;
