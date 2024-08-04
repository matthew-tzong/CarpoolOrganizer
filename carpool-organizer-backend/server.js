const express = require('express');
const sequelize = require('./config/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Routes
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const carpoolRoutes = require('./routes/carpoolRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carpools', carpoolRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = 5000

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
