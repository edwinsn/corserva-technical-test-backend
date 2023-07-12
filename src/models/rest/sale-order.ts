import { DataTypes, Model, Sequelize } from 'sequelize';

interface SaleOrderAttributes {
  id: number;
  customer: string;
  deliveryAddress: string;
  paymentMethod: string;
}

interface SaleOrderCreationAttributes {
  customer?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}

class SaleOrder extends Model<SaleOrderAttributes, SaleOrderCreationAttributes>
  implements SaleOrderAttributes {
  public id!: number;
  public customer!: string;
  public deliveryAddress!: string;
  public paymentMethod!: string;

  public static associate(models: any) {
    SaleOrder.hasMany(models.orderItem, { as: 'items' });
  }
}

export default (sequelize: Sequelize) => {
  SaleOrder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer: {
        type: DataTypes.STRING,
        defaultValue: 'Anonimus ;)',
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        defaultValue: 'sold in store',
      },
      paymentMethod: {
        type: DataTypes.STRING,
        defaultValue: 'cash',
      },
    },
    {
      sequelize,
      modelName: 'saleOrder',
      timestamps: true,
    }
  );

  return SaleOrder;
};
