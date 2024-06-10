const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const multer = require("multer");

const { processCV, calculateScoreWithDetails } = require("./app/processCV");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.roles;
const User = db.users;
const Emploi = db.emplois;
const Offre = db.offres;
const Entretien = db.entretiens;

const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const emploiRoutes = require('./app/routes/emploi.routes');
const offreRoutes = require('./app/routes/offre.routes');
const emailRoutes = require('./app/routes/email.routes');
const entretienRoutes = require('./app/routes/entretien.routes');
const cvRoutes = require('./app/routes/cv.routes');




app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/emploi", emploiRoutes);
app.use("/api/offre", offreRoutes)
app.use('/api/email', emailRoutes);
app.use("/api/entretien/schedule", entretienRoutes);
app.use("/api/upload_cv/emploiid", cvRoutes);



const UPLOADS_DIR = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/assets/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOADS_DIR, filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      return res.status(404).send('File not found');
    }

    // File exists, so stream it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.post('/api/upload-cv/:emploiId', upload.single('cv'), async (req, res) => {
  try {
    const emploiId = req.params.emploiId;
    const emploi = await Emploi.findByPk(emploiId);

    if (!emploi) {
      console.log('Emploi non trouvé avec ID:', emploiId); // Journalisation si l'emploi n'est pas trouvé
      return res.status(404).json({ error: 'Emploi non trouvé' });
    }

    const jobKeywords = JSON.parse(emploi.motsclés);
    const filePath = req.file.path;
    const text = await processCV(filePath);

    console.log('Text extracted from CV:', text);

    const scoreDetails = calculateScoreWithDetails(text, jobKeywords);

    // Mettre à jour l'offre avec le score calculé
    const offre = await Offre.findOne({ where: { idemploi: emploiId, iduser: req.body.iduser } });
    if (!offre) {
      return res.status(400).json({ error: "Offre non trouvée." });
    }

    offre.score = scoreDetails.cvScore;
    await offre.save();

    res.json(scoreDetails);
  } catch (error) {
    console.error('Error processing CV:', error);
    res.status(500).json({ error: 'Error processing CV' });
  }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "candidat"
  });

  Role.create({
    id: 2,
    name: "rh"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    const body = JSON.parse(data);
    if (body.message === "User registered successfully!") {
      res.json({ message: "Utilisateur créé avec succès." });
    } else {
      originalSend.call(res, data);
    }
  };
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur interne est survenue!');
});
const fs = require('fs');
const { clearScreenDown } = require("readline");

// Vérifier si le dossier "uploads" existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  // Si le dossier n'existe pas, le créer
  fs.mkdirSync(uploadDir);
  console.log("Le dossier 'uploads' a été créé avec succès.");
} else {
  console.log("Le dossier 'uploads' existe déjà.");
}