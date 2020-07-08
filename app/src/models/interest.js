module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('interest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        icon: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        deleted: DataTypes.BOOLEAN,
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

    Interest.associate = (models) => {
        Interest.belongsToMany(models.tenant, {
            through: "tenant_interest"
        });
    };



    return Interest;
}