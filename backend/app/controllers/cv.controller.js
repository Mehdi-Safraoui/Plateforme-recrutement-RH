const db = require("../models");
const Offre = db.offres;
const Emploi = db.emplois;
const User = db.users;
const processCV = require("../processCV");

exports.calculateCvScore = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error( "Le fichier CV est requis." );
        }

        const { idemploi, iduser } = req.body;

        // Récupérer l'emploi correspondant
        const emploi = await Emploi.findByPk(idemploi);
        if (!emploi) {
            console.log('Emploi non trouvé avec ID:', idemploi); // Journalisation si l'emploi n'est pas trouvé
            throw new Error( "Emploi non trouvé." );
        }
        const user = await User.findByPk(iduser);

        if (!user) {
            console.log('utilisateur non trouvé:', iduser); // Journalisation si l'emploi n'est pas trouvé
            throw new Error( "candidat non trouvé.");
        }
        console.log('motsclés:', emploi.motsclés);
        

        // Extraire les mots-clés de l'emploi et parser le JSON
        let motsCles;
        try {
            motsCles = JSON.parse(emploi.motsclés);
            console.log('Parsed motsCles:', motsCles);
        } catch (error) {
            console.error('Erreur lors du parsing des mots-clés:', error);
            throw new Error(  "Format des mots-clés invalide." );
        }

        // Utiliser des fonctionnalités de processCV pour extraire le texte du CV
        const filePath = req.file.path; // Chemin réel du fichier téléchargé
        const text = await processCV.processCV(filePath);
        console.log('Text extracted from CV:', text);

        // Calculer le score basé sur les mots-clés présents dans le CV
        let cvScore = 0;
        const details = {};

        motsCles.forEach(keywordObj => {
            const keyword = keywordObj.tag;
            const score = keywordObj.score;
            console.log('Keyword:', keyword, 'Score:', score);
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const occurrences = (text.match(regex) || []).length;

            if (occurrences > 0) {
                cvScore += score * occurrences;
            }
            details[keyword] = occurrences;
        });
        console.log('cvScore:', cvScore);
        console.log('details:', details);
        // Mettre à jour l'offre avec le score calculé
        const offre = await Offre.findOne({ where: { idemploi, iduser } });
        if (!offre) {
            throw new Error( "Offre non trouvée." );
        }

        offre.score = cvScore;
        await offre.save();

        // Répondre avec le score et les détails
        return{ cvScore, details };
    } catch (error) {
        console.error("Erreur lors du calcul du score du CV :", error);
        throw new Error(  "Erreur interne du serveur." );
    }
};