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

// app.post("/api/training-sessions/create", (req, res) => {
//   try {
//     console.log("req", req.body);
//     TrainingSession.create(req.body);

//     res.status(201).json(req.body);
//   } catch (error) {
//     res.status(500).json({ error: (error as any).message });
//   }
// });
app.use("/api/training-sessions", sessionRoutes);

app.listen(3001, () => {
  console.log("TrainingSessionManagement Service running on port 3001");
});
