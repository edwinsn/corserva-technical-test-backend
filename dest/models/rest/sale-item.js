"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
    static associate(models) {
        OrderItem.belongsTo(models.saleOrder);
    }
}
exports.default = (sequelize) => {
    OrderItem.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'orderItem',
        timestamps: true,
    });
    return OrderItem;
};
