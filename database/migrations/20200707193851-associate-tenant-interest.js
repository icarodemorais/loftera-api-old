'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'tenant_interest',
      {
        tenantId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        interestId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tenant_interest');
  }
};
