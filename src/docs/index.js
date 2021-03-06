const express = require("express");
const path = require("path");
const sequelize = require("./utils/database");
const deviceRoutes = require("./routes/router");
const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/device", deviceRoutes);

app.use((req, res, next) => {
  req.body;
  // res.sendFile("index.js");
});

async function start() {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

start();
