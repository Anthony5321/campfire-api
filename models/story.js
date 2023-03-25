'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Story extends Model {
      static associate(models) {
        Story.belongsTo(models.User, {
          foreignKey: 'authorId',
          as: 'author'
        });
        Story.hasMany(models.Vote, {
          foreignKey: 'storyId',
          as: 'votes'
        });
      }
    }
    Story.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Story',
      tableName: 'stories'
    });
    return Story;
  };