import db from "./models/index";

try {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(() => {});
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

try {
  db.sequelize.sync({ alter: true }).then(() => {});
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db.sequelize;
