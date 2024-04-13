'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
				foreignKey: 'userID',
        as : "User"
			})
    }
  }
  Order.init({
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    pricePerUnit: DataTypes.INTEGER,
    userID : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};