const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes');
const loginRoute = require('./routes/login'); // Import login route

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const dbURI = 'mongodb+srv://PC:1EVwjeQt8CFDuvsh@attendance.aotlhct.mongodb.net/?retryWrites=true&w=majority&appName=Attendance';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected via Atlas'))
  .catch(err => console.log(err));

// Routes
app.use('/attendances', attendanceRoutes);
app.use('/api', loginRoute); // Add login route

app.get('/', (req, res) => {
    res.send('Welcome to the Attendance System');
});

module.exports = app;
