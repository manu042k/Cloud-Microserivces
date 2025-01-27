import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "trainingsessionservice",
  port: parseInt(process.env.DB_PORT || "5432"),
  logging: false,
});

export { sequelize };
