module.exports = (sequelize, DataTypes) => {
    const RealEstate = sequelize.define('realEstate', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      cep: DataTypes.STRING,
      address: DataTypes.STRING,
      number: DataTypes.STRING,
      complement: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      rent: DataTypes.STRING,
      condoFee: DataTypes.STRING,
      iptu: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }, {
      freezeTableName: true,
    });
  
    RealEstate.associate = (models) => {
        RealEstate.belongsTo(models.locator, {
          foreignKey: "locatorId"
        });

        RealEstate.hasMany(models.image);

        RealEstate.hasMany(models.solicitation);
      };
  
    return RealEstate;
  }