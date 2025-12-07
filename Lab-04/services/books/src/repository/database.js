import { Sequelize } from "sequelize";
import config from "../config.js";

// WAŻNE: Musi być "export const", a NIE "export default"
export const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: "mysql",
        logging: false,
    }
);
