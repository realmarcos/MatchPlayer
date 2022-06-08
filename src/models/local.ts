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
import localSport from "./localsports";

interface localAttributes {
  id: number;
  name: string;
  status?: number;
  description?: string;
  userIdCreated?: string;
  number?: string | number;
  street?: string;
  district?: string;
  city?: string;
  complement?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}
interface localCreationAttributes extends Optional<localAttributes, "id"> { }

@Table
class Local extends Model<localAttributes, localCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @AllowNull(false)
  @Column
    name: string;

  // @AllowNull(false)
  @Column
    status: number;
  // status de local validade ou não. armazena o número de validações

  @Column
    description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
    userIdCreated: string;

  @AllowNull(false)
  @Column
    street: string;

  @AllowNull(false)
  @Column
    number: string;

  @AllowNull(false)
  @Column
    district: string;

  // @AllowNull(false)
  @Column
    city: string;

  @AllowNull(false)
  @Column
    complement: string;

  @BelongsTo(() => User)
    user: User;

  @CreatedAt
    createdAt: Date;

  @UpdatedAt
    updatedAt: Date;

  @DeletedAt
    deletedAt: "destroyTime";

  @BelongsToMany(() => Sport, () => localSport)
    sports: Sport[];
}

export default Local;
