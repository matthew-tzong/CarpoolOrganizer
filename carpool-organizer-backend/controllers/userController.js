const User = require('../models/User');

//Fetch all user information from DB
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Add new user to DB
exports.createUser = async (req, res) => {
  try {
    const { companyId, name, location, number, availability, email, password } = req.body;
    const user = await User.create({ companyId, name, location, number, availability, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Updates user record in DB
exports.updateUser = async (req, res) => {
  const { id } = req.params;  //User ID in req params, updated fields in body
  const { company_id, name, location, number, availability, email, password } = req.body;  

  try {
    //Find user by ID, if doesn't exist throw error
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await user.update({ company_id, name, location, number, availability, email, password });

    res.json(updatedUser); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      res.json({ userId: user.id, message: 'Login successful', valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Error validating user:', error);
    res.status(500).json({ error: 'Error validating user.' });
  }
};
