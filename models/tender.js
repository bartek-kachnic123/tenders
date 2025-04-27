'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tender.hasMany(models.Offer, {
        foreignKey: 'tenderId',
        as: 'offers',
      });
    }
  }
  Tender.init({
    title: DataTypes.STRING,
    offerStartDate: DataTypes.DATE,
    offerEndDate: DataTypes.DATE,
    institutionName: DataTypes.STRING,
    description: DataTypes.STRING,
    maxPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Tender',
  });
  return Tender;
};