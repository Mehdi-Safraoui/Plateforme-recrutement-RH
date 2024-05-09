const express = require("express");
const cors = require("cors");
const app = express();

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

app.get("/", (req , res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/emploi", emploiRoutes);
app.use("/api/offre", offreRoutes)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

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

// Vérifier si le dossier "uploads" existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  // Si le dossier n'existe pas, le créer
  fs.mkdirSync(uploadDir);
  console.log("Le dossier 'uploads' a été créé avec succès.");
} else {
  console.log("Le dossier 'uploads' existe déjà.");
}