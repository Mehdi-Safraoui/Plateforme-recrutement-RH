const express = require('express');
const router = express.Router();
const entretienController = require('../controllers/entretien.controller');

// Vérifiez que les fonctions de contrôleur sont bien définies
console.log(entretienController);

router.post('/', entretienController.scheduleInterview);

module.exports = router;
