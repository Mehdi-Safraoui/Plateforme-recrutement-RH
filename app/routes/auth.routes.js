const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

// Middleware pour définir les en-têtes CORS
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Routes
router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkDuplicateNumber,
    verifySignUp.checkPhoneNumberLength,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/api/auth/signin", controller.signin);

module.exports = router;
