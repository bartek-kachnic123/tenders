'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Offer.belongsTo(models.Tender, {
        foreignKey: 'tenderId',
        as: 'tender',
      });
    }
  }
  Offer.init({
    price: DataTypes.DECIMAL,
    submittedBy: DataTypes.STRING,
    tenderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};