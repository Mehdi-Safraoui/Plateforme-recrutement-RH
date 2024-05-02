const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.emplois = require("../models/emploi.model.js")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
  through: "user_roles"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "rh"];

module.exports = db;
