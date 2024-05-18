const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes');
const loginRoute = require('./routes/login'); // Import login route
const lecturerCoursesRoute = require('./routes/lecturerCourses'); // Import lecturer courses route
const courseAttendanceRoute = require('./routes/courseAttendance'); // Import course attendance route
const studentCoursesRoute = require('./routes/studentCourses'); // Import student courses route
const lecturerCourseAttendanceRoute = require('./routes/lecturerCourseAttendance'); // Import lecturer course attendance route


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
app.use('/api/lecturer-courses', lecturerCoursesRoute); // Add lecturer courses route
app.use('/api/course-attendance', courseAttendanceRoute); // Add course attendance route
app.use('/api/student-courses', studentCoursesRoute); // Add student courses route
app.use('/api/lecturer-course-attendance', lecturerCourseAttendanceRoute); // Add lecturer course attendance route


app.get('/', (req, res) => {
    res.send('Welcome to the Attendance System');
});

module.exports = app;
