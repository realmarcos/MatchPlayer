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
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./user";
import Partida from "./match";

interface guestAttributes {
  id: number;
  userId: number;
  matchId: number;
}
interface guestCreationAttributes extends Optional<guestAttributes, "id"> { }

@Table
class Guest extends Model<guestAttributes, guestCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
    userId: number;

  // @BelongsTo(() => User)
  //   user: User;

  @ForeignKey(() => Partida)
  @AllowNull(false)
  @Column
    matchId: number;

  // @BelongsTo(() => Partida)
  //   match: Partida;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;
}

export default Guest;
