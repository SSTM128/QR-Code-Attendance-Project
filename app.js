const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes');
const loginRoute = require('./routes/login');
const lecturerCoursesRoute = require('./routes/lecturerCourses');
const courseAttendanceRoute = require('./routes/courseAttendance');
const studentCoursesRoute = require('./routes/studentCourses');
const lecturerCourseAttendanceRoute = require('./routes/lecturerCourseAttendance');
const notificationsRoute = require('./routes/notifications');
const fileUploadRoute = require('./routes/fileUpload');
const fileDownloadRoute = require('./routes/fileDownload');
const qrRoutes = require('./routes/qrRoutes');
const qrUpdateRoute = require('./routes/qrUpdate');

const app = express();

// Middleware
const allowedOrigins = [
    'http://192.168.1.40:4200',
    'https://b54b-2a01-9700-1623-1000-6055-3a44-feec-4fd2.ngrok-free.app',
    'https://9d0f-2a01-9700-1623-1000-6055-3a44-feec-4fd2.ngrok-free.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(bodyParser.json());

// MongoDB Atlas Connection
const dbURI = 'mongodb+srv://PC:1EVwjeQt8CFDuvsh@attendance.aotlhct.mongodb.net/?retryWrites=true&w=majority&appName=Attendance';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected via Atlas'))
    .catch(err => console.log(err));

// Routes
app.use('/api/attendances', attendanceRoutes);
app.use('/api', loginRoute);
app.use('/api/lecturer-courses', lecturerCoursesRoute);
app.use('/api/course-attendance', courseAttendanceRoute);
app.use('/api/student-courses', studentCoursesRoute);
app.use('/api/lecturer-course-attendance', lecturerCourseAttendanceRoute);
app.use('/api/notifications', notificationsRoute);
app.use('/api/files', fileUploadRoute);
app.use('/api/files', fileDownloadRoute);
app.use('/api/qr', qrRoutes);
app.use('/api/qr', qrUpdateRoute);

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Attendance System');
});

module.exports = app;
