'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Snippit extends Model {
      static associate(models) {
      }
    }
    Snippit.init({
      storyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },
      snippitId: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Snippit',
      tableName: 'snippits'
    });
    return Snippit;
  };