const Carpool = require('../models/Carpool');

exports.getCarpools = async (req, res) => {
  try {
    const carpools = await Carpool.findAll();
    res.json(carpools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCarpool = async (req, res) => {
  try {
    const { origin, destination, time, user_ids } = req.body;
    const carpool = await Carpool.create({ origin, destination, time, user_ids });
    res.status(201).json(carpool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
