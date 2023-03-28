'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('joinTable', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parentSnippetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'snippets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      childSnippetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'snippets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('joinTable');
  }
};