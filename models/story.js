'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Story extends Model {
      static associate(models) {
        Story.belongsTo(models.User, { as: 'users', foreignKey: 'authorId' });
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
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      netLikes: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Story',
      tableName: 'stories'
    });
    return Story;
  };