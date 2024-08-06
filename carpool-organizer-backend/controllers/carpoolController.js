const Carpool = require('../models/Carpool');

//Fetch all carpool information from DB
exports.getCarpools = async (req, res) => {
  try {
    const carpools = await Carpool.findAll();
    res.json(carpools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new carpool group
exports.createCarpool = async (req, res) => {
  try {
    const { origin, destination, time, user_ids } = req.body;
    const carpool = await Carpool.create({ origin, destination, time, user_ids });
    res.status(201).json(carpool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing carpool group
exports.updateCarpool = async (req, res) => {
  const { id } = req.params;  // The carpool ID provided in req params
  const { origin, destination, time, user_ids } = req.body;  //Updated fields in body

  try {
    //Find record by ID, if doesn't exist return error
    const carpool = await Carpool.findByPk(id);

    if (!carpool) {
      return res.status(404).json({ error: 'Carpool not found' });
    }

    const updatedCarpool = await carpool.update({ origin, destination, time, user_ids });

    res.json(updatedCarpool); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
