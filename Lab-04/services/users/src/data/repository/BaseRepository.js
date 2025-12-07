import { sequelize } from "./database.js";

export default class BaseRepository {
    constructor() {
        // console.log("DEBUG BaseRepository: Co zaimportowałem?", sequelize); // <-- To nam powie prawdę

        if (!sequelize) {
            throw new Error(
                "KRYTYCZNY BŁĄD: Zaimportowany obiekt 'sequelize' jest undefined! Sprawdź exports w database.js"
            );
        }

        this.sequelizeClient = sequelize;
        this.defaultLimit = 100;
    }
}
