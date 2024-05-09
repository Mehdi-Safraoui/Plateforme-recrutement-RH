const db = require("../models");
const Emploi = db.emplois;

exports.createEmploi = (req, res) => {
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

exports.getEmplois = (req, res) => {
  Emploi.findAll()
    .then(emplois => {
      res.status(200).send(emplois);
    })
    .catch(err => {
      res.status(500).send({ message: "Une erreur s'est produite lors de la récupération des emplois.", error: err.message });
    });
};
exports.getEmploiById = (req, res) => {
  const emploiId = req.params.id;

  Emploi.findByPk(emploiId)
    .then(emploi => {
      if (!emploi) {
        return res.status(404).send({ message: `Aucun emploi trouvé avec l'ID ${emploiId}.` });
      }
      res.status(200).send(emploi);
    })
    .catch(err => {
      res.status(500).send({ message: "Une erreur s'est produite lors de la récupération des détails de l'emploi.", error: err.message });
    });
};
