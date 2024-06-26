const express = require("express");
const router = express.Router();
const multer = require("multer");
const Controller = require("../controllers/offre.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier de destination des fichiers téléchargés
  },
  filename: (req, file, cb) => {
    console.log(file);
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route pour récupérer la liste des candidats
router.get("/candidates", Controller.getCandidates);


// Route pour la création d'une offre avec téléchargement de fichier
router.post("/", upload.single("cv"), Controller.createOffre);

router.put('/candidates/:id/accept', Controller.acceptCandidate);

// Route to reject a candidate
router.put('/candidates/:id/reject', Controller.rejectCandidate);



module.exports = router;
