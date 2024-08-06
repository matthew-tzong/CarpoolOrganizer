//Import Modules
const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Import Routes
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const carpoolRoutes = require('./routes/carpoolRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

//Initialize Express App, CORS, and JSON parsing
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Use Routes within App
app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carpools', carpoolRoutes);
app.use('/api/analytics', analyticsRoutes);

//Start server & connect to DB
const PORT = 5000
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
