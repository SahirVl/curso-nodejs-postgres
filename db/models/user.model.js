const { Model, DataTypes } = require('sequelize')

const USER_TABLE = 'users'
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at", // el verdadero nombre como quiero que se cree
    defaultValue: DataTypes.NOW,
  },
}

class User extends Model {
  static associate(){
    // associate
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

//Creamos la tabla
User.sync();

module.exports =  {USER_TABLE, UserSchema, User}
