const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const deviceData = sequelize.define("Device", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  deviceNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = deviceData;
