'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class joinTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  joinTable.init({
    snippetId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'snippets',
      key: 'id'
    }
    },
    storyId: { 
     type: DataTypes.INTEGER,
    references: {
      model: 'stories',
      key: 'id'
    }
  }
  }, {
    sequelize,
    modelName: 'joinTable',
    tableName: 'joinTables',
  });
  return joinTable;
};