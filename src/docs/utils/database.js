const Sequelize = require("sequelize");
const DB_NAME = "devices";
const USER_NAME = "root";
const PASSWORD = "13579";

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: "3900",
});

/* async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test(); */

module.exports = sequelize;
