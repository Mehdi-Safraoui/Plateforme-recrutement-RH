const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
const emploiRoutes = require("./app/routes/emploi.routes");
app.use("/api/emploi", emploiRoutes);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// routes
app.use(require('./app/routes/auth.routes'));
app.use(require('./app/routes/user.routes'));
app.use(require('./app/routes/emploi.routes'));

// set port, listen for requests
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