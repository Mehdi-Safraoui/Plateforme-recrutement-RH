const db = require("../models") ;
const Emploi = db.emploi;

exports.createEmploi = (req, res) => {
  // Save Emploi to Database
  Emploi.create({
    jobName: req.body.jobName,
    jobDescription: req.body.jobDescription
  })
    .then(emploi => {
      res.status(201).send({ message: "L'emploi a été créé avec succès.", emploi });
    })
    .catch(err => {
      res.status(500).send({ message: "Une erreur s'est produite lors de la création de l'emploi.", error: err.message });
    });
};
