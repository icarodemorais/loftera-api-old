module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: DataTypes.STRING,
      url: DataTypes.STRING,
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

    Image.associate = (models) => {
        Image.belongsTo(models.realEstate, {
          foreignKey:"realEstateId"
        });
      };
  
    return Image;
  }