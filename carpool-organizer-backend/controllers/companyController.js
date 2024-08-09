const Company = require('../models/Company');

//Fetch all company information from DB
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Add a new company to app
exports.createCompany = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ error: 'Company name and code are required.' });
    }
    const company = await Company.create({ name, code });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Validate company code
exports.validateCompany = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Company code is required.' });
    }
    const company = await Company.findOne({ where: { code } });
    if (company) {
      res.json({ valid: true, company});
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Error validating company code:', error);
    res.status(500).json({ error: 'Error validating company code.' });
  }
};

exports.validateUser = async (req, res) => {
  try {
    const {email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      res.json({ valid: true, user });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Error validating user:', error);
    res.status(500).json({ error: 'Error validating user.' });
  }
};