const express = require("express");
const router = express.Router();
const controller = require("../controllers/emploi.controller");

// Route pour gérer la création d'un emploi
router.post("/api/emploi", controller.createEmploi);

module.exports = router;
