const db = require("../models");
const Offre = db.offres;
const Emploi = db.emplois;

exports.createOffre = async (req, res) => {
  try {
    // Récupérer l'identifiant de l'emploi soumis dans le formulaire
    const emploiId = req.body.emploiId;

    // Récupérer le jobName associé à cet emploi à partir de la table "emplois"
    const emploi = await Emploi.findByPk(emploiId);
    const jobName =  emploi.jobName ;

    const { email, first_name, last_name, phone, ville, message } = req.body;
    if (!email || !first_name || !last_name || !phone || !ville || !message || !req.file) {
      return res.status(400).send({
        message: "Tous les champs du formulaire sont obligatoires.",
      });
    }

    // Créer une nouvelle offre avec les données du formulaire
    const nouvelleOffre = {
      email,
      first_name,
      last_name,
      phone,
      ville,
      message,
      cv: req.file.path,
      jobName,
    };

    // Enregistrer l'offre dans la base de données
    const offreCree = await Offre.create(nouvelleOffre);

    // Répondre avec l'offre créée
    res.status(201).send(offreCree);
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    res.status(500).send({
      message: "Une erreur s'est produite lors de la création de l'offre.",
    });
  }
};

