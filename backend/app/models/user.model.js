module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING
    }
  });
  User.associate = models => {
    User.hasMany(models.Offre, {
      foreignKey: 'iduser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return User;
};