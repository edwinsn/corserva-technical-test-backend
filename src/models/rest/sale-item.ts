import { DataTypes, Model, Sequelize } from 'sequelize';

export interface OrderItemAttributes {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

export interface OrderItemCreationAttributes {
  product: string;
  quantity: number;
  price: number;
}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  public id!: number;
  public product!: string;
  public quantity!: number;
  public price!: number;

  public static associate(models: any) {
    OrderItem.belongsTo(models.saleOrder);
  }
}

export default (sequelize: Sequelize) => {
  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'orderItem',
      timestamps: true,
    }
  );

  return OrderItem;
};