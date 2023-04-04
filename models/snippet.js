'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Snippet extends Model {
    static associate(models) {
      Snippet.belongsToMany(models.Snippet, {
        as: 'children',
        through: 'joinTable',
        foreignKey: 'parentSnippetId',
      });

      Snippet.belongsToMany(models.Snippet, {
        as: 'parents',
        through: 'joinTable',
        foreignKey: 'childSnippetId',
      });

      Snippet.belongsTo(models.Story, {
        foreignKey: 'storyId',
        as: 'story'
      });
    }
  }

  Snippet.init({
    storyId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    header: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Snippet',
    tableName: 'snippets'
  });

  return Snippet;
};