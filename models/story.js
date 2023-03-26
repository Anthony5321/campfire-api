'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Story extends Model {
      static associate(models) {
        Story.belongsTo(models.User, { as: 'users', foreignKey: 'userId' });
        Story.hasMany(models.Vote, {
          foreignKey: 'storyId',
          as: 'votes'
        });
      }
    }
    Story.init({
      authorId: {
      type: DataTypes.STRING,
      allowNull: false
    },
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