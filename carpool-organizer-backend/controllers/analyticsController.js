const Analytics = require('../models/Analytics');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findAll();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAnalytics = async (req, res) => {
  try {
    const { average_commute_time, total_cost_savings, total_carbon_reduction } = req.body;
    const analytics = await Analytics.create({ average_commute_time, total_cost_savings, total_carbon_reduction });
    res.status(201).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
