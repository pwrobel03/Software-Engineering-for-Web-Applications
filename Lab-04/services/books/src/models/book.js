// services/books/src/models/Book.js
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../repository/database.js"; // Ścieżka do bazy

export default class Book extends Model {}

Book.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Book",
        tableName: "books", // Jawna nazwa tabeli
    }
);
