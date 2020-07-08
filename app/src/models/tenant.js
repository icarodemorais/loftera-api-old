module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('tenant', {
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
  }, {
    freezeTableName: true,
  });

  Tenant.associate = (models) => {
    Tenant.belongsTo(models.user, {
      foreignKey: "userId"
    });

    Tenant.belongsToMany(models.interest, {
      through: "tenant_interest"
    });

    Tenant.hasMany(models.solicitation);

  };

  return Tenant;
}