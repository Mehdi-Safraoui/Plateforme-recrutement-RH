const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.roles;
const User = db.users;
const Emploi = db.emplois;
const Offre = db.offres ;

const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const emploiRoutes = require('./app/routes/emploi.routes');
const offreRoutes = require('./app/routes/offre.routes');
const emailRoutes = require('./app/routes/email.routes');


app.get("/", (req , res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/emploi", emploiRoutes);
app.use("/api/offre", offreRoutes)
app.use('/api/email', emailRoutes);


const UPLOADS_DIR = path.join(__dirname, 'uploads');

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
  res.send = function(data) {
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