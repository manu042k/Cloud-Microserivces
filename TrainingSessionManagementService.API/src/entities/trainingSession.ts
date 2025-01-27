import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class TrainingSession extends Model {
  public TrainingSessionId!: string;
  public TrainerId!: string;
  public TraineeId!: string;
  public SessionDate!: Date;
  public SessionTime!: string;
  public CreatedAt!: Date;
  public SessionOutcome!: string;
}

TrainingSession.init(
  {
    TrainingSessionId: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
    },
    TrainerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    TraineeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    SessionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    SessionTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    SessionOutcome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TrainingSession",
    tableName: "TrainingSessions",
  }
);
