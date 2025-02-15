import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { sequelize } from "./config/database";

const app = express();

sequelize
  .sync({ force: false }) // Use `force: true` only in development to reset the database
  .then((): void => console.log("Database synced"))
  .catch((err: Error): void => console.error("Error syncing database:", err));

app.use(bodyParser.json());
app.use("", userRoutes);

app.listen(3000, () => {
  console.log("User Management Service running on port 3000");
});
