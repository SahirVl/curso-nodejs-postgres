const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
  codigo: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    defaultValue: function refe() {
      let num1 = parseInt(Math.random() * 999);
      let num2 = parseInt(Math.random() * 9999);
      let num3 = parseInt(Math.random() * 9999);
      return  `or${num1}-${num2}-${num3}`;
    },
  },
	customerId: {
		field: 'customer_id',
		allowNull: true,
		type: DataTypes.INTEGER,
		References: {
			model: 'customers',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        },0)
      }
      return 0
    }
  },
};

class Order extends Model {
	static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'

    });
  }

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
