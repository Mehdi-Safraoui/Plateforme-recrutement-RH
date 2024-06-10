module.exports = (sequelize, Sequelize) => {
const Offre = sequelize.define("offres", {
iduser: {
  type: Sequelize.INTEGER,
  allowNull: false
},
idemploi: {
  type: Sequelize.INTEGER,
  allowNull: false
},
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  ville: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING
  },
  cv: {
    type: Sequelize.STRING,
    allowNull: false
  },
 score: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: "0"
  },
  jobName : {
    type: Sequelize.STRING,
          allowNull: true
  },
etat: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Non traité' // Default value set here
  }
 
});
Offre.associate = models => {
  Offre.belongsTo(models.User, {
    foreignKey: 'iduser',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  });
  Offre.belongsTo(models.Emploi, {
    foreignKey: 'idemploi',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  });
};

return  Offre;
};