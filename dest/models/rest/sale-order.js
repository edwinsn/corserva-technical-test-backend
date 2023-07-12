"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class SaleOrder extends sequelize_1.Model {
    static associate(models) {
        SaleOrder.hasMany(models.orderItem, { as: 'items' });
    }
}
exports.default = (sequelize) => {
    SaleOrder.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: 'Anonimus ;)',
        },
        deliveryAddress: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: 'sold in store',
        },
        paymentMethod: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: 'cash',
        },
    }, {
        sequelize,
        modelName: 'saleOrder',
        timestamps: true,
    });
    return SaleOrder;
};
