import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DB_NAME || "pastebin",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "12345",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);
export default sequelize;
