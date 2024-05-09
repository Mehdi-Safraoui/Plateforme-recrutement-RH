const express = require("express");
const router = express.Router();
const controller = require("../controllers/emploi.controller");

router.get("/", controller.getEmplois);
router.post("/", controller.createEmploi);
router.get("/:id", controller.getEmploiById);

module.exports = router;

