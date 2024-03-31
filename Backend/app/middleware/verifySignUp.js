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
        message: "Failed! This email is already in use!"
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
        message: "Failed! This Phone number is already in use!"
      });
      return;
    }
    next();
  });
}


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
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
