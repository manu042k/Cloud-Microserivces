import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public UserId!: string;
  public Username!: string;
  public Email!: string;
  public PasswordHash!: string;
  public UserType!: "Trainer" | "Trainee";
  public CreatedAt!: Date;
  public LastLoginAt!: Date;
}

User.init(
  {
    UserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserType: {
      type: DataTypes.ENUM("Trainer", "Trainee"),
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    LastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);
