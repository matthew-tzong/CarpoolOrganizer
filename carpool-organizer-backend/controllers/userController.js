const User = require('../models/User');

//Fetch all user information from DB
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Add new user to DB
exports.createUser = async (req, res) => {
  try {
    const { company_id, name, location, number, availability } = req.body;
    const user = await User.create({ company_id, name, location, number, availability });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Updates user record in DB
exports.updateUser = async (req, res) => {
  const { id } = req.params;  //User ID in req params, updated fields in body
  const { company_id, name, location, number, availability } = req.body;  

  try {
    //Find user by ID, if doesn't't exist throw error
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await user.update({ company_id, name, location, number, availability });

    res.json(updatedUser); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
