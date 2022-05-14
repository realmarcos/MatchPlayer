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
  DeletedAt,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./user";
import Sport from "./sport";
import Local from "./local";
import Guest from "./guest";

interface partidaAttributes {
  id: number;
  name?: string;
  status?: string;
  note?: string;
  userIdCreated?: string;
  localId?: string;
  sportId?: string;
  day?: Date;
  startHour?: string;
  endHour?: string;
  limitUsers?: number;
  countUsers?: number;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface partidaCreationAttributes extends Optional<partidaAttributes, "id"> { }

@Table
// Nome trocado para o português por algum problema com a bilioteca sequelize
class Partida extends Model<partidaAttributes, partidaCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @AllowNull(false)
  @Column
    name: string;

  @AllowNull(false)
  @Column
    status: string;

  @Column
    note: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
    userIdCreated: string;

  @ForeignKey(() => Local)
  @AllowNull(false)
  @Column
    localId: string;

  @ForeignKey(() => Sport)
  @AllowNull(false)
  @Column
    sportId: string;

  @AllowNull(false)
  @Column
    day: Date;

  @AllowNull(false)
  @Column
    startHour: string;

  @AllowNull(false)
  @Column
    endHour: string;

  @AllowNull(false)
  @Column
    limitUsers: number;

  @AllowNull(false)
  @Column
    countUsers: number;

  @AllowNull(false)
  @Column
    isPublic: boolean;

  @BelongsTo(() => User)
    user: User;

  @BelongsTo(() => Local)
    local: Local;

  @BelongsTo(() => Sport)
    sport: Sport;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;

  @DeletedAt
    deletedAt: "destroyTime";

  @BelongsToMany(() => User, () => Guest)
    guestsData: User[];
}

export default Partida;
