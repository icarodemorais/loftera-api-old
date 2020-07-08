module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['locator', 'tenant']
    },
    cellPhone: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['M', 'F', 'O'],
    },
    description: DataTypes.STRING,
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

  User.associate = (models) => {
    User.hasOne(models.locator, {
      foreignKey: "userId"
    });
  };

  User.associate = (models) => {
    User.hasOne(models.tenant, {
      foreignKey: "userId"
    });
  };

  return User;
}