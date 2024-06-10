module.exports = (sequelize, Sequelize) => {
  const Entretien = sequelize.define("entretiens", {
    candidateId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    jobName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    acceptDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    interviewDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
  });

  return Entretien;
};
