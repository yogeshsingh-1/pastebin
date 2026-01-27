import sequelize from "../config/database";
import initPaste from "./pastes";

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

db.Paste = initPaste(sequelize);


export default db;
