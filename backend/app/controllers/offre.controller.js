// offre.controller.js

const db = require("../models");
const Offre = db.offres;

exports.createOffre = async (req, res) => {
  try {
    // Vérifier si toutes les données du formulaire sont présentes
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
      cv: req.file.path, // Chemin vers le fichier CV
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
