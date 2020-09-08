const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const deviceData = sequelize.define("Device", {
  idx: {
    // primaryKey: true,
    //  autoIncrement: true,\
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  deviceNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = deviceData;
