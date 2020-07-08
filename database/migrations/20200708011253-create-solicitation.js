'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      message: {
        type: Sequelize.STRING,
      },
      locatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locator',
          key: 'id',
        },
      },
      tenantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tenant',
          key: 'id',
        },
      },
      realEstateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'realEstate',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
