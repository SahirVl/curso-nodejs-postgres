const { Model, DataTypes } = require('sequelize')
const {USER_TABLE} = require('./user.model')

const CUSTOMER_TABLE = 'customers'
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: DataTypes.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Customer extends Model {
  static associate(models){
    this.belongsTo(models.User, {as: 'user'})
    this.hasMany(models.Order, {as: 'orders', foreignKey: 'customerId'})
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

//Creamos la tabla
// Customer.sync();

module.exports =  { CUSTOMER_TABLE, CustomerSchema, Customer }
