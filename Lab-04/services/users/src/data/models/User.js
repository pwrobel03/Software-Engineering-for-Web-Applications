import { Model, DataTypes } from "sequelize";

// WAŻNE: Musisz tu zaimportować swoją instancję połączenia z bazą!
import { sequelize } from "../repository/database.js";

export default class User extends Model {
    // Metoda pomocnicza, żeby nie zwracać hasła przy toJSON()
    toJSON() {
        const values = { ...this.get() };
        delete values.password; // Usuwamy hasło z wyników API
        return values;
    }
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // created_at i updated_at są obsługiwane automatycznie przez konfigurację poniżej
    },
    {
        sequelize, // Tu przekazujemy instancję połączenia (importowaną wyżej)
        tableName: "users",
        modelName: "User",
        timestamps: true, // Włącza obsługę created_at / updated_at
        createdAt: "created_at", // Mapujemy domyślne createdAt na Twoją nazwę kolumny
        updatedAt: "updated_at", // Mapujemy domyślne updatedAt na Twoją nazwę kolumny
    }
);
