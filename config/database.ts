import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
//   logging: false
// });
const databaseOption: Record<string, string> = {
  databaseName: process.env.DATABASE_NAME ?? "demo",
  databaseUsername: process.env.DATABASE_USERNAME ?? "postgres",
  databasePassword: process.env.DATABASE_PASSWORD ?? "MyGSTCafe@9088",
  databseHost: process.env.DATABASE_HOST ?? "localhost",
};
// console.log(
//   databaseOption.databaseName,
//   databaseOption.databaseUsername,
//   databaseOption.databasePassword,
//   databaseOption.databseHost
// );

const sequelize = new Sequelize(
  databaseOption.databaseName,
  databaseOption.databaseUsername,
  databaseOption.databasePassword,
  {
    dialect: "postgres",
    host: databaseOption.databseHost,
  },
);

export default sequelize;

// docker run -d --name seq -p 8001:8001 -e DATABASE_NAME=demo -e DATABASE_USERNAME=postgres -e DATABASE_PASSWORD=MyGSTCafe@9088 -e DATABASE_HOST=localhost seq:latest

// docker run -d --name seq -p 8001:8001 --network spq --env-file .env seq:latest

// docker run -d --name postgresDB -p 5432:5432 --network spq -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=demo postgres:latest
