module.exports = (sequelize, DataTypes) => {
    const Locator = sequelize.define('locator', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },{
      freezeTableName: true,
    });

    Locator.associate = (models) => {
        Locator.belongsTo(models.user, {
          foreignKey:"userId"
        });

        Locator.hasMany(models.realEstate);

        Locator.hasMany(models.solicitation);

      };
  
    return Locator;
  }