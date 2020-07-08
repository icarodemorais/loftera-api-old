'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('realEstate', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      locatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locator',
          key: 'id',
        },
      },
      cep: Sequelize.STRING,
      address: Sequelize.STRING,
      number: Sequelize.STRING,
      complement: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      neighborhood: Sequelize.STRING,
      rent: Sequelize.STRING,
      condoFee: Sequelize.STRING,
      iptu: Sequelize.STRING,
      thumbnail: Sequelize.STRING,
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
    return queryInterface.dropTable('realEstate');
  }
};
