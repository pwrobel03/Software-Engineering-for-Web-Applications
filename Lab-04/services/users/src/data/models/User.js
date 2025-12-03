import { Model, DataTypes } from "sequelize";

// WAŻNE: Musisz tu zaimportować swoją instancję połączenia z bazą!
import { sequelize } from "../repository/database.js";

export default class User extends Model {
    toJSON() {
        // this.get() zwraca surowe dane
        const values = { ...this.get() };

        // Usuwamy pola, których nie chcemy zwracać
        delete values.created_at;
        delete values.updated_at;

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
        name: {
            type: DataTypes.STRING,
            allowNull: false, // Domyślnie w TS było wymagane
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
