module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define('Candidate', {
      fullName: {
        type:DataTypes.STRING,
      },
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
        values: ['admin', 'candidate']
      },
      cellPhone: {
        type: DataTypes.STRING,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['M', 'F', 'O'],
        // allowNull: false
      },
      linkedin: DataTypes.STRING,
      repositoryHub: DataTypes.STRING,
      description: DataTypes.STRING,
      phase: DataTypes.STRING,
    }, {
      freezeTableName: true,
    });

    Candidate.associate = (models) => {
      Candidate.hasMany(models.Reply);
    };
  
    return Candidate;
  }