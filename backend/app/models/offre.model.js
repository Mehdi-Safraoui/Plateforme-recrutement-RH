module.exports = (sequelize, Sequelize) => {
const Offre = sequelize.define("offres", {

 
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
  jobName : {
    type: Sequelize.STRING,
          allowNull: true
  },
 
});

return  Offre;
};