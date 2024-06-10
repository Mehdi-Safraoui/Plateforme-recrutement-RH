module.exports = (sequelize, Sequelize) => {
    const Emploi = sequelize.define("emplois", {

      jobName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      motsclés: {
        type: Sequelize.STRING,
        allowNull: true
      } 
      });
      Emploi.associate = models => {
        Emploi.hasMany(models.Offre, {
          foreignKey: 'idemploi',
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
      };
    
      return Emploi;
    };


  