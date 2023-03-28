'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Snippet extends Model {
    static associate(models) {
      Snippet.belongsToMany(models.Snippet, {
        as: 'children',
        through: 'jointable',
        foreignKey: 'parentSnippetId',
        otherKey: 'childSnippetId'
      });
      Snippet.belongsToMany(models.Snippet, {
        as: 'parents',
        through: 'jointable',
        foreignKey: 'childSnippetId',
        otherKey: 'parentSnippetId'
      });
      Snippet.belongsTo(models.Story, {
        foreignKey: 'storyId',
        as: 'story'
      });
      // Snippet.belongsTo(Snippet, {
      //   as: 'parent',
      //   foreignKey: 'snippetId'
      // });
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
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    snippetId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Snippet',
    tableName: 'snippets'
  });
  
  return Snippet;
};