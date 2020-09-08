const { Router } = require("express");
const Device = require("../models/device-managment");
const router = Router();

// Получение списка задач

router.get("/", async (req, res) => {
  try {
    const devicesData = await Device.findAll();
    res.status(200).json(devicesData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Создание новой задачи

router.post("/", async (req, res) => {
  try {
    // create = build.save()
    const deviceManager = await Device.create({
      deviceNumber: req.body.deviceNumber,
      model: req.body.model,
      done: false,
      idx: req.body.id,
    });
    res.status(201).json({ deviceManager });
  } catch (e) {
    res.status(500).json({
      message: "Server Error 500",
    });
  }
});

// Изменение задачи

router.put("/:id", async (req, res) => {
  try {
    const deviceManager = await Device.findByPk(+req.params.id);
    deviceManager.done = req.body.done;
    await deviceManager.save();
    res.status(200).json({ deviceManager });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error 500",
    });
  }
});

// Удаление задачи

router.delete("/:deviceNumber", async (req, res) => {
  try {
    const deviceManager = await Device.findAll({
      where: {
        deviceNumber: req.params.deviceNumber,
      },
    });
    const device = deviceManager[0];
    await device.destroy();
    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error 500",
    });
  }
});

module.exports = router;
