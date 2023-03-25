'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vote extends Model {
      static associate(models) {
        Vote.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        Vote.belongsTo(models.Story, {
          foreignKey: 'storyId',
          as: 'story'
        });
      }
    }
    Vote.init({
      value: {
        type: DataTypes.ENUM('up', 'down'),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Vote',
      tableName: 'votes'
    });
    return Vote;
  };