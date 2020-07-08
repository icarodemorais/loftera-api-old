module.exports = (sequelize, DataTypes) => {
    const Solicitation = sequelize.define('solicitation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        message: DataTypes.STRING,
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

    Solicitation.associate = (models) => {
        Solicitation.belongsTo(models.locator, {
            foreignKey: "locatorId"
        });

        Solicitation.belongsTo(models.tenant, {
            foreignKey: "tenantId"
        });

        Solicitation.belongsTo(models.realEstate, {
            foreignKey: "realEstateId"
        });

    };

    return Solicitation;
}