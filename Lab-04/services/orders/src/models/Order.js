// services/orders/src/models/Order.js
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../repository/database.js";

export default class Order extends Model {}

Order.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1, // Nie można zamówić mniej niż 1 sztuki
            },
        },
    },
    {
        sequelize,
        modelName: "Order",
        tableName: "orders",
    }
);
