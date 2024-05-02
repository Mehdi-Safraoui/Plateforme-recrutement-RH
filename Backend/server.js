const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./app/models");
const Role = db.roles;
const User = db.users; // Ajout de l'import pour le modèle User

// Routes
const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const emploiRoutes = require('./app/routes/emploi.routes');

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api/auth", authRoutes); // Utilisation du chemin "/api/auth" pour les routes d'authentification
app.use("/api/user", userRoutes); // Utilisation du chemin "/api/user" pour les routes utilisateur
app.use("/api/emploi", emploiRoutes);

// Set port and start server
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

// Middleware pour intercepter la création d'un utilisateur et envoyer le message approprié
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
