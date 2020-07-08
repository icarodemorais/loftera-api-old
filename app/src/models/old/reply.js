module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
  },{
    freezeTableName: true,
  });

  Reply.associate = (models) => {
    Reply.belongsTo(models.Candidate, {
      foreignKey:"candidateId"
    });
  };

  return Reply;
}