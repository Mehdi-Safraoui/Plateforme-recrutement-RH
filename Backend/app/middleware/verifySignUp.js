const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {

  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Email déjà utilisé !"
      });
      return;
    }

    next();
  });
}


checkDuplicateNumber = (req, res, next) => {

  // Number
  User.findOne({
    where: {
      number: req.body.number
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Numero de telephone déjà utilisé !"
      });
      return;
    }
    next();
  });
}

checkPhoneNumberLength = (req, res, next) => {
  if (req.body.number.length !== 8) {
    return res.status(400).send({
      message: "Le numero doit étre composé de 8 numéros !"
    });
  }
  next();
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkDuplicateNumber: checkDuplicateNumber,
  checkPhoneNumberLength: checkPhoneNumberLength,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
