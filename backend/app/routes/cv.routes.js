const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/score', upload.single('cvFile'), cvController.calculateCvScore);

module.exports = router;
