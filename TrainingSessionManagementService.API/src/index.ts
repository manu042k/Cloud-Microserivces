import express from "express";
import { sequelize } from "./config/database";
import bodyParser from "body-parser";
import sessionRoutes from "./routes/sessionRoutes";
import { TrainingSession } from "./entities/trainingSession";

const app = express();

sequelize
  .sync({ force: false }) // Use `force: true` only in development to reset the database
  .then((): void => console.log("TrainingSessionManagement Database synced"))
  .catch((err: Error): void =>
    console.error("Error syncing TrainingSessionManagement database:", err)
  );

app.use(bodyParser.json());
app.get("/health", (req, res) => {
  res.status(200).send("TrainingSessionManagement Service is running");
});

app.use("", sessionRoutes);

app.listen(3001, () => {
  console.log("TrainingSessionManagement Service running on port 3001");
});
