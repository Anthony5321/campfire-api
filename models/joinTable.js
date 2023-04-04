'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JoinTable extends Model {
    static associate(models) {
    }
  }

  JoinTable.init({
    parentSnippetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'snippets',
        key: 'id'
      }
    },
    childSnippetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'snippets',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'JoinTable',
    tableName: 'joinTable'
  });

  return JoinTable;
};