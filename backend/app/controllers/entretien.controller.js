const db = require("../models");
const Entretien = db.entretiens;
const Offre = db.offres;
const Emploi = db.emplois;
const sendEmail = require('../nodemailer');


// Fonction pour planifier un entretien
exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId , candidateEmail } = req.body;

        // Ajoutez des logs pour vérifier les valeurs reçues
        console.log("Received candidateId:", candidateId);
        console.log("Received candidateEmail:", candidateEmail);
    
        if (!candidateEmail) {
          return res.status(400).json({ message: "candidateEmail is required" });
        }

    // Récupérer l'offre associée au candidat
    const offre = await Offre.findOne({ where: { id: candidateId } });
    if (!offre) {
      return res.status(404).json({ message: "Offre not found" });
    }

    // Récupérer l'emploi associé à l'offre
    const emploi = await Emploi.findOne({ where: { jobName: offre.jobName} });
    if (!emploi) {
      return res.status(404).json({ message: "Emploi not found" });
    }

    const today = new Date();
    let interviewDate = new Date(today);
    interviewDate.setDate(interviewDate.getDate() + 2);
    interviewDate.setUTCHours(10, 0, 0, 0); 

    const lastEntretien = await Entretien.findOne({
      order: [["interviewDate", "DESC"]],
    });

    if (lastEntretien) {
        // Vérifier si l'interview précédente a été programmée après 11h UTC
        if (lastEntretien.interviewDate.getUTCHours() >= 10) {
          // Ajouter une heure à l'heure de l'interview du dernier candidat accepté
          interviewDate.setUTCHours(lastEntretien.interviewDate.getUTCHours() + 1);
        } else {
          // Si l'interview précédente a été programmée avant 11h UTC, planifier celle-ci à 11h UTC
          interviewDate.setUTCHours(10, 0, 0, 0);
        }
      }
         // Créer l'entretien
    const entretien = await Entretien.create({
      candidateId: offre.id,
      jobName: emploi.jobName,
      acceptDate: today,
      interviewDate: interviewDate,
    });

    await sendEmail(candidateEmail, "Votre entretien est planifié", `
      <h2>Bonjour</h2>
      <p>Félicitations! Votre candidature a été acceptée.</p>
    `, interviewDate);

    res.status(201).json(entretien);
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Error scheduling interview", error: error.message });
  }
};