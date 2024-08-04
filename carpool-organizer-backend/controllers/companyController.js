const Company = require('../models/Company');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { name, company_code } = req.body;
    const company = await Company.create({ name, company_code });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
