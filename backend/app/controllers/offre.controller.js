const db = require("../models");
const Offre = db.offres;
const Emploi = db.emplois;
const User = db.users;
const { calculateCvScore } = require('../controllers/cv.controller');

// Mettre à jour l'offre avec le score calculé

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Offre.findAll();
    res.status(200).send(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).send({
      message: "An error occurred while fetching candidates.",
    });
  }
};

exports.createOffre = async (req, res) => {
  try {
    // Récupérer l'identifiant de l'emploi soumis dans le formulaire
    const emploiId = req.body.emploiId;
    const userId = req.body.iduser;

    // Récupérer le jobName associé à cet emploi à partir de la table "emplois"
    const emploi = await Emploi.findByPk(emploiId);
    const jobName = emploi.jobName;
    const user = await User.findByPk(userId);

    const { email, first_name, last_name, phone, ville, message, etat  } = req.body;
    if (!email || !first_name || !last_name || !phone || !ville || !message || !req.file  || !etat ) {
      return res.status(400).send({
        message: "Tous les champs du formulaire sont obligatoires.",
      });
    }

    // Créer une nouvelle offre avec les données du formulaire
    const nouvelleOffre = {
      iduser: user.id ,
      idemploi: emploi.id,
      email,
      first_name,
      last_name,
      phone,
      ville,
      message,
      cv: req.file.path,
      score : 0,
      jobName,
      etat,
    
    };

    // Enregistrer l'offre dans la base de données
    const offreCree = await Offre.create(nouvelleOffre);

    // Appeler la fonction de calcul de score et attendre le score
    const { cvScore } = await calculateCvScore(req); // Retirer res de l'appel

    // Mettre à jour l'offre avec le score calculé
    offreCree.score = cvScore; // Utiliser cvScore du retour de calculateCvScore
    await offreCree.save();


    // Répondre avec l'offre créée
    res.status(201).send(offreCree);
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    res.status(500).send({
      message: "Une erreur s'est produite lors de la création de l'offre.",
    });
  }
};

exports.acceptCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Offre.findByPk(candidateId);

    if (!candidate) {
      return res.status(404).send({ message: 'Candidate not found' });
    }

    candidate.etat = 'Accepted';
    await candidate.save();
    
    res.send({ message: 'Candidate accepted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error accepting candidate', error });
  }
};

exports.rejectCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Offre.findByPk(candidateId);

    if (!candidate) {
      return res.status(404).send({ message: 'Candidate not found' });
    }

    candidate.etat = 'Rejected';
    await candidate.save();

    res.send({ message: 'Candidate rejected successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error rejecting candidate', error });
  }
};