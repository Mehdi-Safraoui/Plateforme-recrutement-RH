module.exports = (sequelize, Sequelize) => {
    const Emploi = sequelize.define("emploi", {

      jobName: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.STRING
      }
     
      });
    
      return Emploi;
    };


  