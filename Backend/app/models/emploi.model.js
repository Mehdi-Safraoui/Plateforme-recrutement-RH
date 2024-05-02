module.exports = (sequelize, Sequelize) => {
    const Emploi = sequelize.define("emplois", {

      jobName: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.STRING
      }
     
      });
    
      return Emploi;
    };


  