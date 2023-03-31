'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('snippets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storyId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      header: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      snippetId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('snippets');
  }
};