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
    const { name, company_code } = req.body;
    const company = await Company.create({ name, company_code });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
