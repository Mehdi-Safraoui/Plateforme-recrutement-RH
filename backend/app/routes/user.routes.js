const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

// Middleware pour définir les en-têtes CORS
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Routes
router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user", controller.userBoard);

router.get("/api/test/rhboard", controller.rhBoard); // Correction de la méthode à appeler

router.get("/api/test/admin", controller.adminBoard);

module.exports = router;




