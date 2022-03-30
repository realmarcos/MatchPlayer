import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Unique
} from 'sequelize-typescript'

@Table({
  timestamps: true,
})
class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Unique
  @Column
  username: string

  @AllowNull(false)
  @Unique
  @Column
  email: string

  @Unique
  @Column
  phone: string

  @Column
  picture: Blob

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default User;